import type { Metadata } from "next";
import { Onest, Caveat } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Орто-Рекавери — центр восстановительной медицины в Махачкале (демо)",
  description:
    "Демо-версия сайта ЦВМ «Орто-Рекавери»: ортопед-травматолог, реабилитация и ЛФК, физиотерапия, эндоскопия под седацией. Махачкала, пр. Имама Шамиля, 35А.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
