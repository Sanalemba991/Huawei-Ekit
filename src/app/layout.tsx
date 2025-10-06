import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "../components/ConditionalLayout";
import CSPRemover from "../components/CSPRemover";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huawei eKit UAE",
  description: "Your authorised distributor in the UAE, offering a complete range of Huawei eKit solutions. We provide genuine products, expert support, and fast delivery across the region to help businesses and individuals stay connected with trusted Huawei technology",
  other: {
    // Override any CSP headers
    'Content-Security-Policy': '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="" />
        <meta httpEquiv="Content-Security-Policy-Report-Only" content="" />
        <meta httpEquiv="X-Content-Security-Policy" content="" />
        <meta httpEquiv="X-WebKit-CSP" content="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Aggressive CSP removal before any other scripts
              (function() {
                try {
                  // Remove all CSP meta tags
                  document.addEventListener('DOMContentLoaded', function() {
                    const cspMetas = document.querySelectorAll('meta[http-equiv*="Content-Security-Policy"], meta[http-equiv*="CSP"]');
                    cspMetas.forEach(function(meta) { meta.remove(); });
                  });
                  
                  // Override any CSP policy immediately
                  if (typeof window !== 'undefined') {
                    Object.defineProperty(document, 'contentSecurityPolicy', {
                      get: function() { return null; },
                      set: function() { return null; }
                    });
                  }
                } catch(e) {
                  console.log('CSP override script executed');
                }
              })();
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CSPRemover />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
