"use client";

import { useState } from "react";
import Image from "next/image";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroSection({
  imageSrc = "/hero-airplane.jpg",
  imageAlt = "Cathay Cargo airplane being loaded with various specialized cargo",
}: HeroSectionProps = {}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-[#F3F8FB]">
      <div className="flex items-center">
        <div className="p-8 lg:px-48">
          <p className="text-primary-content text-md lg:text-base font-medium mb-4">
            How on Earth do you ship a world of possibility?
          </p>
          <h1 className="text-2xl lg:text-4xl font-semibold text-[#1F2937] mb-6">
            WE KNOW HOW
          </h1>
          <p className="text-[#1F2937] text-base lg:text-lg mb-8 max-w-xl">
            No matter how far or how complex, let Cathay Cargo&apos;s expertise,
            experience, and innovation deliver what matters to you, to the
            world.
          </p>
          <button className="bg-[#006B6E] hover:bg-[#005A5D] text-white font-medium px-6 py-3 transition-colors">
            Read more
          </button>
        </div>

        <div className="relative w-full h-[400px] overflow-hidden">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
              <div className="text-center p-8">
                <Image
                  src="/hero-image.jpg"
                  alt="Cathay Cargo airplane being loaded with various specialized cargo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
