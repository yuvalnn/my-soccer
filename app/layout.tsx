import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ספר כדורגל בעברית",
  description: "אתר תוכן RTL המבוסס על פרקי ספר בעברית."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
