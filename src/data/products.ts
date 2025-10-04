import { Product } from "@/types/product";
import laptopImage from "@/assets/product-laptop.jpg";
import headphonesImage from "@/assets/product-headphones.jpg";
import phoneImage from "@/assets/product-phone.jpg";
import watchImage from "@/assets/product-watch.jpg";
import cameraImage from "@/assets/product-camera.jpg";
import earbudsImage from "@/assets/product-earbuds.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Laptop Pro",
    price: 1299,
    image: laptopImage,
    category: "Computers",
    description: "Powerful laptop with stunning display and all-day battery life. Perfect for professionals.",
    rating: 5,
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 299,
    image: headphonesImage,
    category: "Audio",
    description: "Premium over-ear headphones with active noise cancellation and superior sound quality.",
    rating: 5,
  },
  {
    id: "3",
    name: "Smartphone X",
    price: 899,
    image: phoneImage,
    category: "Phones",
    description: "Latest flagship smartphone with advanced camera system and blazing-fast performance.",
    rating: 4,
  },
  {
    id: "4",
    name: "Smart Watch Ultra",
    price: 449,
    image: watchImage,
    category: "Wearables",
    description: "Advanced fitness tracking, health monitoring, and seamless connectivity on your wrist.",
    rating: 5,
  },
  {
    id: "5",
    name: "Professional Camera",
    price: 1899,
    image: cameraImage,
    category: "Photography",
    description: "Mirrorless camera with exceptional image quality and advanced autofocus system.",
    rating: 5,
  },
  {
    id: "6",
    name: "True Wireless Earbuds",
    price: 199,
    image: earbudsImage,
    category: "Audio",
    description: "Compact earbuds with impressive sound, long battery life, and comfortable fit.",
    rating: 4,
  },
];
