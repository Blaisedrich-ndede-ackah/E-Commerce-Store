"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-64 md:h-72 bg-secondary overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 p-2 bg-card rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? "fill-current text-accent" : ""}`} />
        </button>
        <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            ₦
            {(product.price / 100).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* Button */}
        <Button
          onClick={handleAddToCart}
          className={`w-full transition-all ${
            isAdded ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
          }`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}
