import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await currentUser();

  if (user?.id) return <>{children}</>;
  return redirect("/sign-in");
}
