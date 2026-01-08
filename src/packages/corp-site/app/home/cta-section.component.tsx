"use client";

import {
  CalendarDaysIcon,
  PaperAirplaneIcon,
  CubeIcon,
  MapPinIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import CTAButton from "../core/cta-button.component";

export default function CTASection() {
  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <CTAButton
        className="flex-1"
        title="Click &amp; Ship"
        href="/"
        prefixIcon={<CalendarDaysIcon className="h-6 w-6" />}
      />
      <CTAButton
        className="flex-1"
        title="Check Flight Schedule"
        href="/flight"
        prefixIcon={<PaperAirplaneIcon className="h-6 w-6" />}
        suffixIcon={<PlusIcon className="h-6 w-6" />}
      />
      <CTAButton
        className="flex-1"
        title="Track and Trace"
        href="/"
        prefixIcon={<CubeIcon className="h-6 w-6" />}
        suffixIcon={<PlusIcon className="h-6 w-6" />}
      />
      <CTAButton
        className="flex-1"
        title="Station Capabilities"
        href="/"
        prefixIcon={<MapPinIcon className="h-6 w-6" />}
      />
    </div>
  );
}
