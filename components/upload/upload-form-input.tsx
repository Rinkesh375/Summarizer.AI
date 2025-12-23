"use client";
import { type UploadFormInputProps } from "@/types/upload-form-input-type";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button type="submit">Upload PDF</Button>
      </div>
    </form>
  );
}
