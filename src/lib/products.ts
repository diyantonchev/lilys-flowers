import { bouquets, flowers } from "./flowers-data"

export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// Convert bouquets to products
const bouquetProducts: Product[] = bouquets.map((bouquet) => ({
  id: bouquet.id,
  name: bouquet.name,
  description: bouquet.description,
  priceInCents: Math.round(bouquet.price * 100),
}))

// Convert flowers to products
const flowerProducts: Product[] = flowers.map((flower) => ({
  id: flower.id,
  name: flower.name,
  description: flower.description,
  priceInCents: Math.round(flower.price * 100),
}))

// Combine all products
export const PRODUCTS: Product[] = [...bouquetProducts, ...flowerProducts]
