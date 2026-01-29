import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "GenApps.online - Build Stunning Websites Instantly with AI",
  description: "Generate beautiful, production-ready frontend websites in seconds using AI. The fastest way to build websites.",
  keywords: ["AI website builder", "website generator", "frontend generator", "AI development"],
  authors: [{ name: "GenApps.online" }],
  openGraph: {
    title: "GenApps.online - AI Website Generator",
    description: "Generate stunning websites instantly with AI",
    url: "https://genapps.online",
    siteName: "GenApps.online",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenApps.online - AI Website Generator",
    description: "Generate stunning websites instantly with AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
