"use client";

import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  imageSrc: string;
  imageAlt: string;
  date: string;
  headline: string;
  href?: string;
}

export default function NewsCard({
  imageSrc,
  imageAlt,
  date,
  headline,
  href = "#",
}: NewsCardProps) {
  return (
    <article className="card bg-base-200 shadow-md border rounded-none overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 overflow-hidden bg-base-200">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="card-body">
        <p className="text-md text-primary-content mb-2 flex-grow-0">{date}</p>
        <h3 className="font-semibold mb-6 text-lg line-clamp-3">{headline}</h3>
        <Link href={href} className="px-0 text-primary-content">
          Read more →
        </Link>
      </div>
    </article>
  );
}
