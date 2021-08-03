import { useState } from "react";

export default function Text100VH({
  label,
  defaultGradient = false,
  isLink = false,
  href,
  isActive = false,
  className = "",
}) {
  if (defaultGradient) {
    if (isLink && href) {
      return (
        <a
          href={href}
          className={`relative flex group ${className ? className : ""}`}
        >
          <p className="absolute text-transparent transition-opacity duration-300 group-hover:opacity-0 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
            {label}
          </p>
          <p className="transition-opacity opacity-0 group-hover:opacity-100">
            {label}
          </p>
        </a>
      );
    } else {
      return (
        <div className={`relative flex group ${className ? className : ""}`}>
          <p className="absolute text-transparent transition-opacity duration-300 group-hover:opacity-0 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
            {label}
          </p>
          <p className="transition-opacity opacity-0 group-hover:opacity-100">
            {label}
          </p>
        </div>
      );
    }
  } else {
    if (isLink && href) {
      return (
        <a
          href={href}
          className={`relative flex group ${className ? className : ""}`}
        >
          <p className="transition-opacity group-hover:opacity-0">{label}</p>
          <p className="absolute text-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
            {label}
          </p>
        </a>
      );
    } else {
      return (
        <div className={`relative flex group ${className ? className : ""}`}>
          <p className="transition-opacity group-hover:opacity-0">{label}</p>
          <p className="absolute text-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
            {label}
          </p>
        </div>
      );
    }
  }
}
