function SkillItem({ name, index }) {
  return (
    <div className="flex items-center justify-between border-t border-[var(--color-border)] py-7 sm:py-8">
      <h3 className="text-2xl font-medium tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
        {name}
      </h3>

      <span className="text-xs text-[var(--color-muted)]">
        {String(index).padStart(2, "0")}
      </span>
    </div>
  );
}

export default SkillItem;