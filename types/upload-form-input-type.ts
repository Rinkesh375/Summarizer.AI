import { FormEvent } from "react";

export interface UploadFormInputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
