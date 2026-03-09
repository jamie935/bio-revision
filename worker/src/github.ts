import type { ValidatedContent } from "./validation";

const GITHUB_API = "https://api.github.com";

interface Env {
  GITHUB_PAT: string;
  GITHUB_REPO: string;
}

interface GitHubFileResponse {
  content: string;
  sha: string;
}

interface GeneratedData {
  lastUpdated: string | null;
  newTopics: {
    id: string;
    name: string;
    icon: string;
    color: string;
    subtopics: string[];
  }[];
  newSubtopics: Record<string, string[]>;
  flashcards: {
    id: string;
    topic: string;
    subtopic: string;
    question: string;
    answer: string;
    keyPoints: string[];
    difficulty: number;
    examTip?: string | null;
  }[];
}

interface SummariesData {
  lastUpdated: string | null;
  summaries: {
    topicId: string;
    subject: string;
    title: string;
    sections: unknown[];
  }[];
}

async function githubFetch(
  path: string,
  env: Env,
  options?: RequestInit
): Promise<Response> {
  return fetch(`${GITHUB_API}/repos/${env.GITHUB_REPO}/contents/${path}`, {
    ...options,
    headers: {
      Authorization: `token ${env.GITHUB_PAT}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
}

async function getFile(
  path: string,
  env: Env
): Promise<GitHubFileResponse> {
  const res = await githubFetch(path, env);
  if (!res.ok) {
    throw new Error(`GitHub GET ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<GitHubFileResponse>;
}

async function putFile(
  path: string,
  content: string,
  sha: string,
  message: string,
  env: Env
): Promise<{ commit: { html_url: string } }> {
  const res = await githubFetch(path, env, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: btoa(content),
      sha,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`GitHub PUT ${path} failed: ${res.status} - ${error}`);
  }

  return res.json() as Promise<{ commit: { html_url: string } }>;
}

export async function mergeAndCommit(
  content: ValidatedContent,
  env: Env
): Promise<{ commitUrl: string; flashcardsAdded: number }> {
  // Determine which file to update
  const filePathMap: Record<string, string> = {
    biology: "src/data/generated/biology-generated.json",
    chemistry: "src/data/generated/chemistry-generated.json",
    physics: "src/data/generated/physics-generated.json",
  };
  const filePath = filePathMap[content.subject];

  // Read current file from GitHub
  const currentFile = await getFile(filePath, env);
  const existingData: GeneratedData = JSON.parse(atob(currentFile.content));

  // Find the highest existing ID number to continue from
  let maxId = 0;
  for (const fc of existingData.flashcards) {
    const parts = fc.id.split("-");
    const num = parseInt(parts[parts.length - 1] || "0");
    if (num > maxId) maxId = num;
  }

  // Assign IDs to new flashcards
  const prefixMap: Record<string, string> = { biology: "gen-bio", chemistry: "gen-chem", physics: "gen-phys" };
  const prefix = prefixMap[content.subject];
  let nextId = maxId + 1;

  const newFlashcards = content.flashcards
    .filter((fc) => {
      // Deduplicate: skip if question already exists
      const q = fc.question.toLowerCase().trim();
      return !existingData.flashcards.some(
        (existing) => existing.question.toLowerCase().trim() === q
      );
    })
    .map((fc) => ({
      id: `${prefix}-${String(nextId++).padStart(3, "0")}`,
      topic: fc.topic,
      subtopic: fc.subtopic,
      question: fc.question,
      answer: fc.answer,
      keyPoints: fc.keyPoints,
      difficulty: fc.difficulty,
      examTip: fc.examTip || null,
    }));

  if (newFlashcards.length === 0) {
    return { commitUrl: "", flashcardsAdded: 0 };
  }

  // Merge flashcards
  existingData.flashcards.push(...newFlashcards);
  existingData.lastUpdated = new Date().toISOString();

  // Merge new subtopics
  const topicId = content.detectedTopic.id;
  for (const sub of content.newSubtopics) {
    if (!existingData.newSubtopics[topicId]) {
      existingData.newSubtopics[topicId] = [];
    }
    if (!existingData.newSubtopics[topicId].includes(sub)) {
      existingData.newSubtopics[topicId].push(sub);
    }
  }

  // Add new topic if needed
  if (
    content.detectedTopic.isNewTopic &&
    !existingData.newTopics.some((t) => t.id === topicId)
  ) {
    existingData.newTopics.push({
      id: topicId,
      name: content.detectedTopic.name,
      icon: content.subject === "biology" ? "📚" : content.subject === "chemistry" ? "🧪" : "⚡",
      color: content.subject === "biology" ? "bg-blue-500" : content.subject === "chemistry" ? "bg-yellow-500" : "bg-cyan-500",
      subtopics: content.newSubtopics,
    });
  }

  // Commit updated file
  const updatedJson = JSON.stringify(existingData, null, 2);
  const result = await putFile(
    filePath,
    updatedJson,
    currentFile.sha,
    `Add ${newFlashcards.length} new ${content.subject} flashcards from uploaded content`,
    env
  );

  // If there's a topic summary, commit that too
  if (content.topicSummary) {
    try {
      const summariesPath = "src/data/generated/summaries-generated.json";
      const summariesFile = await getFile(summariesPath, env);
      const summariesData: SummariesData = JSON.parse(
        atob(summariesFile.content)
      );

      summariesData.summaries.push({
        topicId: content.detectedTopic.id,
        subject: content.subject,
        title: content.detectedTopic.name,
        sections: [content.topicSummary],
      });
      summariesData.lastUpdated = new Date().toISOString();

      await putFile(
        summariesPath,
        JSON.stringify(summariesData, null, 2),
        summariesFile.sha,
        `Add ${content.subject} summary for ${content.detectedTopic.name}`,
        env
      );
    } catch {
      // Non-critical: summary commit failed, flashcards still saved
      console.error("Failed to commit summary, but flashcards were saved");
    }
  }

  return {
    commitUrl: result.commit.html_url,
    flashcardsAdded: newFlashcards.length,
  };
}
