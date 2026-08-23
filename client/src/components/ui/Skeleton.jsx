function Skeleton({
  className = "",
  variant = "default",
}) {
  const variants = {
    default: "rounded-md",
    text: "rounded",
    heading: "rounded-lg",
    circle: "rounded-full",
    block: "rounded-xl",
  };

  return (
    <div
      aria-hidden="true"
      className={`
        relative
        overflow-hidden
        bg-[var(--color-surface-muted)]
        ${variants[variant] || variants.default}
        ${className}
      `}
    >
      <div
        className="
          absolute
          inset-0
          -translate-x-full
          animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]
          bg-gradient-to-r
          from-transparent
          via-white/45
          to-transparent
        "
      />
    </div>
  );
}

export default Skeleton;