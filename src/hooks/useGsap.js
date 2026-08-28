import { useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function useReveal(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        })
      })
      gsap.utils.toArray(".reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 56,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        })
      })
    }, scope)
    return () => ctx.revert()
  }, [scopeRef])
}
