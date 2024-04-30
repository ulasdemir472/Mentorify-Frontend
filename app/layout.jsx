import { Inter, Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SocketContextProvider } from "@/contexts/SocketContext";

const inter = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

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
        <AuthProvider>
          <SocketContextProvider>
            <main>{children}</main>
          </SocketContextProvider>
        </AuthProvider>
        <ToastContainer position="top-center" newestOnTop />
      </body>
    </html>
  );
}
