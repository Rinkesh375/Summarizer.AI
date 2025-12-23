"use client";
import { FormEvent, useState } from "react";
import { fileSchema } from "@/validation/file-schema";
import { UploadButton } from "@uploadthing/react";
import { type OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFields = fileSchema.safeParse({ file });
    if (!validatedFields.success) {
      return;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      {/* <UploadFormInput onSubmit={handleSubmit} /> */}
      <div className="relative">
        <UploadButton<OurFileRouter, "pdfUploader">
          endpoint="pdfUploader"
          disabled={isProcessing}
          onClientUploadComplete={async (res) => {
            try {
              setIsProcessing(true);
              toast.info("Processing your PDF wait for while...");
              const result = await generatePdfSummary(res);
              
              if (result.success && "data" in result && result.data) {
                const id = result.data.id;

                if (!id) {
                  toast.error("Failed to store data and summarize pdf data.");
                  return;
                }
                
                toast.success("Upload Completed");
                router.push(`/summarize/${id}`);
               
              } else {
                const errorMessage =
                  "message" in result ? result.message : "Upload failed";
                toast.error(errorMessage);
              }
            } catch (error) {
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">Summarizing PDF...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}