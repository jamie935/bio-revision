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
        mimeType?: string;
      };

      if (!body.image || !body.mimeType) {
        return errorResponse("Missing image or mimeType", 400, env);
      }

      // Validate mime type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(body.mimeType)) {
        return errorResponse(
          "Invalid image type. Use JPEG, PNG, GIF, or WebP.",
          400,
          env
        );
      }

      // Check image size (base64 is ~33% larger than binary)
      const estimatedSize = (body.image.length * 3) / 4;
      if (estimatedSize > 5 * 1024 * 1024) {
        return errorResponse("Image too large. Max 5MB.", 400, env);
      }

      // Call Gemini API to analyze the image
      const rawContent = await analyzeWithGemini(
        body.image,
        body.mimeType,
        env.GEMINI_API_KEY
      );

      // Validate the response against our schema
      const validated = ContentSchema.safeParse(rawContent);
      if (!validated.success) {
        console.error("Validation failed:", validated.error.issues);
        return errorResponse(
          "Could not extract valid GCSE content from this image. Try a clearer photo of a textbook or curriculum page.",
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
