import { useState, useEffect } from 'react';
import { getCategoryProducts } from '../services/api';

export function useCategoryProducts(slug) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const data = await getCategoryProducts(slug);
        if (isMounted) setProducts(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { products, isLoading, error };
}
