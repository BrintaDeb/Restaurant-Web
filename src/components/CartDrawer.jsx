import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import { money } from "../utils/money"

const PAYMENT_METHODS = ["UPI / QR Code (GPay, PhonePe)", "Credit / Debit Card", "Cash on Delivery (COD)"]

function BillRow({ label, value, accent, strike }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={accent ? "text-gold-300" : "text-cream-400"}>{label}</span>
      <span className={`font-semibold ${accent ? "text-gold-300" : "text-cream-100"} ${strike ? "line-through opacity-60" : ""}`}>
        {value}
      </span>
    </div>
  )
}

export default function CartDrawer({ open, onClose }) {
  const { items, bill, promo, orderType, setQty, removeItem, applyPromo, clearPromo, clearCart, setOrderType } = useCart()
  const [step, setStep] = useState("cart")
  const [code, setCode] = useState("")
  const [promoMsg, setPromoMsg] = useState(null)
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: PAYMENT_METHODS[0] })
  const [errors, setErrors] = useState({})
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const close = () => {
    setStep("cart")
    setPromoMsg(null)
    onClose()
  }

  const handlePromo = () => {
    if (!code.trim()) return
    const res = applyPromo(code)
    setPromoMsg(res)
    if (res.ok) setCode("")
  }

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = "Please enter your name"
    if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number"
    if (orderType === "delivery" && form.address.trim().length < 8) e.address = "Enter a full delivery address"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const placeOrder = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setOrderId(`SS-${Date.now().toString(36).toUpperCase()}`)
    setStep("success")
    clearCart()
  }

  const field =
    "w-full rounded-xl border border-cream-50/15 bg-ink-950/70 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-400/50 outline-none transition focus:border-gold-400/70 focus:ring-2 focus:ring-gold-400/20"

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-cream-50/10 bg-ink-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-cream-50/10 px-6 py-5">
          <h3 className="font-display text-2xl">
            {step === "cart" && "Your Order"}
            {step === "checkout" && "Checkout"}
            {step === "success" && "Order Confirmed"}
          </h3>
          <button
            onClick={close}
            className="grid size-9 place-items-center rounded-full border border-cream-50/15 text-cream-300 transition hover:border-gold-400 hover:text-gold-300"
            aria-label="Close cart"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="grid size-16 place-items-center rounded-full border border-cream-50/10 text-cream-400">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="20" r="1.4" />
                      <circle cx="17" cy="20" r="1.4" />
                      <path d="M3 3h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.3h7.7a1.5 1.5 0 0 0 1.5-1.2L20 7H6" />
                    </svg>
                  </span>
                  <p className="mt-4 font-display text-xl">Your cart is empty</p>
                  <p className="mt-1 text-sm text-cream-400">Add something delicious from the menu.</p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full bg-gold-400 px-6 py-2.5 text-sm font-bold text-ink-950 transition hover:bg-gold-300"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-4 rounded-2xl border border-cream-50/10 bg-ink-950/50 p-3">
                      <img src={i.image} alt={i.name} className="size-20 rounded-xl object-cover" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-snug">{i.name}</p>
                          <button
                            onClick={() => removeItem(i.id)}
                            className="text-cream-400 transition hover:text-red-400"
                            aria-label={`Remove ${i.name}`}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 13h8l1-13" />
                            </svg>
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-cream-400">{money(i.price)} each</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3 rounded-full border border-cream-50/15 px-2 py-1">
                            <button onClick={() => setQty(i.id, i.qty - 1)} className="px-1 text-gold-300" aria-label="Decrease">−</button>
                            <span className="w-4 text-center text-sm font-bold">{i.qty}</span>
                            <button onClick={() => setQty(i.id, i.qty + 1)} className="px-1 text-gold-300" aria-label="Increase">+</button>
                          </div>
                          <p className="text-sm font-bold text-gold-300">{money(i.price * i.qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-cream-50/10 px-6 py-5">
                <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl border border-cream-50/10 p-1">
                  {["delivery", "pickup"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setOrderType(t)}
                      className={`rounded-lg py-2 text-xs font-bold uppercase tracking-widest transition ${
                        orderType === t ? "bg-gold-400 text-ink-950" : "text-cream-400 hover:text-cream-50"
                      }`}
                    >
                      {t === "delivery" ? "Delivery" : "Pickup"}
                    </button>
                  ))}
                </div>

                {promo ? (
                  <div className="mb-4 flex items-center justify-between rounded-xl border border-gold-400/40 bg-gold-400/10 px-4 py-2.5 text-sm">
                    <span className="font-semibold text-gold-300">
                      {promo} applied · {bill.promoLabel}
                    </span>
                    <button onClick={clearPromo} className="text-xs text-cream-400 underline hover:text-cream-50">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                        placeholder="Promo code (try TASTY10 or FEAST100)"
                        className={`${field} flex-1 py-2.5 uppercase placeholder:normal-case`}
                      />
                      <button
                        onClick={handlePromo}
                        className="rounded-xl border border-gold-400/50 px-4 text-sm font-bold text-gold-300 transition hover:bg-gold-400 hover:text-ink-950"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMsg && !promoMsg.ok && <p className="mt-1.5 text-xs text-red-400">{promoMsg.label}</p>}
                  </div>
                )}

                <div className="space-y-2 rounded-2xl bg-ink-950/60 p-4">
                  <BillRow label={`Subtotal (${bill.count} items)`} value={money(bill.subtotal)} />
                  {bill.discount > 0 && <BillRow label="Discount" value={`− ${money(bill.discount)}`} accent />}
                  <BillRow label={`GST (${(bill.taxRate * 100).toFixed(0)}%)`} value={money(bill.tax)} />
                  <BillRow label={`Service (${(bill.serviceRate * 100).toFixed(0)}%)`} value={money(bill.service)} />
                  {orderType === "delivery" && (
                    <BillRow
                      label={bill.delivery === 0 ? "Delivery (Free)" : `Delivery (Free above ${money(bill.freeDeliveryAbove)})`}
                      value={bill.delivery === 0 ? "Free" : money(bill.delivery)}
                      accent={bill.delivery === 0}
                    />
                  )}
                  <div className="my-1 border-t border-dashed border-cream-50/15" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg">Total</span>
                    <span className="font-display text-2xl text-gold-300">{money(bill.total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep("checkout")}
                  className="mt-4 w-full rounded-full bg-gold-400 py-3.5 text-sm font-bold uppercase tracking-widest text-ink-950 shadow-[0_10px_40px_rgba(217,171,79,0.3)] transition hover:bg-gold-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {step === "checkout" && (
          <form onSubmit={placeOrder} className="flex flex-1 flex-col overflow-y-auto px-6 py-5" noValidate>
            <button type="button" onClick={() => setStep("cart")} className="mb-4 flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-cream-400 hover:text-gold-300">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5m0 0 6 6m-6-6 6-6" />
              </svg>
              Back to cart
            </button>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" className={field} />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 212 555 0100" className={field} />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>
              {orderType === "delivery" && (
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Delivery Address</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Street, apartment, city, ZIP"
                    rows={3}
                    className={`${field} resize-none`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-cream-400">Payment Method</label>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                        form.payment === m ? "border-gold-400/70 bg-gold-400/10 text-cream-50" : "border-cream-50/15 text-cream-400 hover:border-cream-50/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={form.payment === m}
                        onChange={() => setForm({ ...form, payment: m })}
                        className="accent-[#d9ab4f]"
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="mb-4 flex items-center justify-between rounded-2xl bg-ink-950/60 px-4 py-3">
                <span className="text-sm text-cream-400">
                  {bill.count} items · {orderType === "delivery" ? "Delivery" : "Pickup"}
                </span>
                <span className="font-display text-xl text-gold-300">{money(bill.total)}</span>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gold-400 py-3.5 text-sm font-bold uppercase tracking-widest text-ink-950 shadow-[0_10px_40px_rgba(217,171,79,0.3)] transition hover:bg-gold-300"
              >
                Place Order · {money(bill.total)}
              </button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/40">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h4 className="mt-6 font-display text-3xl">Thank You!</h4>
            <p className="mt-2 text-sm leading-relaxed text-cream-300">
              Your order has been placed successfully.
              {orderType === "delivery" ? " It will arrive in 35–45 minutes." : " It will be ready for pickup in 20 minutes."}
            </p>
            <div className="mt-6 w-full rounded-2xl border border-dashed border-gold-400/40 bg-ink-950/60 px-5 py-4">
              <p className="text-xs uppercase tracking-widest text-cream-400">Order ID</p>
              <p className="mt-1 font-display text-xl tracking-wider text-gold-300">{orderId}</p>
            </div>
            <button
              onClick={close}
              className="mt-8 rounded-full bg-gold-400 px-8 py-3 text-sm font-bold uppercase tracking-widest text-ink-950 transition hover:bg-gold-300"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
