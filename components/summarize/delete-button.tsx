"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteSummaryAction } from "@/actions/summary-actions";

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction(id);
      if (result.success) {
        toast.success("Delete summary successfully.");
      } else {
        toast.error("Faild to delete summary. please try later");
      }
      setOpen(false);
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="
                text-gray-400
                bg-gray-50
                border
                border-gray-200
                hover:text-rose-600
                hover:bg-rose-50
              "
        >
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="ghost"
            className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="bg-gray-900 hover:bg-gray-600"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
