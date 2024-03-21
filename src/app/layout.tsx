import React from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kleros Schelling Game",
  description: "Connect to earn $PNK",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
