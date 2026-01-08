"use client";

import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import MenuBar from "./menu-bar.component";
import OutlineButton from "./outline-button.component";

export default function Header() {
  return (
    <header className="bg-base-100 border-b border-base-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center pb-4 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/cargo-logo.svg"
              alt="Cathay Cargo"
              width={209}
              height={30}
            />
          </Link>
          <div className="flex flex-grow pl-20">
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-md font-medium text-base-content hover:text-gray-500 transition-colors"
              >
                Shipping with us
              </Link>
              <Link
                href="/"
                className="text-md font-medium text-base-content hover:text-gray-500 transition-colors"
              >
                Our solutions
              </Link>
              <Link
                href="/"
                className="text-md font-medium text-base-content hover:text-gray-500 transition-colors"
              >
                Help &amp; support
              </Link>
              <Link
                href="/"
                className="text-md font-medium text-base-content hover:text-gray-500 transition-colors"
              >
                About Cathay Cargo
              </Link>
            </nav>
          </div>
          <div className="flex self-end gap-4">
            <OutlineButton>
              <span className="text-md">Sign in / Register</span>
            </OutlineButton>
          </div>
        </div>
      </div>
    </header>
  );
}
