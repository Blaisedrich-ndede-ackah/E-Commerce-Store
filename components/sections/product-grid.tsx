"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/products/product-card"

interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch from JSONBin or API
    const fetchProducts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        // Fallback demo products
        setProducts([
          {
            id: "1",
            name: "Premium Wireless Headphones",
            price: 29999,
            description: "High-quality sound with noise cancellation",
            image: "/wireless-headphones.png",
            category: "Electronics",
          },
          {
            id: "2",
            name: "Luxury Watch",
            price: 49999,
            description: "Elegant timepiece with leather strap",
            image: "/luxury-watch.jpg",
            category: "Accessories",
          },
          {
            id: "3",
            name: "Designer Sunglasses",
            price: 19999,
            description: "UV protection with premium frames",
            image: "/designer-sunglasses.png",
            category: "Accessories",
          },
          {
            id: "4",
            name: "Smartphone Stand",
            price: 4999,
            description: "Adjustable stand for all devices",
            image: "/phone-stand.jpg",
            category: "Electronics",
          },
          {
            id: "5",
            name: "Premium Backpack",
            price: 14999,
            description: "Durable and spacious travel backpack",
            image: "/premium-backpack.jpg",
            category: "Bags",
          },
          {
            id: "6",
            name: "Wireless Charger",
            price: 7999,
            description: "Fast charging compatible with all devices",
            image: "/wireless-charger.png",
            category: "Electronics",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
        <p className="text-muted-foreground text-lg">Explore our carefully selected collection</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
