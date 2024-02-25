"use client";

import { AppProvider } from "../../AppContext";
import Navbar from "../../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100 h-screen overflow-y-auto">
      <AppProvider>
        <Navbar />
        <div className="">{children}</div>
      </AppProvider>
    </div>
  );
}
