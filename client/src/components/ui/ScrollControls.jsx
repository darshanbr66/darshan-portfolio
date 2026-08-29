import { useEffect, useState } from "react";

function ScrollControls() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY < 300);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleClick() {
    window.scrollTo({
      top: isAtTop ? window.innerHeight : 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        isAtTop
          ? "Scroll down"
          : "Scroll to top"
      }
      className="
        fixed
        right-4
        top-1/2
        z-40
        flex
        size-12
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        bg-[var(--color-ink)]
        text-white
        shadow-[0_6px_20px_rgba(17,17,17,0.12)]
        transition-transform
        duration-300
        hover:scale-105
        sm:right-6
      "
    >
      {isAtTop ? "↓" : "↑"}
    </button>
  );
}

export default ScrollControls;