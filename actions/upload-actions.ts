"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { type SavePdfSummaryInput } from "@/types/upload-action-type";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generatePdfSummary(
  uploadResponse: {
    name: string;
    ufsUrl: string;
    serverData: { userId: string };
  }[]
) {
  if (!uploadResponse?.length) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const { name, ufsUrl } = uploadResponse[0];

  if (!ufsUrl) {
    return {
      success: false,
      message: "PDF URL not found",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(ufsUrl);
    const summaryResult = await generateSummaryFromGemini(pdfText);

    if (!summaryResult?.content) {
      return {
        success: false,
        message: "Failed to generate AI summary",
        data: null,
      };
    }

    const storedbData = await storePdfSummary({
      fileUrl: ufsUrl,
      summary: summaryResult.content,
      title: name,
      fileName: name,
    });

    if (storedbData.success && "data" in storedbData && storedbData.data.id) {
      revalidatePath(`summarize/${storedbData?.data.id}`);
      return storedbData;
    } else
      throw new Error(
        "Failed summarize pdf data and store in db. please try again"
      );
  } catch (error) {
    console.error("PDF summarization error:", error);

    return {
      success: false,
      message: "File data summarization failed",
      data: null,
    };
  }
}

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: SavePdfSummaryInput) {
  try {
    const sql = await getDbConnection();

    const [row] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      )
      VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      )
      RETURNING
        id,
        user_id,
        original_file_url,
        title,
        file_name,
        created_at;
    `;

    return {
      success: true,
      data: row,
    };
  } catch (error) {
    console.error("Error while saving PDF summary:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to save summary into DB",
    };
  }
}

export async function storePdfSummary({
  fileUrl,
  summary,
  title,
  fileName,
}: Omit<SavePdfSummaryInput, "userId">) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    return await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
  } catch (error) {
    console.error("Store PDF summary error:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }
}
