import Product from "@/data/Product.model";
import EventEmitter from "eventemitter3"; // Use the third-party library
const eventEmitter = new EventEmitter();

export default {
  getCart(): Product[] {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  },

  getTotalItems(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  },

  updateCart(cartItems: Product[]): void {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    eventEmitter.emit("cartUpdated");
  },

  addToCart(item: Product): void {
    const cart: Product[] = this.getCart();
    const existingItem = cart.find(
      (cartItem: Product) => cartItem.id === item.id
    );

    if (existingItem) {
      if (existingItem.quantity + 1 > item.stock) {
        alert("Hiện tại không thể thêm.");
        return;
      }
      existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
      if (item.stock < 1) {
        alert("Sản phâm hiện đang hết hàng.");
        return;
      }

      item.quantity = 1;
      cart.push(item);
    }
    alert(`${item.name} đã được thêm vào giỏ hàng.`);
    this.updateCart(cart);
  },

  removeFromCart(itemId: string): void {
    const cart = this.getCart().filter((item: Product) => item.id !== itemId);
    this.updateCart(cart);
  },

  clearCart() {
    localStorage.removeItem("cart");
    eventEmitter.emit("cartUpdated");
  },
  eventEmitter,
};
