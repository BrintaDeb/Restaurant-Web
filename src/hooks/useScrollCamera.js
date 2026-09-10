import { useLayoutEffect, useRef } from "react"
import { gsap } from "./useGsap"

/**
 * Hook for scroll-linked parallax and camera effects
 * Applies depth-based transforms to elements based on scroll position
 */
export function useScrollCamera(containerRef) {
  useLayoutEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Only animate if elements exist
      const slowElements = document.querySelectorAll(".parallax-layer[data-speed='slow']")
      const mediumElements = document.querySelectorAll(".parallax-layer[data-speed='medium']")
      const fastElements = document.querySelectorAll(".parallax-layer[data-speed='fast']")

      if (slowElements.length > 0) {
        gsap.to(slowElements, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      if (mediumElements.length > 0) {
        gsap.to(mediumElements, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      if (fastElements.length > 0) {
        gsap.to(fastElements, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // Scroll-triggered section reveals
      const revealElements = document.querySelectorAll(".scroll-reveal")
      revealElements.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "top 25%",
            onEnter: () => el.classList.add("visible"),
            once: true,
          },
        })
      })

      // Staggered item animations
      const staggerGroups = document.querySelectorAll(".stagger-group")
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll(".stagger-item")
        items.forEach((item, i) => {
          gsap.to(item, {
            scrollTrigger: {
              trigger: group,
              start: "top 70%",
              onEnter: () => {
                item.style.animationDelay = `${i * 0.1}s`
                item.classList.add("animate")
              },
              once: true,
            },
          })
        })
      })

      // Section title reveals
      document.querySelectorAll(".section-title").forEach((title) => {
        gsap.to(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            onEnter: () => title.classList.add("animate"),
            once: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef])
}

/**
 * Hook for camera perspective transforms
 * Creates 3D depth effect as user scrolls
 */
export function useScrollPerspective(ref) {
  useLayoutEffect(() => {
    if (!ref.current) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollY / maxScroll

      // Apply subtle 3D perspective
      const rotateX = (scrollProgress - 0.5) * 3
      const scale = 0.98 + scrollProgress * 0.04

      ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) scale(${scale})`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ref])
}

