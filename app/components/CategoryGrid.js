"use client";

import Link from "next/link";
import { useCategories } from "../hooks/useCategories";
import Spinner from "./Spinner";

export default function CategoryGrid() {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Spinner />
        <p className="mt-4">Cargando categorias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Error al cargar categorias</h2>
        <p className="text-red-600 mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Nuestras categorías</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
