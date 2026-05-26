import { Syne } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata = {
  title: "TruLink - Anonymous Chat & Social Connection App",
  description:
    "Join TruLink as an anonymous user, chat with strangers safely, and convert to a permanent account to unlock full social features and personalization.",
  keywords: [
    "anonymous chat",
    "chat with strangers",
    "social chat app",
    "TruLink",
    "random chat app",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.className} antialiased`}>
      <link rel="icon" href="/icons/flame.svg" type="image/svg+xml" />
      <body className="bg-linear-to-br bg-[#152331] to-black text-white">
        <div className='absolute -top-10 -left-10 h-100 w-100 bg-[radial-gradient(circle,var(--accent),transparent)] opacity-10 blur-2xl rounded-full -z-10' />
        <div className='absolute bottom-0 right-0 h-100 w-100 bg-[radial-gradient(circle,var(--accent-2),transparent)] opacity-10 blur-2xl rounded-full -z-10' />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
