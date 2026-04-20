import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Framed Nest | Premium Art Prints for Modern Living",
    template: "%s | Framed Nest",
  },
  description: "Curated art prints that transform your space into a gallery. Premium posters for sophisticated homes.",
  keywords: ["art prints", "posters", "wall art", "home decor", "scandinavian design", "minimalist art"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://framednest.com'),
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    siteName: 'Framed Nest',
    title: 'Framed Nest | Premium Art Prints',
    description: 'Curated art prints that transform your space into a gallery.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Framed Nest | Premium Art Prints',
    description: 'Curated art prints that transform your space into a gallery.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
