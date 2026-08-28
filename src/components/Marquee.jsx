import { useLayoutEffect, useRef } from "react"
import { gsap } from "../hooks/useGsap"

const WORDS = ["Wood-Fired", "Farm to Table", "Handcrafted", "Seasonal", "Award-Winning", "Organic"]

export default function Marquee() {
  const track = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  const row = [...WORDS, ...WORDS]

  return (
    <div className="relative overflow-hidden border-y border-gold-400/15 bg-ink-900 py-5">
      <div ref={track} className="marquee-track items-center gap-10">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-lg italic text-cream-300">{w}</span>
            <span className="text-gold-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
