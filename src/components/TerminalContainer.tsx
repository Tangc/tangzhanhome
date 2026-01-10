import React from 'react';
import styles from './TerminalContainer.module.css';

interface TerminalContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glow?: boolean;
}

export default function TerminalContainer({ children, title = "TERMINAL", className = "", glow = false }: TerminalContainerProps) {
  return (
    <div className={`${styles.container} ${glow ? styles.glow : ''} ${className}`}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.status}>ONLINE</div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
