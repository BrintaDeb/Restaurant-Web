import { useLayoutEffect, useRef } from "react"
import { gsap } from "../hooks/useGsap"

const IMG_MAIN =
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
const IMG_SMALL =
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"

export default function About() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".about-img-main img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      })
      gsap.to(".about-img-small", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      })

      gsap.utils.toArray("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = target % 1 === 0 ? Math.round(obj.v) : obj.v.toFixed(1)
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={root} className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="about-img-main reveal overflow-hidden rounded-3xl border border-cream-50/10">
            <img src={IMG_MAIN} alt="Saffron & Sage dining room" className="aspect-[4/5] w-full scale-110 object-cover" />
          </div>
          <div className="about-img-small absolute -bottom-10 -right-4 w-44 overflow-hidden rounded-2xl border-4 border-ink-950 shadow-2xl sm:w-60 lg:-right-10">
            <img src={IMG_SMALL} alt="Our chef plating a dish" className="aspect-square w-full object-cover" />
          </div>
          <div className="absolute -left-4 -top-6 rounded-2xl border border-gold-400/30 bg-ink-900/90 px-5 py-4 backdrop-blur lg:-left-8">
            <p className="font-display text-3xl text-gold-300">
              <span data-count="14">0</span>+
            </p>
            <p className="text-xs uppercase tracking-widest text-cream-400">Years of Excellence</p>
          </div>
        </div>

        <div>
          <p className="reveal mb-4 text-xs font-bold uppercase tracking-[0.35em] text-gold-400">Our Story</p>
          <h2 className="reveal font-display text-4xl leading-tight sm:text-5xl">
            Crafted with Fire, <br />
            <span className="text-gradient-gold italic">Served with Soul</span>
          </h2>
          <p className="reveal mt-6 leading-relaxed text-cream-300">
            Born from an enduring reverence for India's royal kitchens, Saffron &amp; Sage
            celebrates the timeless art of slow-dum gravies, hand-ground spices, and earthen
            tandoor embers. From Lucknow's Awadhi courts to Kashmir's saffron valleys, every
            recipe honours sacred culinary traditions with contemporary finesse.
          </p>
          <p className="reveal mt-4 leading-relaxed text-cream-300">
            Our flaming clay tandoor and copper handis sit at the heart of our house,
            infusing every preparation with smouldering charcoal warmth, fragrant saffron,
            and ghee-roasted spices sourced directly from heritage spice estates.
          </p>

          <div className="reveal-stagger mt-10 grid grid-cols-3 gap-4">
            {[
              { v: 120, suffix: "+", label: "Dishes Perfected" },
              { v: 38, suffix: "k", label: "Guests Served" },
              { v: 4.9, suffix: "★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-cream-50/10 bg-ink-900/60 p-5 text-center">
                <p className="font-display text-3xl text-gold-300">
                  <span data-count={s.v}>0</span>
                  {s.suffix}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-cream-400">{s.label}</p>
              </div>
            ))}
          </div>

          <a
            href="#menu"
            className="reveal mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold-300 transition hover:gap-4 hover:text-gold-400"
          >
            Discover the Menu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
