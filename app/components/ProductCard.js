"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { formatPrice } from "../utils/formatPrice";

export default function ProductCard({ product, slugCategory }) {
  const { name, pricing, mainImage, slug, shippingShortDescription } = product;
  const { price, discountRate, currency, isInStock } = pricing;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Link href={`/product/${slugCategory}/${slug}`} className="block">
        <CardHeader className="p-4">
          <div className="text-center">
            <Image
              src={mainImage}
              alt={`Imagen do producto ${name}`}
              width={200}
              height={150}
              priority
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4 text-center">
          <CardTitle className="text-lg font-semibold mb-2">{name}</CardTitle>

          <div className="mb-2">
            {formatPrice(price, discountRate, currency)}
          </div>

          {isInStock < 10 && (
            <p className="text-sm text-red-600 mb-2">
              Menos de {isInStock} en stock!
            </p>
          )}

          {shippingShortDescription && (
            <p className="text-sm text-green-600">Envio en 24-72 horas</p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
