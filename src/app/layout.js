import { Inter } from "next/font/google";
import "./globals.css";
import { ContextWapper } from "@/gobleContext/index.jsx";
import NextUIWapper from "@/nextUiProvider/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CybrCure Technologies",
  description: "CybrCure Technologies Employee Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ContextWapper>
        <body className={inter.className}>
          <NextUIWapper>
            {children}
          </NextUIWapper>
        </body>
      </ContextWapper>
    </html>
  );
}
