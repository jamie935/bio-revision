import { ContentSchema } from "./validation";
import { analyzeWithGemini } from "./gemini";
import { mergeAndCommit } from "./github";

interface Env {
  GEMINI_API_KEY: string;
  GITHUB_PAT: string;
  ALLOWED_ORIGIN: string;
  GITHUB_REPO: string;
}

// Simple in-memory rate limiter (resets when worker restarts)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour window
    return false;
  }

  if (limit.count >= 5) {
    return true; // 5 uploads per IP per hour
  }

  limit.count++;
  return false;
}

function corsHeaders(env: Env): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function errorResponse(
  message: string,
  status: number,
  env: Env
): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: corsHeaders(env),
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(env),
      });
    }

    // Only accept POST
    if (request.method !== "POST") {
      return errorResponse("Method not allowed", 405, env);
    }

    // Rate limit by IP
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (isRateLimited(ip)) {
      return errorResponse(
        "Too many uploads. Please try again later (max 5 per hour).",
        429,
        env
      );
    }

    try {
      // Parse the request body
      const body = (await request.json()) as {
        image?: string;
        text?: string;
        mimeType?: string;
      };

      if (!body.mimeType) {
        return errorResponse("Missing mimeType", 400, env);
      }

      // Validate mime type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "text/plain",
        "text/csv",
      ];
      if (!allowedTypes.includes(body.mimeType)) {
        return errorResponse(
          "Invalid file type. Use JPEG, PNG, GIF, WebP, PDF, or text.",
          400,
          env
        );
      }

      const isTextInput = body.mimeType === "text/plain" || body.mimeType === "text/csv";

      // Must have either image/base64 data or text content
      if (!isTextInput && !body.image) {
        return errorResponse("Missing image/PDF data", 400, env);
      }
      if (isTextInput && !body.text) {
        return errorResponse("Missing text content", 400, env);
      }

      // Check size limits
      if (body.image) {
        const estimatedSize = (body.image.length * 3) / 4;
        if (estimatedSize > 10 * 1024 * 1024) {
          return errorResponse("File too large. Max 10MB.", 400, env);
        }
      }
      if (body.text && body.text.length > 500000) {
        return errorResponse("Text too long. Max 500KB.", 400, env);
      }

      // Call Gemini API to analyze the content
      const rawContent = await analyzeWithGemini(
        isTextInput ? null : body.image!,
        body.mimeType,
        env.GEMINI_API_KEY,
        isTextInput ? body.text : undefined
      );

      // Validate the response against our schema
      const validated = ContentSchema.safeParse(rawContent);
      if (!validated.success) {
        console.error("Validation failed:", validated.error.issues);
        return errorResponse(
          "Could not extract valid GCSE content from this file. Try a clearer photo, PDF, or text file of a textbook or curriculum page.",
          422,
          env
        );
      }

      // Merge into GitHub repo and commit
      const result = await mergeAndCommit(validated.data, env);

      if (result.flashcardsAdded === 0) {
        return new Response(
          JSON.stringify({
            success: true,
            message: "All flashcards from this image already exist.",
            subject: validated.data.subject,
            flashcardsAdded: 0,
          }),
          { headers: corsHeaders(env) }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          subject: validated.data.subject,
          topic: validated.data.detectedTopic.name,
          flashcardsAdded: result.flashcardsAdded,
          commitUrl: result.commitUrl,
          message: `Added ${result.flashcardsAdded} new ${validated.data.subject} flashcards for "${validated.data.detectedTopic.name}". The site will update in about 2 minutes!`,
        }),
        { headers: corsHeaders(env) }
      );
    } catch (error) {
      console.error("Pipeline error:", error);
      const message =
        error instanceof Error ? error.message : "Unknown error";
      return errorResponse(`Processing failed: ${message}`, 500, env);
    }
  },
};
