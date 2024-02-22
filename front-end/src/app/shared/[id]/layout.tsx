"use client";

import { AppProvider } from "../../AppContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
        <div className="">{children}</div>
    </AppProvider>
  );
}
