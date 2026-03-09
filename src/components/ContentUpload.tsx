"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Camera,
  CheckCircle,
  AlertCircle,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WORKER_URL = "https://bio-revision-pipeline.jamie-65f.workers.dev";

type UploadState = "idle" | "uploading" | "processing" | "success" | "error";

interface UploadResult {
  success: boolean;
  subject?: string;
  topic?: string;
  flashcardsAdded?: number;
  message?: string;
  error?: string;
}

interface ContentUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContentUpload({ isOpen, onClose }: ContentUploadProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setState("idle");
    setPreview(null);
    setFile(null);
    setResult(null);
    setDragOver(false);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      alert("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      alert("Image too large. Maximum size is 5MB.");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleUpload = useCallback(async () => {
    if (!file) return;

    setState("uploading");

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Remove the data:image/...;base64, prefix
          const base64Data = result.split(",")[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setState("processing");

      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          mimeType: file.type,
        }),
      });

      const data: UploadResult = await response.json();

      if (response.ok && data.success) {
        setState("success");
        setResult(data);
      } else {
        setState("error");
        setResult({
          success: false,
          error: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setState("error");
      setResult({
        success: false,
        error: "Could not connect to the server. Please try again later.",
      });
    }
  }, [file]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-gray-800">Add Content</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            {/* Idle / File selection state */}
            {state === "idle" && (
              <>
                {!preview ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                      dragOver
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                      }}
                    />
                    <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Drop an image here or tap to upload
                    </p>
                    <p className="text-xs text-gray-400">
                      Photo of a textbook page, curriculum doc, or specification
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-h-48 object-contain"
                      />
                      <button
                        onClick={reset}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ImageIcon className="w-4 h-4" />
                      <span className="truncate">{file?.name}</span>
                      <span className="text-gray-300">
                        ({((file?.size || 0) / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <Button
                      onClick={handleUpload}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Generate Flashcards
                    </Button>
                  </div>
                )}

                <p className="text-[11px] text-gray-400 text-center mt-4">
                  AI will auto-detect Biology, Chemistry or Physics and generate flashcards, quiz questions, and revision notes
                </p>
              </>
            )}

            {/* Processing states */}
            {(state === "uploading" || state === "processing") && (
              <div className="py-8 text-center">
                <Loader2 className="w-10 h-10 text-indigo-500 mx-auto mb-4 animate-spin" />
                <p className="font-medium text-gray-700 mb-1">
                  {state === "uploading"
                    ? "Uploading image..."
                    : "AI is analysing your image..."}
                </p>
                <p className="text-sm text-gray-400">
                  {state === "processing"
                    ? "Extracting flashcards, topics, and revision notes"
                    : "This will take about 10 seconds"}
                </p>
              </div>
            )}

            {/* Success state */}
            {state === "success" && result && (
              <div className="py-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="font-semibold text-gray-800 mb-2">
                  Content Added!
                </p>
                <div className="bg-green-50 rounded-xl p-4 mb-4 text-left">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">
                      {result.flashcardsAdded} flashcards
                    </span>{" "}
                    added to{" "}
                    <span className="font-medium capitalize">
                      {result.subject}
                    </span>{" "}
                    → {result.topic}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    The live site will update automatically in about 2 minutes.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={reset}
                  >
                    Upload Another
                  </Button>
                  <Button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={handleClose}
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}

            {/* Error state */}
            {state === "error" && result && (
              <div className="py-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="font-semibold text-gray-800 mb-2">
                  Could not process image
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {result.error}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={reset}
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
