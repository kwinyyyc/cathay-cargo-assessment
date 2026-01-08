import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./core/header.component";
import Footer from "./core/footer.component";
import MenuBar from "./core/menu-bar.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cathay Flight Booking",
  description: "Flight booking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cathaycargo">
      <body className={inter.className}>
        <Providers>
          <Header />
          <MenuBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
