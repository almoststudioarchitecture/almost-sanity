import Head from 'next/head';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from './css/layout.module.css';
import Navbar from "./components/global/Navbar";
import './css/globals.css';
import Footer from "./components/global/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Almost Studio",
  metadataBase: new URL("https://sanity-nextjs-site.vercel.app"),
  description: "A personal portfolio site built with Sanity and Next.js",
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
      {/* <body className={`${inter.className}`}> */}
      <body>
        <Navbar />
        {/* {children} */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}

// export const siteTitle = 'ALMOST STUDIO';

// type RootLayoutProps = {
//   children: React.ReactNode;
//   home?: boolean; // Use the correct type for 'home' based on your usage
// };

// export default function RootLayout({ children, home }: RootLayoutProps) {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <link rel="icon" href="/favicon.ico" />
//         <meta
//           name="description"
//           content="Learn how to build a personal website using Next.js"
//         />
//         <meta
//           property="og:image"
//           content={`https://og-image.vercel.app/${encodeURI(
//             siteTitle,
//           )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
//         />
//         <meta name="og:title" content={siteTitle} />
//         <meta name="twitter:card" content="summary_large_image" />
//       </Head>
//       <main>{children}</main>
//     </div>
//   );
// }