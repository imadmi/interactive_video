import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SlideUpComponent from "./components/SlideUpComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VideoAsk",
  description:
    "interactive video that helps you streamline your conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <SlideUpComponent>
          <div className="text-black">{children}</div>
        </SlideUpComponent>
      </body>
    </html>
  );
}
