"use client";

import { useState, useMemo } from "react";
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
    return sortBy === "sold"
      ? [...products].sort((a, b) => b.sold - a.sold)
      : products;
  }, [products, sortBy]);

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p>No se encontraron productos.</p>
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
