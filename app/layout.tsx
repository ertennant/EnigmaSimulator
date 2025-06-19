import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Roboto_Mono } from "next/font/google";
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

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

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
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${robotoMono.variable} antialiased flex flex-col items-center justify-between min-h-screen h-full w-full`}
      >
        {children}
        <footer className="flex flex-row justify-between bg-black text-white items-center p-2 self-stretch">
          <div></div>
          <small>Copyright &copy; Elizabeth Tennant 2025</small>
          <a href="https://github.com/ertennant">
            <Image
              src="./github-mark.svg"
              alt="Link to GitHub"
              height={30}
              width={30}
            ></Image>
          </a>
        </footer>
      </body>
    </html>
  );
}
