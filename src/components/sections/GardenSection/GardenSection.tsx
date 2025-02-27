'use client';

import React, { useEffect, useState } from 'react';
import { Iris, Tulip, Lavender, Lily, Daisy, Rose, Sunflower } from './Flowers';
import SpanishEnglishDictionary from './SpanishEnglishDictionary';

interface FlowerPosition {
  x: number;
  y: number;
  delay: number;
  scale: number;
  rotation: number;
  type?: 'iris' | 'tulip' | 'lavender' | 'lily' | 'daisy' | 'rose' | 'sunflower';
}

const GardenSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const generateFlowerPositions = (count: number): FlowerPosition[] => {
    const positions: FlowerPosition[] = [];
    const minDistance = 12;
    
    for (let i = 0; i < count; i++) {
      let x: number, y: number, isValid: boolean;
      do {
        isValid = true;
        x = Math.random() * 90 + 5;
        y = Math.random() * 90 + 5;
        
        for (const pos of positions) {
          const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
          if (distance < minDistance) {
            isValid = false;
            break;
          }
        }
      } while (!isValid);

      positions.push({
        x,
        y,
        delay: Math.random() * 2,
        scale: 0.85 + Math.random() * 0.3,
        rotation: Math.random() * 10 - 5,
      });
    }
    return positions;
  };

  const [allPositions] = useState<FlowerPosition[]>(() => {
    const flowerCounts = {
      iris: 10,
      tulip: 8,
      lavender: 12,
      lily: 8,
      daisy: 10,
      rose: 8,
      sunflower: 6
    };

    return [
      ...generateFlowerPositions(flowerCounts.iris).map(pos => ({ ...pos, type: 'iris' as const })),
      ...generateFlowerPositions(flowerCounts.tulip).map(pos => ({ ...pos, type: 'tulip' as const })),
      ...generateFlowerPositions(flowerCounts.lavender).map(pos => ({ ...pos, type: 'lavender' as const })),
      ...generateFlowerPositions(flowerCounts.lily).map(pos => ({ ...pos, type: 'lily' as const })),
      ...generateFlowerPositions(flowerCounts.daisy).map(pos => ({ ...pos, type: 'daisy' as const })),
      ...generateFlowerPositions(flowerCounts.rose).map(pos => ({ ...pos, type: 'rose' as const })),
      ...generateFlowerPositions(flowerCounts.sunflower).map(pos => ({ ...pos, type: 'sunflower' as const })),
    ];
  });

  const renderFlower = (type: FlowerPosition['type'], delay: number) => {
    switch (type) {
      case 'iris':
        return <Iris delay={delay} />;
      case 'tulip':
        return <Tulip delay={delay} />;
      case 'lavender':
        return <Lavender delay={delay} />;
      case 'lily':
        return <Lily delay={delay} />;
      case 'daisy':
        return <Daisy delay={delay} />;
      case 'rose':
        return <Rose delay={delay} />;
      case 'sunflower':
        return <Sunflower delay={delay} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDF4FF]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-purple-800 text-center mb-4">
          Virtual Garden
        </h2>
        <p className="text-purple-600 text-center mb-8 max-w-2xl mx-auto text-lg italic">
          "A garden of flowers to accompany your Spanish learning journey."
        </p>
        
        <div className="text-center mb-8">
          <button 
            onClick={() => setShowDictionary(!showDictionary)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            {showDictionary ? "View Garden" : "View Dictionary"}
          </button>
        </div>
        
        {!showDictionary ? (
          // Show garden when showDictionary is false
          <div 
            className={`relative h-[600px] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {allPositions.map((pos, i) => (
              <div
                key={`flower-${i}`}
                className="absolute transition-all duration-700 will-change-transform"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `scale(${pos.scale}) rotate(${pos.rotation}deg)`,
                  transformOrigin: 'bottom center',
                }}
              >
                {renderFlower(pos.type, pos.delay)}
              </div>
            ))}
          </div>
        ) : (
          // Show dictionary when showDictionary is true
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-[800px] overflow-auto">
            <SpanishEnglishDictionary />
          </div>
        )}
      </div>
    </div>
  );
};

export default GardenSection;