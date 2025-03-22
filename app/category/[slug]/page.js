import ProductList from "./ProductList";
import { getCategoryProducts } from "@/app/services/api";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  try {
    const products = await getCategoryProducts(slug);

    return (
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Productos de la Categoria</h2>
        <ProductList products={products} slug={slug} />
      </div>
    );
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Error al cargar productos</h2>
        <p className="text-red-600 mb-4">No se pudieron recuperar los productos. Inténtelo de nuevo más tarde.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Volver a home
        </Link>
      </div>
    );
  }
}