import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

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
      <body className={inter.className}>
        <NextTopLoader color="yellow" height={5} crawl={true} />
        {children}
      </body>
    </html>
  );
}
