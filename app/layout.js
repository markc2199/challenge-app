import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./(platform)/_components/nav";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Challenger",
  description: "Create, manage, and participate in challenges with friends and family.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
