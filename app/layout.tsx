import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DC Trades",
  description: "Trading Plan Journal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}