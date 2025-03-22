"use client";

import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { user, logout } = useAuth();

  return (
    <footer className="bg-gray-800 text-white p-2 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          <p>
            &copy; {new Date().getFullYear()} Mini-Ecommerce. Reservados todos
            los derechos.
          </p>
        </div>

        {user && (
          <Button
            onClick={logout}
            className="text-white-700 bg-transparet hover:text-gray-400"
          >
            Salir
          </Button>
        )}
      </div>
    </footer>
  );
}
