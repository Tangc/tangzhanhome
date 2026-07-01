'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './page.module.css';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export default function AnimatedIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;
      const root = rootRef.current;
      if (!root) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isDesktop = viewportWidth > 900;

      if (!isDesktop) {
        root.removeAttribute('style');
        root.dataset.docked = 'false';
        return;
      }

      const progress = clamp(window.scrollY / (viewportHeight * 0.82), 0, 1);
      const containerWidth = Math.min(1200, viewportWidth - 48);
      const containerLeft = (viewportWidth - containerWidth) / 2;
      const rightColumnLeft = containerLeft + containerWidth - 320;
      const startWidth = Math.min(900, containerWidth);
      const endWidth = 320;
      const left = lerp(viewportWidth / 2, rightColumnLeft, progress);
      const top = lerp(viewportHeight * 0.5, 72, progress);
      const translateX = lerp(-50, 0, progress);
      const translateY = lerp(-50, 0, progress);

      root.style.position = 'fixed';
      root.style.left = `${left}px`;
      root.style.top = `${top}px`;
      root.style.width = `${lerp(startWidth, endWidth, progress)}px`;
      root.style.transform = `translate(${translateX}%, ${translateY}%)`;
      root.style.setProperty('--intro-progress', progress.toFixed(4));
      root.style.setProperty('--intro-avatar-scale', lerp(1, 0.7, progress).toFixed(4));
      root.style.setProperty('--intro-slogan-size', `${lerp(56, 22, progress)}px`);
      root.dataset.docked = progress > 0.72 ? 'true' : 'false';
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.animatedIntro} data-docked="false">
      <div className={styles.profileRow}>
        <div className={styles.avatarWrapper}>
          <Image
            src="/images/avatar.png"
            alt="Tang Zhan"
            width={80}
            height={80}
            className={styles.avatar}
            priority
          />
        </div>
        <div className={styles.identity}>
          <h1 className={`${styles.name} mono`}>唐斩 / TANG ZHAN</h1>
          <p className={styles.role}>
            13年资深架构师 <span className="text-red">➜</span> AI 原生 Agent 开发者
          </p>
          <div className={styles.tags}>
            <span>#降临派</span>
            <span>#Agent调度者</span>
          </div>
        </div>
      </div>

      <div className={styles.valueSection}>
        <div className={styles.hugeSlogan}>
          <p>我能帮助你 </p>
          <p className="text-red">在 AI 时代，成功转型</p>
          <p>用 <span className="text-cyan">Agent Skill</span> ，成为超级个体</p>
        </div>
      </div>
    </div>
  );
}
