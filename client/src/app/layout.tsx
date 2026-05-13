"use client"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Provider } from "react-redux"
import store from "../lib/store/store"
import Navbar from "../lib/components/navbar/navbar"
import { usePathname } from "next/navigation"
import { AuthHydrator } from "../lib/components/auth/auth-hydrator"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const metadata: Metadata = {
  title: "Training Management System",
  description: "SAAS application for managing training sessions and participants.",
}

// Dashboard and Auth routes where the public navbar should be hidden
const HIDE_NAVBAR_PATHS = [
  "/institute/admin/dashboard",
  "/teacher/dashboard",
  "/student/dashboard",
  "/super-admin/dashboard",
  "/login",
  "/register",
  "/institute/becomeInstitute",
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const shouldHideNavbar = HIDE_NAVBAR_PATHS.some((prefix) =>
    pathname.startsWith(prefix)
  )

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store} >
          <AuthHydrator />
          {!shouldHideNavbar && <Navbar />}
          {children}
        </Provider>
      </body>
    </html>
  )
}
