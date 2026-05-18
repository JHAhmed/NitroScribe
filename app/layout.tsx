import { Geist, Geist_Mono, Inter, Urbanist } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                // inter.variable,
                urbanist.variable
            )}>
            <body className="flex flex-col min-h-svh items-center justify-center p-4 bg-gray-50 dark:bg-gray-950 selection:bg-sky-300 selection:text-white">
                <ThemeProvider>
                    <Navbar />
                    {children}
                    <Toaster />
                    <a href="https://wurks.studio" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline mt-2 font-medium text-gray-600 dark:text-gray-400">
                        By <span className="text-[#5809fc] dark:text-[#ddf813]">Wurks</span> Studio.
                    </a>
                </ThemeProvider>
            </body>
        </html>
    )
}
