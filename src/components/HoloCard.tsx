import React, { useState, useRef } from 'react';
import { YugiohCard } from '../types';
import styles from './HoloCard.module.css';

interface HoloCardProps {
  card: YugiohCard;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDetails?: boolean;
  onClick?: () => void;
  isHoverable?: boolean;
}

export const HoloCard: React.FC<HoloCardProps> = ({
  card,
  size = 'md',
  showDetails = false,
  onClick,
  isHoverable = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoverable || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 16;
    const rotY = ((x - centerX) / centerX) * 16;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const imageUrl = card.card_images?.[0]?.image_url || card.card_images?.[0]?.image_url_small;

  return (
    <div
      ref={cardRef}
      className={`${styles.cardWrapper} ${styles[size]} ${onClick ? styles.clickable : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
    >
      <div className={styles.cardFrame}>
        <img
          src={imageUrl}
          alt={card.name}
          className={styles.cardImage}
          loading="lazy"
        />

        {/* Dynamic Holographic Foil Overlay */}
        <div
          className={styles.holoFoil}
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(0, 213, 255, 0.25) 35%, rgba(117, 72, 217, 0.2) 65%, transparent 80%)`
          }}
        />

        {/* Golden/Card border illumination */}
        <div className={styles.cardBorderGlow} />
      </div>

      {showDetails && (
        <div className={styles.quickInfo}>
          <div className={styles.cardTitle}>{card.name_pt || card.name}</div>
          {card.type.includes('Monster') && (
            <div className={styles.stats}>
              <span className={styles.atk}>ATK: {card.atk ?? 0}</span>
              <span className={styles.def}>DEF: {card.def ?? 0}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
