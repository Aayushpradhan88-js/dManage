"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../lib/store/store";
import Navbar from "../lib/components/navbar/navbar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Training Management System",
  description: "SAAS application for managing training sessions and participants.",
};

// Dashboard routes where the public navbar should be hidden
const DASHBOARD_PREFIXES = [
  "/institute/admin/dashboard",
  "/teacher/dashboard",
  "/student/dashboard",
  "/super-admin/dashboard",
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const pathname = usePathname();
  const isDashboard = DASHBOARD_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store} >
          {!isDashboard && <Navbar/>}
          {children}
        </Provider>
      </body>
    </html>
  );
};