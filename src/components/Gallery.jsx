import { useLayoutEffect, useRef } from "react"
import { gsap } from "../hooks/useGsap"
import { GALLERY } from "../data/menu"

export default function Gallery() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".g-item").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          scale: 0.94,
          duration: 1,
          ease: "power3.out",
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        })
        gsap.to(el.querySelector("img"), {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="gallery" ref={root} className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="reveal mb-4 text-xs font-bold uppercase tracking-[0.35em] text-gold-400">Gallery</p>
        <h2 className="reveal font-display text-4xl leading-tight sm:text-5xl">
          Moments from <span className="text-gradient-gold italic">the Table</span>
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY.map((g, i) => (
          <figure
            key={g.src}
            className={`g-item group relative overflow-hidden rounded-3xl border border-cream-50/10 ${
              i === 0 || i === 4 ? "row-span-2" : ""
            }`}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className={`w-full scale-110 object-cover transition duration-700 group-hover:scale-125 ${
                i === 0 || i === 4 ? "h-full min-h-[420px]" : "aspect-[4/3]"
              }`}
            />
            <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/85 via-transparent to-transparent p-5 opacity-0 transition duration-500 group-hover:opacity-100">
              <span className="translate-y-3 font-display text-lg italic text-cream-50 transition duration-500 group-hover:translate-y-0">
                {g.alt}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
