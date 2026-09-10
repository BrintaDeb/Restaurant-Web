import { useRef, useCallback } from "react";

/**
 * A reusable button with a material-style ripple effect on click.
 * Props: variant ("gold" | "ghost" | "cart"), size ("sm" | "md" | "lg"), className, children, ...rest
 */
export default function InteractiveButton({
  variant = "gold",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  const sizeClasses = {
    sm: "px-5 py-2 text-xs rounded-full",
    md: "px-8 py-3.5 text-sm rounded-full",
    lg: "px-10 py-4 text-sm rounded-full",
  };

  const variantClass = {
    gold: "btn-indian btn-gold",
    ghost: "btn-indian btn-ghost",
    cart: "btn-indian btn-cart",
  };

  const spawnRipple = useCallback((e) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }, []);

  return (
    <button
      ref={ref}
      className={`${variantClass[variant] || variantClass.gold} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      onMouseDown={spawnRipple}
      {...rest}
    >
      {children}
    </button>
  );
}
