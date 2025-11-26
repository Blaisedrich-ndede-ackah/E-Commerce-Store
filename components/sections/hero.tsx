import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Discover Your Perfect Products</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
            Shop from our curated collection of premium products. Fast delivery, secure payments, and exceptional
            customer service.
          </p>
          <Link href="#shop">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
