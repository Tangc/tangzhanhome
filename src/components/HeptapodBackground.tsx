"use client";

import { useEffect, useRef, useState } from 'react';

export default function HeptapodBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Ink Blot Class
    class InkBlot {
      x: number;
      y: number;
      radius: number;
      points: number[];
      rotation: number;
      speed: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 100 + 50;
        this.points = [];
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = (Math.random() - 0.5) * 0.002;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = Math.random() > 0.8 ? '#ff003c' : '#ffffff'; 

        const segments = 20;
        for (let i = 0; i < segments; i++) {
            this.points.push(this.radius + (Math.random() - 0.5) * 30);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.beginPath();
        const angleStep = (Math.PI * 2) / this.points.length;
        
        for (let i = 0; i < this.points.length; i++) {
           const r = this.points[i];
           const angle = i * angleStep;
           const x = Math.cos(angle) * r;
           const y = Math.sin(angle) * r;
           if (i === 0) ctx.moveTo(x, y);
           else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.opacity;
        ctx.stroke();
        
        ctx.restore();
        
        this.rotation += this.speed;
        
        if (this.x < -200) this.x = width + 200;
        if (this.x > width + 200) this.x = -200;
        if (this.y < -200) this.y = height + 200;
        if (this.y > height + 200) this.y = -200;
      }
    }

    const blots: InkBlot[] = [];
    for (let i = 0; i < 15; i++) {
      blots.push(new InkBlot());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      blots.forEach(blot => blot.draw(ctx));
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  // Prevent SSR rendering to fix hydration mismatch
  if (!mounted) return null;

  return <canvas ref={canvasRef} id="heptapod-canvas" />;
}
