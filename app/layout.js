"use client";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isCartPage = pathname === "/cart";

  return (
    <html lang="es-ES">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            {!isLoginPage && !isCartPage && (
              <header className="fixed top-0 left-0 w-full z-50">
                <Header />
              </header>
            )}

            <main
              className={`flex-grow ${
                !isLoginPage && !isCartPage ? "pt-16 pb-16" : ""
              }`}
            >
              {children}
            </main>

            {!isLoginPage && !isCartPage && (
              <footer className="fixed bottom-0 left-0 w-full z-50">
                <Footer />
              </footer>
            )}

            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
