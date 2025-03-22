import { useState, useEffect } from "react";
import { getProductDetails } from "../services/api";

export function useProductDetails(slugCategory, slugProduct) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(slugCategory, slugProduct);
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [slugCategory, slugProduct]);

  return { product, isLoading, error };
}
