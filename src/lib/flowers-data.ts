export interface Flower {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "roses" | "tulips" | "lilies" | "seasonal" | "mixed"
  color: string[]
  inStock: boolean
}

export interface Bouquet {
  id: string
  name: string
  description: string
  price: number
  image: string
  flowers: string[]
  popular: boolean
}

export const flowers: Flower[] = [
  {
    id: "rose-red",
    name: "Red Roses",
    description: "Classic red roses symbolizing love and passion",
    price: 4.99,
    image: "/red-roses-bouquet.png",
    category: "roses",
    color: ["red"],
    inStock: true,
  },
  {
    id: "rose-pink",
    name: "Pink Roses",
    description: "Soft pink roses representing grace and elegance",
    price: 4.99,
    image: "/pink-roses-bouquet.png",
    category: "roses",
    color: ["pink"],
    inStock: true,
  },
  {
    id: "rose-white",
    name: "White Roses",
    description: "Pure white roses for innocence and new beginnings",
    price: 4.99,
    image: "/white-roses-bouquet.png",
    category: "roses",
    color: ["white"],
    inStock: true,
  },
  {
    id: "tulip-red",
    name: "Red Tulips",
    description: "Vibrant red tulips bringing spring joy",
    price: 3.99,
    image: "/red-tulips-bouquet.jpg",
    category: "tulips",
    color: ["red"],
    inStock: true,
  },
  {
    id: "tulip-yellow",
    name: "Yellow Tulips",
    description: "Cheerful yellow tulips for sunshine and happiness",
    price: 3.99,
    image: "/yellow-tulips-bouquet.jpg",
    category: "tulips",
    color: ["yellow"],
    inStock: true,
  },
  {
    id: "tulip-pink",
    name: "Pink Tulips",
    description: "Delicate pink tulips for caring and affection",
    price: 3.99,
    image: "/pink-tulips-bouquet.jpg",
    category: "tulips",
    color: ["pink"],
    inStock: true,
  },
  {
    id: "lily-white",
    name: "White Lilies",
    description: "Elegant white lilies symbolizing purity",
    price: 5.99,
    image: "/white-lilies-bouquet.png",
    category: "lilies",
    color: ["white"],
    inStock: true,
  },
  {
    id: "lily-pink",
    name: "Pink Lilies",
    description: "Beautiful pink lilies for prosperity and abundance",
    price: 5.99,
    image: "/pink-lilies-bouquet.jpg",
    category: "lilies",
    color: ["pink"],
    inStock: true,
  },
  {
    id: "sunflower",
    name: "Sunflowers",
    description: "Bright sunflowers bringing warmth and positivity",
    price: 4.49,
    image: "/sunflowers-bouquet.png",
    category: "seasonal",
    color: ["yellow"],
    inStock: true,
  },
  {
    id: "lavender",
    name: "Lavender",
    description: "Fragrant lavender for calm and serenity",
    price: 3.49,
    image: "/lavender-flowers-bouquet.jpg",
    category: "seasonal",
    color: ["purple"],
    inStock: true,
  },
]

export const bouquets: Bouquet[] = [
  {
    id: "romantic-red",
    name: "Romantic Red",
    description: "A stunning arrangement of red roses and white lilies",
    price: 79.99,
    image: "/romantic-red-rose-and-lily-bouquet.jpg",
    flowers: ["rose-red", "lily-white"],
    popular: true,
  },
  {
    id: "spring-garden",
    name: "Spring Garden",
    description: "Colorful mix of tulips and seasonal flowers",
    price: 64.99,
    image: "/spring-garden-mixed-tulips-bouquet.jpg",
    flowers: ["tulip-red", "tulip-yellow", "tulip-pink"],
    popular: true,
  },
  {
    id: "elegant-white",
    name: "Elegant White",
    description: "Pure white roses and lilies for sophistication",
    price: 89.99,
    image: "/elegant-white-roses-and-lilies-bouquet.jpg",
    flowers: ["rose-white", "lily-white"],
    popular: false,
  },
  {
    id: "pink-blush",
    name: "Pink Blush",
    description: "Soft pink roses and lilies for grace",
    price: 74.99,
    image: "/pink-blush-roses-and-lilies-bouquet.jpg",
    flowers: ["rose-pink", "lily-pink", "tulip-pink"],
    popular: true,
  },
  {
    id: "sunshine-delight",
    name: "Sunshine Delight",
    description: "Bright sunflowers and yellow tulips",
    price: 59.99,
    image: "/sunshine-sunflowers-and-yellow-tulips-bouquet.jpg",
    flowers: ["sunflower", "tulip-yellow"],
    popular: false,
  },
  {
    id: "lavender-dreams",
    name: "Lavender Dreams",
    description: "Calming lavender with pink accents",
    price: 54.99,
    image: "/lavender-dreams-purple-and-pink-bouquet.jpg",
    flowers: ["lavender", "rose-pink"],
    popular: false,
  },
]
