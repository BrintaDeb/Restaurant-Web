import { useState } from "react"
import { CONTACT } from "../data/menu"

const field =
  "w-full rounded-xl border border-cream-50/15 bg-ink-950/70 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-400/50 outline-none transition focus:border-gold-400/70 focus:ring-2 focus:ring-gold-400/20"

function InfoCard({ icon, title, children }) {
  return (
    <div className="reveal flex gap-4 rounded-2xl border border-cream-50/10 bg-ink-900/60 p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold-400/40 text-gold-300">
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-cream-400">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-cream-100">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (form.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 5) {
      setErr("Please fill in a valid name, email and message.")
      return
    }
    setErr("")
    setSent(true)
  }

  return (
    <section id="contact" className="bg-ink-900/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal mb-4 text-xs font-bold uppercase tracking-[0.35em] text-gold-400">Contact Us</p>
          <h2 className="reveal font-display text-4xl leading-tight sm:text-5xl">
            Find Us, <span className="text-gradient-gold italic">Call Us, Visit Us</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <InfoCard
              title="Address"
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              }
            >
              {CONTACT.address}
            </InfoCard>

            <InfoCard
              title="Reservations & Enquiries"
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                </svg>
              }
            >
              <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="hover:text-gold-300">
                {CONTACT.phone}
              </a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-gold-300">
                {CONTACT.email}
              </a>
            </InfoCard>

            <InfoCard
              title="Opening Hours"
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              }
            >
              {CONTACT.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6">
                  <span className="text-cream-400">{h.days}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </InfoCard>

            <div className="reveal flex gap-3 pt-1">
              {[
                ["Instagram", "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm4 5.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5ZM17 6.8a.9.9 0 1 0 .9.9.9.9 0 0 0-.9-.9Z"],
                ["Facebook", "M14 8h3V5h-3a4 4 0 0 0-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9a1 1 0 0 1 1-1Z"],
                ["X", "M4 4l7.2 9.3L4.4 20h2.5l5.4-5.5L16.8 20H20l-7.5-9.7L18.9 4h-2.5l-4.8 5L8.3 4H4Z"],
              ].map(([name, d]) => (
                <a
                  key={name}
                  href="#contact"
                  aria-label={name}
                  className="grid size-11 place-items-center rounded-full border border-cream-50/15 text-cream-300 transition hover:border-gold-400 hover:text-gold-300"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="reveal rounded-3xl border border-cream-50/10 bg-ink-950/50 p-7 lg:col-span-3 lg:p-9">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-14 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/40">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-2xl">Message Sent!</h3>
                <p className="mt-2 max-w-sm text-sm text-cream-300">
                  Thanks for reaching out, {form.name.split(" ")[0]}. We'll get back to you within one business day.
                </p>
                <button
                  onClick={() => {
                    setSent(false)
                    setForm({ name: "", email: "", message: "" })
                  }}
                  className="mt-6 rounded-full border border-gold-400/50 px-6 py-2.5 text-sm font-bold text-gold-300 transition hover:bg-gold-400 hover:text-ink-950"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={field} />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className={field} />
                </div>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} placeholder="Tell us about your enquiry, event or feedback…" className={`${field} resize-none`} />
                {err && <p className="text-xs text-red-400">{err}</p>}
                <button
                  type="submit"
                  className="w-full rounded-full bg-gold-400 py-3.5 text-sm font-bold uppercase tracking-widest text-ink-950 shadow-[0_10px_40px_rgba(217,171,79,0.3)] transition hover:bg-gold-300 sm:w-auto sm:px-10"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
