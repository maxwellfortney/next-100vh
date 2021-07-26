import { useEffect } from "react";

export default function MobileMenu({ menuOpen, setMenuOpen }: any) {
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (document.documentElement.clientWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    });
  });
  return (
    <div
      className={`duration-200 z-10 mobile-menu fixed bg-100vh-gray w-screen ${
        menuOpen ? "is-open" : "is-closed"
      } h-screen flex flex-col top-0`}
      //   style={{ left: menuOpen ? "100%" : "0" }}
    >
      <div className="flex"></div>
    </div>
  );
}
