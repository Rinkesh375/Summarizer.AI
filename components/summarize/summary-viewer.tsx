"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NavigationControls } from "./navigation-controls";
import ProgressBar from "./progress-bar";
import { parseSection } from "@/utils/parse-summary-helpers";
import ContentSection from "./content-section";

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState<number>(0);

  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const handleNext = () => {
    setCurrentSection((pre) => Math.min(pre + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection((pre) => Math.max(pre - 1, 0));
  };

  return (
    <Card
      className="relative px-2
      h-[500px] sm:h-[500px] lg:h-[600px]
      w-full xl:w-[600px]
      overflow-hidden
      bg-linear-to-br from-background via-background/95 to-rose-500/5
      backdrop-blur-lg shadow-2xl rounded-3xl
      border border-rose-500/10"
    >
      <ProgressBar sections={sections} currentSection={currentSection} />
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ""} />
          <ContentSection
            title={sections[currentSection]?.title || ""}
            points={sections[currentSection]?.points ?? []}
          />
        </div>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2 mb-6 pt-2 pb-4 bg-background/80 backdrop-blur-xs ">
      <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
        {title}
      </h2>
    </div>
  );
}
