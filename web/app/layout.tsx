import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utilts";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zushy",
  description: "Goated chess app and bot.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased bg-neutral-800 text-neutral-50",
          montserrat.className
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
