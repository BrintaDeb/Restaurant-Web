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
    <span className={`badge-modern ${styles[tag]}`}>
      {labels[tag]}
    </span>
  )
}

function MenuCard({ item, index }) {
  const { addItem, items, setQty } = useCart()
  const inCart = items.find((i) => i.id === item.id)

  return (
    <div className={`stagger-item`} style={{ "--item-index": index }}>
      <article className="card-modern overflow-hidden">
        <div className="card-modern-image">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {item.tags.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
          </div>
          <span className="absolute bottom-4 right-4 badge-modern">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17l-6.2 3.9 1.6-7L2 9.2l7.1-.6L12 2z" />
            </svg>
            {item.rating}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="heading-3 leading-tight">{item.name}</h3>
            <p className="heading-3 text-gold-300 whitespace-nowrap">{money(item.price)}</p>
          </div>
          <p className="text-sm text-cream-400 mb-4 flex-1">{item.description}</p>

          {inCart ? (
            <div className="flex items-center justify-between rounded-lg border border-gold-400/40 glass-panel-sm px-2 py-2">
              <button
                onClick={() => setQty(item.id, inCart.qty - 1)}
                className="grid size-8 place-items-center text-gold-300 hover:text-cream-50 transition"
              >
                −
              </button>
              <span className="text-sm font-bold">{inCart.qty} in cart</span>
              <button
                onClick={() => setQty(item.id, inCart.qty + 1)}
                className="grid size-8 place-items-center text-gold-300 hover:text-cream-50 transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item)}
              className="btn-modern btn-primary w-full py-2.5 text-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add to Cart
            </button>
          )}
        </div>
      </article>
    </div>
  )
}

export default function MenuCinematic() {
  const [active, setActive] = useState("starters")
  const gridRef = useRef(null)
  const sectionRef = useRef(null)
  const items = useMemo(() => MENU_ITEMS.filter((i) => i.category === active), [active])

  useLayoutEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.08 },
      )
    }, gridRef)
    return () => ctx.revert()
  }, [active])

  return (
    <section id="menu" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-800/20 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="section-title badge-modern w-fit mx-auto mb-6">
            Our Menu
          </p>
          <h2 className="section-title heading-1 mb-6">
            A Taste of <span className="text-gradient-gold">Everything</span>
          </h2>
          <p className="body-text mx-auto max-w-xl">
            Seasonal, wood-fired, and made to share. Add your favourites to the cart
            and check out in seconds.
          </p>
        </div>

        {/* Category Filters */}
        <div className="stagger-group flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`stagger-item btn-modern rounded-lg px-6 py-3 text-sm font-semibold transition ${
                active === c.id
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div ref={gridRef} key={active} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <MenuCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
