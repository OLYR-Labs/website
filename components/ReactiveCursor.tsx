"use client";

import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  size: number;
  opacity: number;
};

export default function ReactiveCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!mediaQuery.matches) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouseX = width / 2;
    let mouseY = height / 2;

    let lastX = mouseX;
    let lastY = mouseY;

    let animationFrame: number;

    const trail: TrailPoint[] = [];


    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const devicePixelRatio =
        Math.min(window.devicePixelRatio || 1, 2);

      canvas.width =
        width * devicePixelRatio;

      canvas.height =
        height * devicePixelRatio;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );
    };


    const handleMouseMove = (
      event: MouseEvent
    ) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      const distance =
        Math.hypot(
          mouseX - lastX,
          mouseY - lastY
        );


      if (distance > 2) {

        trail.push({
          x: mouseX,
          y: mouseY,
          size: 18,
          opacity: 0.35,
        });

        lastX = mouseX;
        lastY = mouseY;

      }

    };


    const animate = () => {

      context.clearRect(
        0,
        0,
        width,
        height
      );


      for (
        let index = trail.length - 1;
        index >= 0;
        index--
      ) {

        const point =
          trail[index];


        point.opacity -= 0.015;

        point.size *= 0.96;


        if (
          point.opacity <= 0 ||
          point.size < 1
        ) {

          trail.splice(
            index,
            1
          );

          continue;

        }


        const gradient =
          context.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            point.size
          );


        gradient.addColorStop(
          0,
          `rgba(59, 130, 246, ${point.opacity})`
        );


        gradient.addColorStop(
          0.4,
          `rgba(37, 99, 235, ${point.opacity * 0.5})`
        );


        gradient.addColorStop(
          1,
          "rgba(37, 99, 235, 0)"
        );


        context.beginPath();

        context.arc(
          point.x,
          point.y,
          point.size,
          0,
          Math.PI * 2
        );

        context.fillStyle =
          gradient;

        context.fill();

      }


      animationFrame =
        requestAnimationFrame(
          animate
        );

    };


    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );


    animate();


    return () => {

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, []);


  return (

    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998]"
    />

  );

}