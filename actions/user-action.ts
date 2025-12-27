"use server";
import { freeUploadLimit } from "@/constants/price-plans-list";
import { getUserUploadCount } from "../lib/summaries";

export async function hasUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const result = uploadCount < freeUploadLimit;
  return result;
}
