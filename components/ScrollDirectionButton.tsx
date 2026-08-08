
"use client";

import { useEffect, useState } from "react";

export default function ScrollDirectionButton() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight;

      const scrollable =
        documentHeight > viewportHeight + 50;

      const distanceFromBottom =
        documentHeight -
        (scrollTop + viewportHeight);

      setIsScrollable(scrollable);
      setIsAtBottom(distanceFromBottom <= 100);
    };

    updateScrollState();

    window.addEventListener(
      "scroll",
      updateScrollState,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateScrollState
    );

    const resizeObserver =
      new ResizeObserver(updateScrollState);

    resizeObserver.observe(
      document.documentElement
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateScrollState
      );

      window.removeEventListener(
        "resize",
        updateScrollState
      );

      resizeObserver.disconnect();
    };
  }, []);

  if (!isScrollable) {
    return null;
  }

  const scrollToDestination = () => {
    window.scrollTo({
      top: isAtBottom
        ? 0
        : document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToDestination}
      aria-label={
        isAtBottom
          ? "Scroll to top"
          : "Scroll to bottom"
      }
      className="
        group
        fixed
        bottom-7
        left-7
        z-[9999]
        flex
        h-12
        w-12
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-blue-400/20
        bg-[#080808]/90
        text-blue-300
        shadow-[0_0_25px_rgba(59,130,246,0.12)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-400/60
        hover:bg-blue-400/10
        hover:text-blue-200
        hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
        active:scale-90
      "
    >
      {/* Animated glow */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-full
          bg-blue-400/10
          opacity-60
          blur-md
          transition-all
          duration-300
          group-hover:bg-blue-400/20
          group-hover:opacity-100
        "
      />

      {/* Arrow */}
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          relative
          z-10
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        {isAtBottom ? (
          <path
            d="M12 19V5M6 11L12 5L18 11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M12 5V19M6 13L12 19L18 13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Tooltip */}
      <span
        className="
          pointer-events-none
          absolute
          left-1/2
          top-full
          mt-3
          -translate-x-1/2
          whitespace-nowrap
          rounded-md
          border
          border-white/10
          bg-[#090909]
          px-3
          py-1.5
          text-[11px]
          font-medium
          text-white
          opacity-0
          shadow-xl
          transition-all
          duration-200
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        {isAtBottom
          ? "Back to top"
          : "Go to bottom"}
      </span>
    </button>
  );
}

