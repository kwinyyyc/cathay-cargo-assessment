"use client";

import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <div className="bg-primary text-primary-content">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end gap-4 text-sm">
          <Link href="/flight" className="flex items-center gap-2">
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Search</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <QuestionMarkCircleIcon className="h-5 w-5" />
            <span>Contact us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
