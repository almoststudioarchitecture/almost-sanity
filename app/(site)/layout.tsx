import Head from 'next/head';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from './css/layout.module.css';
import Navbar from "./components/global/Navbar";
import './css/globals.css';
import Footer from "./components/global/Footer";

export const metadata: Metadata = {
  title: "Almost Studio",
  metadataBase: new URL("https://sanity-nextjs-site.vercel.app"),
  description: "Almost Studio is a design practice working on projects between the US and France.",
  openGraph: {
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1689893059/docs/og.png",
  },
};

export const siteTitle = 'ALMOST STUDIO';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}