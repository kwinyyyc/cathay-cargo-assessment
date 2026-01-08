"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1D3C34] text-base-100 pt-12 pb-6 mt-12">
      <div className="container mx-auto px-4 space-y-10">
        {/* Top columns */}
        <div className="grid gap-10 md:grid-cols-4 text-sm">
          {/* About us */}
          <div className="space-y-3">
            <h3 className="font-semibold">About us</h3>
            <ul className="space-y-2 text-base-100/80">
              <li>
                <Link href="#" className="hover:underline">
                  About Cathay Cargo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Invester relations
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="space-y-3">
            <h3 className="font-semibold">Privacy</h3>
            <ul className="space-y-2 text-base-100/80">
              <li>
                <Link href="#" className="hover:underline">
                  Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Cookie settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-3">
            <h3 className="font-semibold">Terms &amp; Conditions</h3>
            <ul className="space-y-2 text-base-100/80">
              <li>
                <Link href="#" className="hover:underline">
                  Shipment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Website Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Hong Kong Export Cargo Fuel Surcharge
                </Link>
              </li>
            </ul>
          </div>

          {/* Cathay Subsidiaries */}
          <div className="space-y-3">
            <h3 className="font-semibold">Cathay Subsidiaries</h3>
            <ul className="space-y-2 text-base-100/80">
              <li>
                <Link href="#" className="hover:underline">
                  Cathay Cargo Terminal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Air Hong Kong
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle row: Follow + badges */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Follow */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Follow</h3>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-base-100/40 hover:bg-base-100/10 transition-colors"
              >
                <span className="text-lg font-semibold leading-none">in</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-100/30 pt-4" />

        {/* Bottom row: copyright + language */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-base-100/80">
          <div>Copyright © Cathay Pacific Airways Limited 國泰航空有限公司</div>
          <div className="flex items-center gap-3">
            <span className="text-base">🌐</span>
            <button className="hover:underline">繁體中文</button>
            <span>|</span>
            <button className="hover:underline">简体中文</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
