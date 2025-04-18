import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/server";
import { logout } from "./logout/actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Share-er",
  description: "A platform to share and discover thoughts with the community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data: profileData } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    profile = profileData;
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900`}
      >
        <Navbar user={user} profile={profile} logout={logout} />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}