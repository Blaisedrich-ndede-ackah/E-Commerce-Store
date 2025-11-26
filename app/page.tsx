import Header from "@/components/layout/header"
import Hero from "@/components/sections/hero"
import ProductGrid from "@/components/sections/product-grid"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductGrid />
      <Footer />
    </main>
  )
}
