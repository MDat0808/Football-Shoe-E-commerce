export function formatDiscountedPrice(price: number, discount: number): string {
  const discountedPrice = discount > 0 ? price * (1 - discount) : price;
  return `$ ${discountedPrice.toFixed(2)}`;
}

export function formatPrice(price: number): string {
  return `$ ${price.toFixed(2)}`;
}
