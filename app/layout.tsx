import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata={title:"TopUp Site",description:"Manual topup demo"};
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
