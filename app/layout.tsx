import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: "El safwat",
  description: "under structure",
};

export default async  function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

   const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="light"
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
