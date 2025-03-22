"use client";

import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Producto añadido al carrito!');
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-blue-600 text-white hover:bg-blue-700" 
    >
      Comprar
    </Button>
  );
}