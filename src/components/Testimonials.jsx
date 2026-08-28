import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "../hooks/useGsap"
import { TESTIMONIALS } from "../data/menu"

function Stars({ n }) {
  return (
    <div className="flex gap-1 text-gold-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17l-6.2 3.9 1.6-7L2 9.2l7.1-.6L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const quoteRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5200)
    return () => clearInterval(t)
  }, [])

  useLayoutEffect(() => {
    if (!quoteRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      )
    }, quoteRef)
    return () => ctx.revert()
  }, [index])

  const t = TESTIMONIALS[index]

  return (
    <section className="relative overflow-hidden bg-ink-900/40 py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[22rem] leading-none text-cream-50/[0.03]">
        ”
      </div>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <p className="reveal mb-4 text-xs font-bold uppercase tracking-[0.35em] text-gold-400">Guest Love</p>
        <h2 className="reveal font-display text-4xl leading-tight sm:text-5xl">
          Words from <span className="text-gradient-gold italic">Our Guests</span>
        </h2>

        <div ref={quoteRef} className="mt-12">
          <div className="flex justify-center">
            <Stars n={t.rating} />
          </div>
          <blockquote className="mt-6 font-display text-2xl leading-relaxed text-cream-100 sm:text-3xl">
            “{t.quote}”
          </blockquote>
          <p className="mt-8 font-semibold text-gold-300">{t.name}</p>
          <p className="mt-1 text-sm text-cream-400">{t.role}</p>
        </div>

        <div className="mt-10 flex justify-center gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-400 ${
                i === index ? "w-8 bg-gold-400" : "w-2 bg-cream-50/20 hover:bg-cream-50/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
