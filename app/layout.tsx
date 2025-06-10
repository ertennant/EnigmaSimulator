import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enigma Simulator",
  description: "An online simulator of the Enigma machines used for cryptography in World War 2.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between h-screen w-full`}
      >
        {children}
        <footer className="flex flex-row justify-between">
          <div></div>
          <small>Copyright &copy; Elizabeth Tennant 2025</small>
          <a href="https://github.com/ertennant">
            <Image
              src="./github-mark.svg"
              alt="Link to GitHub"
              height={40}
              width={40}
            ></Image>
          </a>
        </footer>
      </body>
    </html>
  );
}
