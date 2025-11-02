import { Product } from "@/types/product";
import classicImage from "@/assets/lemonade-classic-bottle.jpg";
import orangeImage from "@/assets/lemonade-orange-bottle.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Lemonade",
    price: 4.99,
    image: classicImage,
    category: "Classic",
    description: "Our signature fresh-squeezed lemonade. Simple, pure, and perfectly balanced.",
    rating: 5,
    stock: 0,
  },
  {
    id: "2",
    name: "Orange Lemonade",
    price: 5.49,
    image: orangeImage,
    category: "Citrus Blend",
    description: "Zesty orange meets tangy lemon in this bright and refreshing citrus fusion.",
    rating: 5,
    stock: 0,
  },
];
