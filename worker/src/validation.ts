import { z } from "zod";

export const FlashcardSchema = z.object({
  topic: z.string().min(1).max(50),
  subtopic: z.string().min(1).max(100),
  question: z.string().min(5).max(300),
  answer: z.string().min(5).max(500),
  keyPoints: z.array(z.string().max(150)).min(2).max(4),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  examTip: z.string().max(200).nullable().optional(),
});

export const TopicSummarySchema = z
  .object({
    heading: z.string(),
    content: z.string().min(20),
    keyTerms: z
      .array(z.object({ term: z.string(), definition: z.string() }))
      .optional(),
    importantEquations: z.array(z.string()).nullable().optional(),
    tables: z
      .array(
        z.object({
          title: z.string(),
          headers: z.array(z.string()),
          rows: z.array(z.array(z.string())),
        })
      )
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

export const ContentSchema = z.object({
  subject: z.union([z.literal("biology"), z.literal("chemistry")]),
  detectedTopic: z.object({
    id: z.string().regex(/^[a-z][a-z0-9-]*$/),
    name: z.string(),
    isNewTopic: z.boolean(),
  }),
  flashcards: z.array(FlashcardSchema).min(1).max(50),
  topicSummary: TopicSummarySchema,
  newSubtopics: z.array(z.string()),
});

export type ValidatedContent = z.infer<typeof ContentSchema>;
