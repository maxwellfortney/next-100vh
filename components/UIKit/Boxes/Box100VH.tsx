import Link from "next/link";
import { useState } from "react";

interface CommonProps {
  children?: React.ReactNode;

  // styleType: 1 | 2 | 3; // 1 == no border no bg; 2 == gradient border no bg; 3 == gradient border and gradient bg
  onClick?: (any) => any;
  className?: string;
  isActive?: boolean;
}

type ConditionalProps =
  | {
      isLink: true;
      href: string;
    }
  | {
      isLink?: false;
      href?: never;
    };

type Box100VH = CommonProps & ConditionalProps;

export default function Box100VH({
  // styleType,
  onClick,
  isLink,
  href,
  className,
  children,
  isActive = false,
}: Box100VH) {
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseIn() {
    setIsHovering(true);
  }

  function handleMouseOut() {
    setIsHovering(false);
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      className={`relative flex transition-opacity bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
        !isHovering && !isActive ? "opacity-70" : ""
      }`}
    >
      <div
        className={`absolute flex transition-all duration-200 bg-gray-400 ${
          isHovering || isActive ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: "calc(100%)",
          height: "calc(100%)",
        }}
      />
      <div
        className={`w-full m-1 bg-100vh-gray ${className ? className : ""}`}
        style={{ zIndex: 1 }}
      >
        {children}
      </div>
    </div>
  );
}
