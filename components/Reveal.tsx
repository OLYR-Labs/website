"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {

  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {

    const element = ref.current;

    if (!element) return;


    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          setShow(true);

          observer.unobserve(element);

        }

      },
      {
        threshold: 0.2,
      }
    );


    observer.observe(element);


    return () => {
      observer.disconnect();
    };


  }, []);



  return (

    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`
        ${className}
        transform transition-all duration-700 ease-out
        ${
          show
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }
      `}
    >

      {children}

    </div>

  );

}