"use client";

import { AppProvider } from "../AppContext";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <Navbar />
        <div className="">{children}</div>
    </AppProvider>
  );
}
