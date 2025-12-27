"use client";
import { cn } from "@/lib/utils";
import { type PriceCardProps } from "@/types/price-card-type";
import { ArrowRight, CheckIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";

export default function PricingCard({
  price,
  name,
  description,
  items,
  paymentLink,
  id,
}: PriceCardProps) {
  const { user} = useUser();
  const handlePayment = async () => {
    if (user?.id) {
      window.open(paymentLink, "_blank", "noopener,noreferrer");
    } else {
      toast.error("Please sign in to proceed with payment.");
      redirect("/sign-in");
    }
  };

  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-1">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span> {item}</span>
            </li>
          ))}
        </div>

        {id !== "free" && (
          <Button
            className={cn(
              "space-y-2 flex justify-center w-full  rounded-full  items-center  gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
            onClick={handlePayment}
          >
            Buy Now <ArrowRight size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
