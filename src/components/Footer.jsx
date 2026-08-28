import { useState } from "react"
import { CONTACT } from "../data/menu"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="border-t border-cream-50/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full border border-gold-400/60 text-gold-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2c1.5 3 4 4.5 4 8a4 4 0 1 1-8 0c0-3.5 2.5-5 4-8Z" />
                  <path d="M12 14v8" />
                </svg>
              </span>
              <span className="font-display text-xl">Saffron <span className="text-gold-400">&amp;</span> Sage</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-400">
              A modern fine-dining sanctuary celebrating India's royal culinary heritage,
              clay tandoor craft, and timeless hospitality.
            </p>

            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-widest text-cream-300">Join our table — get seasonal menus & offers</p>
              {subscribed ? (
                <p className="mt-3 flex items-center gap-2 text-sm text-gold-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  You're on the list. Welcome to the family!
                </p>
              ) : (
                <form onSubmit={subscribe} className="mt-3 flex max-w-sm gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-full border border-cream-50/15 bg-ink-900 px-5 py-2.5 text-sm text-cream-50 placeholder:text-cream-400/50 outline-none focus:border-gold-400/70"
                  />
                  <button className="shrink-0 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-ink-950 transition hover:bg-gold-300">
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["About", "#about"],
                ["Menu", "#menu"],
                ["Gallery", "#gallery"],
                ["Reservations", "#reserve"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-cream-400 transition hover:text-gold-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400">Visit</p>
            <ul className="mt-5 space-y-3 text-sm text-cream-400">
              <li>{CONTACT.address}</li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="transition hover:text-gold-300">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition hover:text-gold-300">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-50/10 pt-7 text-xs text-cream-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Saffron &amp; Sage. All rights reserved.</p>
          <p>Crafted with fire, served with soul.</p>
        </div>
      </div>
    </footer>
  )
}
