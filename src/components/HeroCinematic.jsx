import { useLayoutEffect, useRef } from "react"
import { gsap } from "../hooks/useGsap"

const HERO_IMG = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"

export default function HeroCinematic() {
  const root = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    if (!root.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // Title lines reveal with stagger
      tl.from(".hero-title .line-mask > span", {
        y: "110%",
        duration: 0.8,
        stagger: 0.1,
      }, 0.2)

      // Badge fade and scale
      tl.from(".hero-badge", {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.6,
      }, 0.4)

      // Description fade
      tl.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, 0.6)

      // Buttons fade and stagger
      tl.from(".hero-buttons button", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
      }, 0.8)

      // Stats reveal
      tl.from(".hero-stat", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
      }, 1.0)

      // Parallax background movement
      gsap.to(".hero-bg", {
        yPercent: 20,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Content fade out on scroll
      gsap.to(contentRef.current, {
        opacity: 0.3,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={root}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <div className="hero-bg absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Signature dish"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
      </div>

      {/* Scroll progress indicator */}
      <div className="scroll-progress" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        {/* Badge */}
        <div className="hero-badge mb-8 inline-block">
          <div className="badge-modern">
            Est. 2012 · Royal Indian Fine Dining
          </div>
        </div>

        {/* Main Title */}
        <h1 className="hero-title mb-8">
          <div className="line-mask">
            <span className="heading-1">
              Where Every Flavour
            </span>
          </div>
          <div className="line-mask">
            <span className="heading-1 text-gradient-gold">
              Tells a Royal Story
            </span>
          </div>
        </h1>

        {/* Description */}
        <p className="hero-description mx-auto mb-10 max-w-2xl text-lg text-cream-300">
          A royal sanctuary of Indian culinary heritage — fragrant dum pukht, clay tandoor
          embers, and timeless heirloom recipes perfected over generations.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons mb-16 flex flex-wrap items-center justify-center gap-4">
          <a href="#menu" className="btn-modern btn-primary inline-flex">
            Explore Menu
          </a>
          <a href="#reserve" className="btn-modern btn-secondary inline-flex">
            Book a Table
          </a>
        </div>

        {/* Stats Grid */}
        <div className="hero-stats mx-auto max-w-3xl grid grid-cols-3 gap-6 rounded-2xl border border-cream-50/10 glass-panel-sm p-8">
          {[
            { number: "14+", label: "Years of Legacy" },
            { number: "80+", label: "Royal Recipes" },
            { number: "4.9★", label: "Guest Rating" },
          ].map(({ number, label }) => (
            <div key={label} className="hero-stat text-center">
              <p className="heading-2 mb-2 text-gold-300">{number}</p>
              <p className="text-xs uppercase tracking-widest text-cream-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream-400 transition hover:text-gold-300"
        aria-label="Scroll down"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
          <path d="M12 5v14m0 0-6-6m6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
