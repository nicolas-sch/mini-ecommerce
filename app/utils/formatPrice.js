export const formatPrice = (price, discountRate, currency) => {
  if (discountRate > 0) {
    const discountedPrice = (price * (1 - discountRate)).toFixed(2);
    return (
      <>
        <span className="text-red-600 line-through mr-2">
          {currency} {price}
        </span>
        <span className="text-green-600 font-bold">
          {currency} {discountedPrice}
        </span>
        <span className="text-green-600 ml-2">({discountRate * 100}% off)</span>
      </>
    );
  }
  return (
    <span className="text-gray-800 font-bold">
      {currency} {price}
    </span>
  );
};
