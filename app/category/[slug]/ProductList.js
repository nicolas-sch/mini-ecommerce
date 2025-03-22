"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductList({ products, slug }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    if (sortBy === "sold") {
      return [...products].sort((a, b) => b.sold - a.sold);
    }
    return products;
  }, [products, sortBy]);

  if (!products.length) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Ningun producto encontrado</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          Volver a home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <Select onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="sold">Más vendidos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} slugCategory={slug} />
        ))}
      </div>
    </>
  );
}