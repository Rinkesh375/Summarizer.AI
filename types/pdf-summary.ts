export type PdfSummary = {
  id: string;
  user_id: string;
  original_file_url: string;
  summary_text: string;
  status: SummaryStatus;
  title: string;
  file_name: string;
  created_at: string;
  updated_at: string;
  word_count:number
};

export enum SummaryStatus {
  Pending = "pending",
  Processing = "processing",
  Completed = "completed",
  Failed = "failed",
}

export type GetSummaryByIdResult =
  | { success: true; summary: PdfSummary }
  | { success: false; error: string };
