// src/app/lab/yellow-flower/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import BackButton from "@/components/BackButton";

export default function YellowFlowerPage() {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [showPrompt, setShowPrompt] = useState(true);

  // 1. Generación geométrica mejorada de la flor
  useEffect(() => {
    const list = [];
    const goldenAngle = 2.399963; // Ángulo áureo en radianes (~137.5°)

    // A) Centro / Semillas de girasol (450 puntos en espiral de Fermat)
    for (let i = 0; i < 450; i++) {
      const r = Math.sqrt(i) * 5.2;
      const theta = i * goldenAngle;
      const rndA = Math.random() * Math.PI * 2;
      const rndD = 300 + Math.random() * 800;

      list.push({
        origX: Math.cos(rndA) * rndD,
        origY: Math.sin(rndA) * rndD,
        targetX: Math.cos(theta) * r,
        targetY: Math.sin(theta) * r - 20,
        x: 0,
        y: 0,
        color: i % 2 === 0 ? "#f59e0b" : "#d97706",
        baseR: 1.4,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // B) Pétalos tupidos en 2 capas (Capa interna y externa para dar volumen de flor)
    const layers = [
      { count: 18, length: 110, width: 28, points: 26, offset: 0, color: "#facc15" },
      { count: 18, length: 155, width: 34, points: 30, offset: Math.PI / 18, color: "#fef08a" },
    ];

    layers.forEach((layer) => {
      for (let p = 0; p < layer.count; p++) {
        const petalAngle = (p / layer.count) * Math.PI * 2 + layer.offset;

        for (let pt = 0; pt < layer.points; pt++) {
          const t = (pt + 1) / layer.points; // de 0 a 1 a lo largo del pétalo
          // Perfil curvado de pétalo ovalado
          const spreadFactor = Math.sin(t * Math.PI) * (layer.width / 2);
          const side = (pt % 2 === 0 ? 1 : -1) * (Math.random() * 0.9);
          const along = 35 + t * layer.length;
          const across = side * spreadFactor;

          const px = Math.cos(petalAngle) * along - Math.sin(petalAngle) * across;
          const py = Math.sin(petalAngle) * along + Math.cos(petalAngle) * across;

          const rndA = Math.random() * Math.PI * 2;
          const rndD = 350 + Math.random() * 850;

          list.push({
            origX: Math.cos(rndA) * rndD,
            origY: Math.sin(rndA) * rndD,
            targetX: px,
            targetY: py - 20,
            x: 0,
            y: 0,
            color: t > 0.65 ? "#fef08a" : layer.color,
            baseR: 1.6,
            pulseOffset: Math.random() * Math.PI * 2,
          });
        }
      }
    });

    // C) Tallo orgánico
    for (let i = 0; i < 120; i++) {
      const t = i / 120;
      const tx = Math.sin(t * Math.PI * 1.5) * 14;
      const ty = 75 + t * 270;
      const rndA = Math.random() * Math.PI * 2;
      const rndD = 250 + Math.random() * 700;

      list.push({
        origX: Math.cos(rndA) * rndD,
        origY: Math.sin(rndA) * rndD,
        targetX: tx,
        targetY: ty,
        x: 0,
        y: 0,
        color: "#84cc16",
        baseR: 1.3,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // D) Hojas laterales
    for (let i = 0; i < 140; i++) {
      const isLeft = i % 2 === 0;
      const t = (i / 140) * 2; // 0 a 1 por hoja
      const leafDir = isLeft ? -1 : 1;
      const lx = leafDir * (15 + t * 85 * Math.sin(t * Math.PI));
      const ly = (isLeft ? 170 : 220) + t * 45;
      const rndA = Math.random() * Math.PI * 2;
      const rndD = 300 + Math.random() * 700;

      list.push({
        origX: Math.cos(rndA) * rndD,
        origY: Math.sin(rndA) * rndD,
        targetX: lx,
        targetY: ly,
        x: 0,
        y: 0,
        color: "#65a30d",
        baseR: 1.3,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    starsRef.current = list;
  }, []);

  // 2. Control de scroll fluido sin re-renders de React
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      scrollRef.current = progress;
      if (progress > 0.05) setShowPrompt(false);
      else setShowPrompt(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Render loop desacoplado a 60 FPS estables
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    let time = 0;
    let smoothP = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Suavizado inercial del scroll
      smoothP += (scrollRef.current - smoothP) * 0.1;
      const p = smoothP;

      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.44;

      // Resplandor cálido de fondo solo cuando la flor se consolida
      if (p > 0.6) {
        const bloom = (p - 0.6) / 0.4;
        const radGrad = ctx.createRadialGradient(
          centerX,
          centerY - 20,
          10,
          centerX,
          centerY - 20,
          230 * bloom
        );
        radGrad.addColorStop(0, `rgba(250, 204, 21, ${0.18 * bloom})`);
        radGrad.addColorStop(0.6, `rgba(245, 158, 11, ${0.06 * bloom})`);
        radGrad.addColorStop(1, "rgba(7, 9, 14, 0)");
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 20, 240 * bloom, 0, Math.PI * 2);
        ctx.fill();
      }

      const stars = starsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = mouseRef.current.active;

      // Interpolación exponencial suave
      const easeP = 1 - Math.pow(1 - p, 3);
      const spinAngle = (1 - easeP) * 2.2;
      const cosS = Math.cos(spinAngle);
      const sinS = Math.sin(spinAngle);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        const curTargetX = centerX + s.targetX * easeP;
        const curTargetY = centerY + s.targetY * easeP;

        const rx = s.origX * cosS - s.origY * sinS;
        const ry = s.origX * sinS + s.origY * cosS;

        let destX = (centerX + rx) * (1 - easeP) + curTargetX * easeP;
        let destY = (centerY + ry) * (1 - easeP) + curTargetY * easeP;

        // Física con el cursor
        if (hasMouse) {
          const dx = destX - mx;
          const dy = destY - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000 && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const push = (1 - dist / 100) * 32;
            destX += (dx / dist) * push;
            destY += (dy / dist) * push;
          }
        }

        s.x += (destX - s.x) * 0.18;
        s.y += (destY - s.y) * 0.18;

        const pulse = 0.8 + Math.sin(time * 2.5 + s.pulseOffset) * 0.25;
        const r = s.baseR * pulse;

        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []); // Sin dependencias para que el loop corra continuo y sin tirones

  return (
    <div className="relative bg-[#07090e] min-h-[350vh] text-neutral-100 selection:bg-yellow-400 selection:text-black">
      <BackButton />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-auto z-10"
      />

      <div
        className={`fixed bottom-10 inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-500 ${
          showPrompt ? "opacity-60" : "opacity-0"
        }`}
      >
        <span className="text-xs font-mono tracking-widest text-neutral-400 mb-2">
          DESLIZA HACIA ABAJO
        </span>
        <div className="w-4 h-7 rounded-full border border-neutral-600 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-yellow-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}