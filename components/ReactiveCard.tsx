"use client";

import {
MouseEvent,
ReactNode,
useState,
} from "react";

type ReactiveCardProps = {
children: ReactNode;
className?: string;
};

export default function ReactiveCard({
children,
className = "",
}: ReactiveCardProps) {

const [position, setPosition] = useState({
x: 50,
y: 50,
});

const [rotation, setRotation] = useState({
x: 0,
y: 0,
});

const handleMouseMove = (
event: MouseEvent<HTMLDivElement>
) => {

const rect =
  event.currentTarget.getBoundingClientRect();

const x =
  ((event.clientX - rect.left) /
    rect.width) *
  100;

const y =
  ((event.clientY - rect.top) /
    rect.height) *
  100;

// Calculate tilt
const rotateX =
  ((y - 50) / 50) * -4;

const rotateY =
  ((x - 50) / 50) * 4;

setPosition({
  x,
  y,
});

setRotation({
  x: rotateX,
  y: rotateY,
});

};

const handleMouseLeave = () => {

setPosition({
  x: 50,
  y: 50,
});

setRotation({
  x: 0,
  y: 0,
});

};

return (

<div
  className={`
    reactive-card
    ${className}
  `}

  onMouseMove={
    handleMouseMove
  }

  onMouseLeave={
    handleMouseLeave
  }

  style={{
    "--mouse-x":
      `${position.x}%`,

    "--mouse-y":
      `${position.y}%`,

    transform:
      `perspective(1000px)
       rotateX(${rotation.x}deg)
       rotateY(${rotation.y}deg)`,

  } as React.CSSProperties}
>

  {children}

</div>

);

}