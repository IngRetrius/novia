import React, { ReactNode } from 'react';

interface FlowerProps {
  className?: string;
  delay?: number;
}

interface WrapperProps {
  children: ReactNode;
  delay?: number;
}

const FlowerWrapper: React.FC<WrapperProps> = ({ children, delay = 0 }) => (
  <div 
    style={{ 
      animation: `appear 1s ease-out forwards ${delay}s`,
      opacity: 0
    }}
  >
    {children}
  </div>
);

const Iris: React.FC<FlowerProps> = ({ className = '', delay = 0 }) => (
  <FlowerWrapper delay={delay}>
    <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
      <g style={{ animation: `sway 3s ease-in-out infinite ${delay + 1}s` }} className="origin-bottom">
        <path
          d="M50,400 C50,300 50,200 50,100"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          style={{ animation: `grow 2s ease-out forwards ${delay}s` }}
        />
        <path
          d="M50,100 L50,80 L50,100 M45,90 L55,90"
          stroke="#9C27B0"
          strokeWidth="3"
          fill="none"
          style={{ animation: `bloom 1s ease-out forwards ${delay + 1}s` }}
        />
      </g>
    </svg>
  </FlowerWrapper>
);

const Tulip: React.FC<FlowerProps> = ({ className = '', delay = 0 }) => (
  <FlowerWrapper delay={delay}>
    <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
      <g style={{ animation: `sway 3s ease-in-out infinite ${delay + 1}s` }} className="origin-bottom">
        <path
          d="M50,400 C50,300 50,200 50,100"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          style={{ animation: `grow 2s ease-out forwards ${delay}s` }}
        />
        <circle
          cx="50"
          cy="80"
          r="15"
          fill="#FFB6C1"
          style={{ animation: `bloom 1s ease-out forwards ${delay + 1}s` }}
        />
      </g>
    </svg>
  </FlowerWrapper>
);

const Lavender: React.FC<FlowerProps> = ({ className = '', delay = 0 }) => (
  <FlowerWrapper delay={delay}>
    <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
      <g style={{ animation: `sway 3s ease-in-out infinite ${delay + 1}s` }} className="origin-bottom">
        <path
          d="M50,400 C50,300 50,200 50,80"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          style={{ animation: `grow 2s ease-out forwards ${delay}s` }}
        />
        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx={50 + (i % 2 ? 5 : -5)}
            cy={20 + i * 5}
            r="4"
            fill="#E6E6FA"
            style={{ animation: `bloom 1s ease-out forwards ${delay + 1 + i * 0.1}s` }}
          />
        ))}
      </g>
    </svg>
  </FlowerWrapper>
);

const Lily: React.FC<FlowerProps> = ({ className = '', delay = 0 }) => (
  <FlowerWrapper delay={delay}>
    <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
      <g style={{ animation: `sway 3s ease-in-out infinite ${delay + 1}s` }} className="origin-bottom">
        <path
          d="M50,400 C50,300 50,200 50,100"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          style={{ animation: `grow 2s ease-out forwards ${delay}s` }}
        />
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M50,50 Q70,40 80,10 Q60,30 50,50"
            fill="#FFE4E1"
            style={{ 
              animation: `bloom 1s ease-out forwards ${delay + 1}s`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: '50px 50px'
            }}
          />
        ))}
        <circle 
          cx="50" 
          cy="50" 
          r="8" 
          fill="#FFB6C1" 
          style={{ animation: `bloom 1s ease-out forwards ${delay + 1.2}s` }}
        />
      </g>
    </svg>
  </FlowerWrapper>
);

const Daisy: React.FC<FlowerProps> = ({ className = '', delay = 0 }) => (
  <FlowerWrapper delay={delay}>
    <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
      <g style={{ animation: `sway 3s ease-in-out infinite ${delay + 1}s` }} className="origin-bottom">
        <path
          d="M50,400 C50,300 50,200 50,100"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          style={{ animation: `grow 2s ease-out forwards ${delay}s` }}
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={angle}
            d="M50,80 Q60,70 50,60 Q40,70 50,80"
            fill="#FFFFFF"
            style={{ 
              animation: `bloom 1s ease-out forwards ${delay + 1}s`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: '50px 80px'
            }}
          />
        ))}
        <circle 
          cx="50" 
          cy="80" 
          r="5" 
          fill="#FFD700" 
          style={{ animation: `bloom 1s ease-out forwards ${delay + 1.2}s` }}
        />
      </g>
    </svg>
  </FlowerWrapper>
);

const Rose: React.FC<FlowerProps> = ({ className = '', delay = 0 }) => (
  <FlowerWrapper delay={delay}>
    <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
      <g style={{ animation: `sway 3s ease-in-out infinite ${delay + 1}s` }} className="origin-bottom">
        <path
          d="M50,400 C50,300 50,200 50,100"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          style={{ animation: `grow 2s ease-out forwards ${delay}s` }}
        />
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <path
            key={angle}
            d="M50,90 C60,80 60,70 50,60 C40,70 40,80 50,90"
            fill="#FF69B4"
            style={{ 
              animation: `bloom 1s ease-out forwards ${delay + 1 + i * 0.1}s`,
              transform: `rotate(${angle}deg) scale(${1 - i * 0.15})`,
              transformOrigin: '50px 75px',
              opacity: 1 - i * 0.1
            }}
          />
        ))}
      </g>
    </svg>
  </FlowerWrapper>
);

const Sunflower: React.FC<FlowerProps> = ({ className = '', delay = 0 }) => (
  <FlowerWrapper delay={delay}>
    <svg viewBox="0 0 100 400" className={`w-16 h-64 ${className}`}>
      <g style={{ animation: `sway 3s ease-in-out infinite ${delay + 1}s` }} className="origin-bottom">
        <path
          d="M50,400 C50,300 50,200 50,100"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          style={{ animation: `grow 2s ease-out forwards ${delay}s` }}
        />
        {[...Array(24)].map((_, i) => (
          <path
            key={i}
            d="M50,80 L60,65 L50,70 L40,65 Z"
            fill="#FFD700"
            style={{ 
              animation: `bloom 1s ease-out forwards ${delay + 1 + i * 0.02}s`,
              transform: `rotate(${i * 15}deg)`,
              transformOrigin: '50px 80px'
            }}
          />
        ))}
        <circle 
          cx="50" 
          cy="80" 
          r="8" 
          fill="#8B4513" 
          style={{ animation: `bloom 1s ease-out forwards ${delay + 1.5}s` }}
        />
      </g>
    </svg>
  </FlowerWrapper>
);

export { Iris, Tulip, Lavender, Lily, Daisy, Rose, Sunflower };