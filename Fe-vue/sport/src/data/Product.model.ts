// Product.model.ts
export default class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  discount: number;
  sizes: string[];
  colors: string[];
  size: string;
  color: string;
  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    discount: number,
    image: string,
    sizes: string[] = [],
    colors: string[] = [],
    size: string,
    color: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.quantity = 0;
    this.sizes = sizes;
    this.colors = colors;
    this.stock = stock;
    this.discount = discount;
    this.color = color;
    this.size = size;
  }
}
