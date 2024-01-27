import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mentorify",
  description: "Find your mentor and learn together!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full min-h-screen scroll-smooth bg-white antialiased"
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
