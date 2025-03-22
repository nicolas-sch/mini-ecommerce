"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user } = useAuth();
  const { cart } = useCart();

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-[#EAECF0] shadow-md p-4 flex justify-between items-center w-full mx-auto">
      <div className="max-w-[1436px] flex justify-between items-center w-full mx-auto">
        <Link href="/" className="text-xl font-bold text-blue-600">
          <Image
            src="/LogoCecotec.png"
            alt="Logo"
            width={136}
            height={24}
            className={"logo"}
          />
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">Hola, {user.firstName}</span>
              <Link
                href="/cart"
                className="relative text-white px-4 py-2 rounded"
              >
                <Image
                  src="/cart.svg"
                  alt="Ícono de carrito"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {totalItemsInCart > 0 && (
                  <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItemsInCart}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <Image
                src="/loginIcon.png"
                alt="Ícone de login"
                width={18}
                height={18}
                className="mr-2"
              />
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
