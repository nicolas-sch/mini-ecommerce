"use client";

import React from "react";
import { useProductDetails } from "@/app/hooks/useProductDetails";
import AddToCartButton from "@/app/components/AddToCartButton";
import Link from "next/link";
import { formatPrice } from "@/app/utils/formatPrice";

export default function ProductPage({ params }) {
  const { slugCategory, slugProduct } = React.use(params);
  const { product, isLoading, error } = useProductDetails(
    slugCategory,
    slugProduct
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Erro ao carregar produto</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Volver a home
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          Volver a home
        </Link>
      </div>
    );
  }

  const { name, pricing, mainImage, shippingShortDescription } = product;
  const { price, discountRate, currency, isInStock } = pricing;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:order-1">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="md:order-2">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>

          <div className="mb-4">
            {formatPrice(price, discountRate, currency)}
          </div>

          {isInStock < 10 ? (
            <p className="text-sm text-red-600 mb-4">
              Menos de {isInStock} en stock!
            </p>
          ) : (
            <p>En stock</p>
          )}

          {shippingShortDescription && (
            <p className="text-sm text-green-600 mb-4">Envio en 24-72 horas</p>
          )}

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
