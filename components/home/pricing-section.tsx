import { pricePlans } from "@/constants/price-plans-list";
import { cn } from "@/lib/utils";
import { PriceCardProps } from "@/types/price-card-type";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { currentUser } from "@clerk/nextjs/server";
import PricingCard from "./price-card";

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {pricePlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
