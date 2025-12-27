"use client";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { type OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { hasUploadLimit } from "@/actions/user-action";
import LoadingSkeleton from "./loading-skelton";

export default function UploadForm() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="relative">
        <UploadButton<OurFileRouter, "pdfUploader">
          endpoint="pdfUploader"
          disabled={isProcessing}
          onClientUploadComplete={async (res) => {
            try {
              if (user?.id) {
                const allowed = await hasUploadLimit(user.id);

                if (!allowed) {
                  toast.error(
                    "You've reached your PDF summarization limit. Upgrade to a paid plan to continue."
                  );

                  router.push("/#pricing");
                  return;
                }
              }

              setIsProcessing(true);
              toast.info("Processing your PDF wait for while...");

              const result = await generatePdfSummary(res);

              if (result.success && result.data?.id) {
                toast.success("Upload Completed");
                router.push(`/summaries/${result.data.id}`);
              } else {
                toast.error(
                  "message" in result ? result.message : "Upload failed"
                );
              }
            } catch {
              toast.error("Upload failed - please try again");
            } finally {
              setIsProcessing(false);
            }
          }}
          onUploadError={(error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />

        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <p className="text-sm text-muted-foreground">
                Summarizing PDF...
              </p>
            </div>
          </div>
        )}
      </div>
      {isProcessing && <LoadingSkeleton />}
    </div>
  );
}
