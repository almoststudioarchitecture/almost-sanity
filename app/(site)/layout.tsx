import type { Metadata } from "next";
import Navbar from "./components/global/Navbar";
import './css/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Almost Studio",
  metadataBase: new URL("https://sanity-nextjs-site.vercel.app"),
  description: "Almost Studio is a design practice working on projects between the US and France.",
  openGraph: {
    images:
      "https://cdn.sanity.io/images/oogp23sh/production/3a718c50f7f615917e97299f70d1e4f266bc4127-1200x630.png",
  },
};

export const siteTitle = 'ALMOST STUDIO';
export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
      <GoogleAnalytics gaId="G-K8S3973D6Y" />
    </html>
  );
}
