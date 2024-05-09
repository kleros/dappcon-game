import React from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import StyledComponentsRegistry from "@/lib/registry";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kleros Schelling Game",
  description: "Connect to earn $PNK",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className={font.className} style={{ height: "100%" }}>
        <StyledComponentsRegistry>
          <ToastContainer />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
