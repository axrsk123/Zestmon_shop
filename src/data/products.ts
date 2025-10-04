import { Product } from "@/types/product";
import laptopImage from "@/assets/product-laptop.jpg";
import headphonesImage from "@/assets/product-headphones.jpg";
import phoneImage from "@/assets/product-phone.jpg";
import watchImage from "@/assets/product-watch.jpg";
import cameraImage from "@/assets/product-camera.jpg";
import earbudsImage from "@/assets/product-earbuds.jpg";
import tabletImage from "@/assets/product-tablet.jpg";
import consoleImage from "@/assets/product-console.jpg";
import keyboardImage from "@/assets/product-keyboard.jpg";
import mouseImage from "@/assets/product-mouse.jpg";
import monitorImage from "@/assets/product-monitor.jpg";
import speakerImage from "@/assets/product-speaker.jpg";
import ssdImage from "@/assets/product-ssd.jpg";
import webcamImage from "@/assets/product-webcam.jpg";

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
  {
    id: "7",
    name: "Pro Tablet",
    price: 799,
    image: tabletImage,
    category: "Tablets",
    description: "Powerful tablet with stunning display, perfect for work and creativity on the go.",
    rating: 5,
  },
  {
    id: "8",
    name: "Gaming Console X",
    price: 499,
    image: consoleImage,
    category: "Gaming",
    description: "Next-gen gaming console with 4K graphics and lightning-fast load times.",
    rating: 5,
  },
  {
    id: "9",
    name: "Mechanical Keyboard RGB",
    price: 149,
    image: keyboardImage,
    category: "Accessories",
    description: "Premium mechanical keyboard with customizable RGB lighting and tactile switches.",
    rating: 4,
  },
  {
    id: "10",
    name: "Wireless Gaming Mouse",
    price: 79,
    image: mouseImage,
    category: "Accessories",
    description: "Ergonomic wireless mouse with precision sensor and long battery life.",
    rating: 4,
  },
  {
    id: "11",
    name: "Ultrawide Monitor 34",
    price: 699,
    image: monitorImage,
    category: "Displays",
    description: "Immersive curved ultrawide monitor with stunning colors and high refresh rate.",
    rating: 5,
  },
  {
    id: "12",
    name: "Portable Bluetooth Speaker",
    price: 129,
    image: speakerImage,
    category: "Audio",
    description: "Waterproof portable speaker with 360-degree sound and 20-hour battery life.",
    rating: 4,
  },
  {
    id: "13",
    name: "External SSD 1TB",
    price: 159,
    image: ssdImage,
    category: "Storage",
    description: "Ultra-fast portable SSD with rugged design and massive storage capacity.",
    rating: 5,
  },
  {
    id: "14",
    name: "HD Webcam Pro",
    price: 99,
    image: webcamImage,
    category: "Accessories",
    description: "Crystal clear 1080p webcam with built-in ring light for perfect video calls.",
    rating: 4,
  },
];
