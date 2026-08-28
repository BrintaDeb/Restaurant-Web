import { useState } from "react"

const TIMES = ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"]

const field =
  "w-full rounded-xl border border-cream-50/15 bg-ink-950/70 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-400/50 outline-none transition focus:border-gold-400/70 focus:ring-2 focus:ring-gold-400/20"

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: TIMES[3],
    guests: "2",
    note: "",
  })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (form.name.trim().length < 2) errs.name = "Please enter your name"
    if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number"
    if (!form.date) errs.date = "Pick a date"
    setErrors(errs)
    if (Object.keys(errs).length === 0) setDone(true)
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <section id="reserve" className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="reveal mb-4 text-xs font-bold uppercase tracking-[0.35em] text-gold-400">Reservations</p>
          <h2 className="reveal font-display text-4xl leading-tight sm:text-5xl">
            Reserve Your <span className="text-gradient-gold italic">Evening</span>
          </h2>
          <p className="reveal mt-6 leading-relaxed text-cream-300">
            Whether it's an intimate dinner for two or a celebration for twenty, our team
            will set the stage. Book below and we'll confirm within the hour.
          </p>

          <ul className="reveal-stagger mt-10 space-y-5">
            {[
              ["Private Dining", "Secluded rooms for up to 24 guests."],
              ["Sommelier Pairing", "Curated wines with every course."],
              ["Occasion Setup", "Cakes, flowers & candles on request."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-4">
                <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-gold-400/40 text-gold-300">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-cream-50">{t}</p>
                  <p className="text-sm text-cream-400">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal rounded-3xl border border-cream-50/10 bg-ink-900/80 p-7 shadow-2xl backdrop-blur lg:p-9">
          {done ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/40">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h3 className="mt-5 font-display text-2xl">Table Requested!</h3>
              <p className="mt-2 max-w-xs text-sm text-cream-300">
                Thanks {form.name.split(" ")[0]} — we'll confirm your table for {form.guests} on {form.date} at {form.time} shortly.
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-6 rounded-full border border-gold-400/50 px-6 py-2.5 text-sm font-bold text-gold-300 transition hover:bg-gold-400 hover:text-ink-950"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Name</label>
                  <input value={form.name} onChange={set("name")} placeholder="Jane Doe" className={field} />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Phone</label>
                  <input value={form.phone} onChange={set("phone")} placeholder="+1 212 555 0100" className={field} />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Date</label>
                  <input type="date" min={today} value={form.date} onChange={set("date")} className={field} />
                  {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Time</label>
                  <select value={form.time} onChange={set("time")} className={field}>
                    {TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Guests</label>
                  <select value={form.guests} onChange={set("guests")} className={field}>
                    {["1", "2", "3", "4", "5", "6", "8", "10+"].map((g) => (
                      <option key={g} value={g}>
                        {g} {g === "1" ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Special Request</label>
                <textarea value={form.note} onChange={set("note")} rows={3} placeholder="Anniversary, allergies, seating preference…" className={`${field} resize-none`} />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gold-400 py-3.5 text-sm font-bold uppercase tracking-widest text-ink-950 shadow-[0_10px_40px_rgba(217,171,79,0.3)] transition hover:bg-gold-300"
              >
                Request Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
