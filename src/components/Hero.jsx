import { useLayoutEffect, useRef } from "react"
import { gsap } from "../hooks/useGsap"

const HERO_IMG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      tl.to(".hero-line > span", { y: 0, duration: 1.2, stagger: 0.15 }, 0.2)
        .from(".hero-fade", { opacity: 0, y: 28, duration: 1, stagger: 0.12 }, 0.7)
        .from(".hero-badge", { opacity: 0, scale: 0.8, duration: 0.8, ease: "back.out(2)" }, 0.9)

      gsap.to(".hero-bg", {
        yPercent: 22,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      })
      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={root} className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <div className="hero-bg absolute inset-0">
        <img src={HERO_IMG} alt="Signature dish at Saffron & Sage" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
      </div>

      <div className="hero-content relative z-10 mx-auto max-w-5xl px-5 pt-28 pb-20 text-center">
        <p className="hero-badge mx-auto mb-6 w-fit rounded-full border border-gold-400/40 bg-ink-950/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300 backdrop-blur">
          Est. 2012 · Fine Dining
        </p>

        <h1 className="font-display text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
          <span className="hero-line line-mask">
            <span>Where Every Flavour</span>
          </span>
          <span className="hero-line line-mask">
            <span className="text-gradient-gold italic">Tells a Story</span>
          </span>
        </h1>

        <p className="hero-fade mx-auto mt-7 max-w-2xl text-base leading-relaxed text-cream-300 sm:text-lg">
          A modern sanctuary of taste in the heart of Midtown — seasonal ingredients,
          wood-fired craft, and hospitality that lingers long after the last course.
        </p>

        <div className="hero-fade mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#menu"
            className="rounded-full bg-gold-400 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-ink-950 shadow-[0_10px_40px_rgba(217,171,79,0.35)] transition hover:-translate-y-0.5 hover:bg-gold-300"
          >
            Explore Menu
          </a>
          <a
            href="#reserve"
            className="rounded-full border border-cream-50/25 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-cream-50 backdrop-blur transition hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-300"
          >
            Book a Table
          </a>
        </div>

        <div className="hero-fade mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-cream-50/10 rounded-2xl border border-cream-50/10 bg-ink-950/40 py-5 backdrop-blur">
          {[
            ["14+", "Years of Craft"],
            ["120+", "Signature Dishes"],
            ["4.9★", "Guest Rating"],
          ].map(([v, l]) => (
            <div key={l} className="px-2">
              <p className="font-display text-2xl text-gold-300 sm:text-3xl">{v}</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-cream-400 sm:text-xs">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cream-400 transition hover:text-gold-300"
        aria-label="Scroll down"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="animate-bounce">
          <path d="M12 4v16m0 0-6-6m6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
