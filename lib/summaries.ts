import { GetSummaryByIdResult, PdfSummary } from "@/types/pdf-summary";
import { getDbConnection } from "./db";
import { currentUser } from "@clerk/nextjs/server";

export async function getSummaries(userId: string): Promise<PdfSummary[]> {
  const sql = await getDbConnection();

  const summaries = await sql`
      SELECT
        id,
        user_id,
        title,
        original_file_url,
        summary_text,
        created_at,
        updated_at,
        status,
        file_name
      FROM pdf_summaries
      WHERE user_id = ${userId}
      ORDER BY created_at DESC;
    `;

  return summaries as PdfSummary[];
}

export const getSummaryById = async (
  id: string
): Promise<GetSummaryByIdResult> => {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    const sql = await getDbConnection();

    const rows = await sql`
  SELECT
    *,
    CASE
      WHEN summary_text IS NULL OR summary_text = '' THEN 0
      ELSE
        LENGTH(TRIM(summary_text))
        - LENGTH(REPLACE(TRIM(summary_text), ' ', ''))
        + 1
    END AS word_count
  FROM pdf_summaries
  WHERE id = ${id}
  AND user_id = ${userId};
`;

    const summary = rows[0] as PdfSummary | undefined;

    if (!summary) {
      return { success: false, error: "Summary not found" };
    }

    return { success: true, summary };
  } catch {
    return { success: false, error: "Internal server error" };
  }
};

export async function getUserUploadCount(userId: string): Promise<number> {
  const sql = await getDbConnection();

  try {
    const [{ count }] = await sql`
      SELECT COUNT(*) AS count
      FROM pdf_summaries
      WHERE user_id = ${userId};
    `;

    return Number(count);
  } catch (err) {
    console.error("Error fetching user upload count", err);
    return 0;
  }
}
