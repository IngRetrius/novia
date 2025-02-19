// src/components/sections/GardenSection/Flowers.tsx
import React from 'react';

const Iris = ({ className = '', delay = 0 }) => (
  <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
    <g className="animate-sway origin-bottom" style={{ animationDelay: `${delay}s` }}>
      <path
        d="M50,400 C50,300 50,200 50,100"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
        className="animate-grow"
      />
      <path
        d="M50,100 L50,80 L50,100 M45,90 L55,90"
        stroke="#9C27B0"
        strokeWidth="3"
        fill="none"
        className="animate-bloom"
      />
    </g>
  </svg>
);

const Tulip = ({ className = '', delay = 0 }) => (
  <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
    <g className="animate-sway origin-bottom" style={{ animationDelay: `${delay}s` }}>
      <path
        d="M50,400 C50,300 50,200 50,100"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
        className="animate-grow"
      />
      <circle
        cx="50"
        cy="80"
        r="15"
        fill="#FFB6C1"
        className="animate-bloom"
      />
    </g>
  </svg>
);

const Lavender = ({ className = '', delay = 0 }) => (
  <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
    <g className="animate-sway origin-bottom" style={{ animationDelay: `${delay}s` }}>
      <path
        d="M50,400 C50,300 50,200 50,80"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
        className="animate-grow"
      />
      <path
        d="M50,80 L50,60"
        stroke="#7B1FA2"
        strokeWidth="3"
        className="animate-bloom"
      />
    </g>
  </svg>
);

const Lily = ({ className = '', delay = 0 }) => (
  <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
    <g className="animate-sway origin-bottom" style={{ animationDelay: `${delay}s` }}>
      <path
        d="M50,400 C50,300 50,200 50,100"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
        className="animate-grow"
      />
      <circle
        cx="50"
        cy="80"
        r="12"
        fill="#FFC0CB"
        className="animate-bloom"
      />
    </g>
  </svg>
);

// Nuevas flores
const Daisy = ({ className = '', delay = 0 }) => (
  <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
    <g className="animate-sway origin-bottom" style={{ animationDelay: `${delay}s` }}>
      <path
        d="M50,400 C50,300 50,200 50,100"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
        className="animate-grow"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M50,80 Q60,70 50,60 Q40,70 50,80"
          stroke="#FFFFFF"
          fill="#FFFFFF"
          className="animate-bloom"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: '50px 80px',
          }}
        />
      ))}
      <circle
        cx="50"
        cy="80"
        r="5"
        fill="#FFD700"
        className="animate-bloom"
      />
    </g>
  </svg>
);

const Rose = ({ className = '', delay = 0 }) => (
  <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
    <g className="animate-sway origin-bottom" style={{ animationDelay: `${delay}s` }}>
      <path
        d="M50,400 C50,300 50,200 50,100"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
        className="animate-grow"
      />
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <path
          key={angle}
          d="M50,90 C60,80 60,70 50,60 C40,70 40,80 50,90"
          stroke="#FF1493"
          fill="#FF69B4"
          className="animate-bloom"
          style={{
            transform: `rotate(${angle}deg) scale(${1 - i * 0.15})`,
            transformOrigin: '50px 75px',
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </g>
  </svg>
);

const Sunflower = ({ className = '', delay = 0 }) => (
  <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
    <g className="animate-sway origin-bottom" style={{ animationDelay: `${delay}s` }}>
      <path
        d="M50,400 C50,300 50,200 50,100"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
        className="animate-grow"
      />
      {[...Array(24)].map((_, i) => (
        <path
          key={i}
          d="M50,80 L60,65 L50,70 L40,65 Z"
          fill="#FFD700"
          className="animate-bloom"
          style={{
            transform: `rotate(${i * 15}deg)`,
            transformOrigin: '50px 80px',
          }}
        />
      ))}
      <circle
        cx="50"
        cy="80"
        r="8"
        fill="#8B4513"
        className="animate-bloom"
      />
    </g>
  </svg>
);

export { Iris, Tulip, Lavender, Lily, Daisy, Rose, Sunflower };