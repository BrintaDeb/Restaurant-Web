import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reserve", label: "Reservations" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar({ onOpenCart }) {
  const { bill } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "glass shadow-[0_8px_32px_rgba(0,0,0,0.45)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="group flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full border border-gold-400/60 text-gold-300 transition-all duration-300 group-hover:bg-gold-400 group-hover:text-ink-950 group-hover:shadow-[0_0_20px_rgba(217,171,79,0.35)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 2c1.5 3 4 4.5 4 8a4 4 0 1 1-8 0c0-3.5 2.5-5 4-8Z" />
              <path d="M12 14v8" />
            </svg>
          </span>
          <span className="font-display text-xl tracking-wide">
            Saffron <span className="text-gold-400">&amp;</span> Sage
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-sm font-medium tracking-wide text-cream-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="btn-indian btn-ghost relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            aria-label="Open cart"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
              <path d="M3 3h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.3h7.7a1.5 1.5 0 0 0 1.5-1.2L20 7H6" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {bill.count > 0 && (
              <span className="cart-badge-pulse absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-gold-400 text-[11px] font-bold text-ink-950 shadow-[0_0_12px_rgba(217,171,79,0.5)]">
                {bill.count}
              </span>
            )}
          </button>

          <button
            className="btn-indian grid size-10 place-items-center rounded-full border border-cream-50/15 text-cream-50 transition-all duration-300 hover:border-gold-400/60 hover:text-gold-300 hover:shadow-[0_0_16px_rgba(217,171,79,0.2)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`glass overflow-hidden transition-all duration-500 lg:hidden ${
          open ? "max-h-96 border-t border-cream-50/10" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-cream-300 transition-all duration-300 hover:bg-cream-50/5 hover:text-gold-300 hover:pl-5"
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
