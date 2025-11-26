import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg">ShopHub</span>
            </div>
            <p className="text-sm opacity-80">Premium shopping experience with secure payments.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm opacity-80">
          <p>&copy; 2025 ShopHub. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:opacity-100 transition">
              Privacy
            </Link>
            <Link href="#" className="hover:opacity-100 transition">
              Terms
            </Link>
            <Link href="#" className="hover:opacity-100 transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
