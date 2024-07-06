import NextAuthWrapper from "@/lib/next.auth.wrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './app.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Study_IELTS_Web",
    description: "IELTS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthWrapper>
                    {children}
                </NextAuthWrapper>
            </body>
        </html>
    );
}
