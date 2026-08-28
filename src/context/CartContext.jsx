import { createContext, useContext, useMemo, useReducer } from "react"

const CartContext = createContext(null)

const TAX_RATE = 0.05
const SERVICE_RATE = 0.05
const DELIVERY_FEE = 49
const FREE_DELIVERY_ABOVE = 599

const PROMOS = {
  TASTY10: { type: "percent", value: 10, label: "10% off food total" },
  ROYAL20: { type: "percent", value: 20, label: "20% off food total" },
  FEAST100: { type: "flat", value: 100, label: "₹100 off food total" },
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id)
      const items = existing
        ? state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i,
          )
        : [...state.items, { ...action.item, qty: 1 }]
      return { ...state, items }
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case "SET_QTY": {
      if (action.qty <= 0)
        return { ...state, items: state.items.filter((i) => i.id !== action.id) }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: action.qty } : i,
        ),
      }
    }
    case "APPLY_PROMO":
      return { ...state, promo: action.code }
    case "CLEAR_PROMO":
      return { ...state, promo: null }
    case "CLEAR":
      return { ...state, items: [], promo: null }
    case "SET_ORDER_TYPE":
      return { ...state, orderType: action.value }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    promo: null,
    orderType: "delivery",
  })

  const bill = useMemo(() => {
    const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0)
    const promoDef = state.promo ? PROMOS[state.promo] : null
    const discount = promoDef
      ? promoDef.type === "percent"
        ? (subtotal * promoDef.value) / 100
        : Math.min(promoDef.value, subtotal)
      : 0
    const taxable = Math.max(subtotal - discount, 0)
    const tax = taxable * TAX_RATE
    const service = taxable * SERVICE_RATE
    const delivery =
      state.orderType === "pickup"
        ? 0
        : taxable >= FREE_DELIVERY_ABOVE || subtotal === 0
          ? 0
          : DELIVERY_FEE
    const total = taxable + tax + service + delivery
    const count = state.items.reduce((s, i) => s + i.qty, 0)
    return {
      subtotal,
      discount,
      promoLabel: promoDef?.label ?? null,
      tax,
      service,
      delivery,
      total,
      count,
      taxRate: TAX_RATE,
      serviceRate: SERVICE_RATE,
      freeDeliveryAbove: FREE_DELIVERY_ABOVE,
    }
  }, [state.items, state.promo, state.orderType])

  const value = {
    items: state.items,
    promo: state.promo,
    orderType: state.orderType,
    bill,
    promos: PROMOS,
    addItem: (item) => dispatch({ type: "ADD", item }),
    removeItem: (id) => dispatch({ type: "REMOVE", id }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
    applyPromo: (code) => {
      const normalized = code.trim().toUpperCase()
      if (PROMOS[normalized]) {
        dispatch({ type: "APPLY_PROMO", code: normalized })
        return { ok: true, label: PROMOS[normalized].label }
      }
      return { ok: false, label: "Invalid promo code" }
    },
    clearPromo: () => dispatch({ type: "CLEAR_PROMO" }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    setOrderType: (value) => dispatch({ type: "SET_ORDER_TYPE", value }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
