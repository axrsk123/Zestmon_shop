import { Product } from "@/types/product";
import classicImage from "@/assets/lemonade-classic.jpg";
import strawberryImage from "@/assets/lemonade-strawberry.jpg";
import mintImage from "@/assets/lemonade-mint.jpg";
import blueberryImage from "@/assets/lemonade-blueberry.jpg";
import peachImage from "@/assets/lemonade-peach.jpg";
import raspberryImage from "@/assets/lemonade-raspberry.jpg";
import lavenderImage from "@/assets/lemonade-lavender.jpg";
import watermelonImage from "@/assets/lemonade-watermelon.jpg";
import mangoImage from "@/assets/lemonade-mango.jpg";
import gingerImage from "@/assets/lemonade-ginger.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Lemonade",
    price: 4.99,
    image: classicImage,
    category: "Classic",
    description: "Our signature fresh-squeezed lemonade. Simple, pure, and perfectly balanced.",
    rating: 5,
  },
  {
    id: "2",
    name: "Strawberry Lemonade",
    price: 5.99,
    image: strawberryImage,
    category: "Fruit Fusion",
    description: "Sweet strawberries blended with tangy lemons for a refreshing summer treat.",
    rating: 5,
  },
  {
    id: "3",
    name: "Mint Lemonade",
    price: 5.49,
    image: mintImage,
    category: "Herbal",
    description: "Cool mint leaves infused with fresh lemonade for a revitalizing experience.",
    rating: 4,
  },
  {
    id: "4",
    name: "Blueberry Lemonade",
    price: 5.99,
    image: blueberryImage,
    category: "Fruit Fusion",
    description: "Antioxidant-rich blueberries meet zesty lemons in this vibrant purple delight.",
    rating: 5,
  },
  {
    id: "5",
    name: "Peach Lemonade",
    price: 5.99,
    image: peachImage,
    category: "Fruit Fusion",
    description: "Juicy peaches combined with fresh lemons for a sweet and tangy sensation.",
    rating: 5,
  },
  {
    id: "6",
    name: "Raspberry Lemonade",
    price: 5.99,
    image: raspberryImage,
    category: "Fruit Fusion",
    description: "Tart raspberries complement fresh lemons perfectly in this pink paradise.",
    rating: 4,
  },
  {
    id: "7",
    name: "Lavender Lemonade",
    price: 6.49,
    image: lavenderImage,
    category: "Herbal",
    description: "Delicate lavender flowers create a sophisticated and calming lemonade experience.",
    rating: 5,
  },
  {
    id: "8",
    name: "Watermelon Lemonade",
    price: 5.99,
    image: watermelonImage,
    category: "Fruit Fusion",
    description: "Refreshing watermelon juice mixed with lemonade for the ultimate summer cooler.",
    rating: 5,
  },
  {
    id: "9",
    name: "Mango Lemonade",
    price: 5.99,
    image: mangoImage,
    category: "Tropical",
    description: "Tropical mango meets bright lemon for an exotic and refreshing escape.",
    rating: 4,
  },
  {
    id: "10",
    name: "Ginger Lemonade",
    price: 5.49,
    image: gingerImage,
    category: "Spiced",
    description: "Fresh ginger root adds a zesty kick to classic lemonade. Energizing and bold.",
    rating: 4,
  },
];
