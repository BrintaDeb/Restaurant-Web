import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { gsap } from "../hooks/useGsap"
import { CATEGORIES, MENU_ITEMS } from "../data/menu"
import { useCart } from "../context/CartContext"
import { money } from "../utils/money"

function TagBadge({ tag }) {
  const styles = {
    veg: "border-emerald-400/40 text-emerald-300",
    spicy: "border-red-400/40 text-red-300",
    chef: "border-gold-400/50 text-gold-300",
  }
  const labels = { veg: "Veg", spicy: "Spicy", chef: "Chef's Pick" }
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[tag]}`}>
      {labels[tag]}
    </span>
  )
}

function MenuCard({ item }) {
  const { addItem, items, setQty } = useCart()
  const inCart = items.find((i) => i.id === item.id)

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-cream-50/10 bg-ink-900/70 transition duration-500 hover:-translate-y-1.5 hover:border-gold-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="size-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {item.tags.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-ink-950/80 px-2.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17l-6.2 3.9 1.6-7L2 9.2l7.1-.6L12 2z" />
          </svg>
          {item.rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-snug">{item.name}</h3>
          <p className="whitespace-nowrap font-display text-lg text-gold-300">{money(item.price)}</p>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-400">{item.description}</p>

        {inCart ? (
          <div className="mt-4 flex items-center justify-between rounded-full border border-gold-400/40 bg-ink-950/60 px-2 py-1.5">
            <button
              onClick={() => setQty(item.id, inCart.qty - 1)}
              className="grid size-8 place-items-center rounded-full text-gold-300 transition hover:bg-gold-400 hover:text-ink-950"
              aria-label={`Decrease ${item.name}`}
            >
              −
            </button>
            <span className="text-sm font-bold text-cream-50">{inCart.qty} in cart</span>
            <button
              onClick={() => setQty(item.id, inCart.qty + 1)}
              className="grid size-8 place-items-center rounded-full text-gold-300 transition hover:bg-gold-400 hover:text-ink-950"
              aria-label={`Increase ${item.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(item)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-cream-50/5 py-2.5 text-sm font-bold uppercase tracking-widest text-gold-300 ring-1 ring-gold-400/40 transition hover:bg-gold-400 hover:text-ink-950"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add to Cart
          </button>
        )}
      </div>
    </article>
  )
}

export default function Menu() {
  const [active, setActive] = useState("starters")
  const gridRef = useRef(null)
  const items = useMemo(() => MENU_ITEMS.filter((i) => i.category === active), [active])

  useLayoutEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 44, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 },
      )
    }, gridRef)
    return () => ctx.revert()
  }, [active])

  return (
    <section id="menu" className="relative bg-ink-900/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal mb-4 text-xs font-bold uppercase tracking-[0.35em] text-gold-400">Our Menu</p>
          <h2 className="reveal font-display text-4xl leading-tight sm:text-5xl">
            A Taste of <span className="text-gradient-gold italic">Everything</span>
          </h2>
          <p className="reveal mt-5 text-cream-300">
            Seasonal, wood-fired, and made to share. Add your favourites to the cart and
            check out in seconds.
          </p>
        </div>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition ${
                active === c.id
                  ? "bg-gold-400 text-ink-950 shadow-[0_8px_30px_rgba(217,171,79,0.35)]"
                  : "border border-cream-50/15 text-cream-300 hover:border-gold-400/50 hover:text-gold-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div ref={gridRef} key={active} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
