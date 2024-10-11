import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AppbarClient } from "./components/AppbarClient";


export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <AppbarClient />
          {children}
        </body>
      </Providers>
    </html>
  );
}
