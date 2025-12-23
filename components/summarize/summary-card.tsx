import { Card } from "@/components/ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { type PdfSummary as Props, SummaryStatus } from "@/types/pdf-summary";
import { formatDistanceToNow } from "date-fns";

export default function SummaryCard({
  id,
  user_id,
  original_file_url,
  summary_text,
  status,
  title,
  file_name,
  created_at,
  updated_at,
}: Props) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton id={id} />
        </div>

        <Link href={`/summaries/${id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={original_file_url}
              title={title}
              createdAt={created_at}
            />
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary_text}
            </p>

            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <StatusBadge status={status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}

function SummaryHeader({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string;
  createdAt: string;
}) {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6  h-8 sm:w-8 sm:h-8 text-rose-400 mt-1" />

      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title ? formatFileName(title) : formatFileName(fileUrl)}
        </h3>

        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: SummaryStatus }) {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
}
