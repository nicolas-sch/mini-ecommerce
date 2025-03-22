"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { formatPrice } from "@/app/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "/";
  };

  const total = cart.reduce((sum, item) => {
    const discountedPrice = item.pricing.price * (1 - item.pricing.discountRate);
    return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black py-4 shadow-md">
        <div className="container mx-auto text-center">
          <Link href="/">
            <Image
              src="/LogoCecotec.png"
              alt="Logo"
              width={150}
              height={50}
              className="mx-auto cursor-pointer"
            />
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Resumen del pedido</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Tu carrito está vacío.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between"
              >
                <Image
                  src={item.mainImage}
                  width={96}
                  height={96}
                  alt={`Imagen del producto ${item.name}`}
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    {formatPrice(
                      item.pricing.price,
                      item.pricing.discountRate,
                      item.pricing.currency
                    )}
                  </p>
                  {item.shippingShortDescription && (
                    <p className="text-sm text-green-600 mb-4">
                      Envío en 24-72 horas
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              <p className="text-xl font-bold">
                Total:{" "}
                {formatPrice(total.toFixed(2), 0, cart[0]?.pricing?.currency)}
              </p>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-4"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ✅ Modal de Confirmação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">¡Pedido confirmado!</h2>
            <p>Gracias por tu compra. Te redirigiremos a la página principal.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
