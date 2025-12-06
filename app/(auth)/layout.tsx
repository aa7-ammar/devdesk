import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { cookies } from "next/headers"; // 1. Import cookies
import "@/app/globals.css";
import { CustomToaster } from "@/components/ui/custom-toaster";
// import { NavBar } from "@/components/Navbar";
// import { verifyAccessToken } from "@/lib/auth";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevDesk Auth",
  description: "Developer productivity app",
};

// 2. Make the layout async
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 3. Check for the auth token
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value; 
  // const user = verifyAccessToken(token!);

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {/* <NavBar isLoggedIn={!!user} /> */}
        {children}
        <CustomToaster position="top-center" />
      </body>
    </html>
  );
}