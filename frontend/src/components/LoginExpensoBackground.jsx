import { useEffect, useRef } from "react";
import bg from "../assets/expenso-bg.svg";

export default function LoginExpensoBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      el.style.setProperty("--mx", `${(x - 0.5) * 40}px`);
      el.style.setProperty("--my", `${(y - 0.5) * 40}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none hidden md:block"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "600px 600px",
        backgroundPosition: "calc(50% + var(--mx)) calc(50% + var(--my))",
        transition: "background-position 0.15s ease-out",
      }}
    />
  );
}
