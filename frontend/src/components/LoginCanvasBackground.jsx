import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

export default function LoginCanvasBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      resizeTo: window,
      backgroundAlpha: 0,
      antialias: true,
    });

    app.view.style.position = "absolute";
    app.view.style.inset = "0";
    app.view.style.zIndex = "0";
    app.view.style.opacity = "0.5";

    containerRef.current.appendChild(app.view);

    // BIG OBVIOUS SHAPE
    const box = new PIXI.Graphics();
    box.beginFill(0x0ea5e9);
    box.drawRect(-50, -50, 100, 100);
    box.endFill();

    box.x = app.screen.width / 2;
    box.y = app.screen.height / 2;

    app.stage.addChild(box);

    // íº¨ VERY OBVIOUS ANIMATION
    app.ticker.add(() => {
      box.rotation += 0.05;   // should spin constantly
      box.scale.set(1 + Math.sin(performance.now() * 0.002) * 0.2);
    });

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 pointer-events-none hidden md:block"
    />
  );
}
