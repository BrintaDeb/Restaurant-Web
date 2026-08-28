import { useRef, useState } from "react"
import { CartProvider } from "./context/CartContext"
import { useReveal } from "./hooks/useGsap"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import About from "./components/About"
import Menu from "./components/Menu"
import Gallery from "./components/Gallery"
import Testimonials from "./components/Testimonials"
import Reservation from "./components/Reservation"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import CartDrawer from "./components/CartDrawer"

export default function App() {
  const root = useRef(null)
  const [cartOpen, setCartOpen] = useState(false)
  useReveal(root)

  return (
    <CartProvider>
      <div ref={root}>
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar onOpenCart={() => setCartOpen(true)} />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Menu />
          <Gallery />
          <Testimonials />
          <Reservation />
          <Contact />
        </main>
        <Footer />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  )
}
