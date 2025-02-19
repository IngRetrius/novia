import React, { useEffect, useState } from 'react';
import { Iris, Tulip, Lavender, Lily, Daisy, Rose, Sunflower } from './Flowers';

const GardenSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const generateFlowerPositions = (count: number) => {
    const positions = [];
    const minDistance = 12; // Reducido para permitir más flores
    
    for (let i = 0; i < count; i++) {
      let x, y, isValid;
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
        delay: Math.random() * 3,
        scale: 0.7 + Math.random() * 0.6, // Mayor variación en tamaños
        rotation: Math.random() * 20 - 10,
      });
    }
    return positions;
  };

  const irisPositions = generateFlowerPositions(10);
  const tulipPositions = generateFlowerPositions(8);
  const lavenderPositions = generateFlowerPositions(12);
  const lilyPositions = generateFlowerPositions(8);
  const daisyPositions = generateFlowerPositions(10);
  const rosePositions = generateFlowerPositions(8);
  const sunflowerPositions = generateFlowerPositions(6);

  const allPositions = [
    ...irisPositions.map(pos => ({ ...pos, type: 'iris' })),
    ...tulipPositions.map(pos => ({ ...pos, type: 'tulip' })),
    ...lavenderPositions.map(pos => ({ ...pos, type: 'lavender' })),
    ...lilyPositions.map(pos => ({ ...pos, type: 'lily' })),
    ...daisyPositions.map(pos => ({ ...pos, type: 'daisy' })),
    ...rosePositions.map(pos => ({ ...pos, type: 'rose' })),
    ...sunflowerPositions.map(pos => ({ ...pos, type: 'sunflower' })),
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDF4FF]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-purple-800 text-center mb-8">
          Our Garden
        </h2>
        <p className="text-purple-600 text-center mb-12 max-w-2xl mx-auto text-lg italic">
          "Just like these flowers, my reasons to love you that you saw before are infinite and forever."
        </p>
        <div className={`relative h-[1000px] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {allPositions.map((pos, i) => (
            <div
              key={`flower-${i}`}
              className="absolute transition-all duration-1000"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `scale(${pos.scale}) rotate(${pos.rotation}deg)`,
                transitionDelay: `${pos.delay}s`,
              }}
            >
              {pos.type === 'iris' && <Iris delay={pos.delay} />}
              {pos.type === 'tulip' && <Tulip delay={pos.delay} />}
              {pos.type === 'lavender' && <Lavender delay={pos.delay} />}
              {pos.type === 'lily' && <Lily delay={pos.delay} />}
              {pos.type === 'daisy' && <Daisy delay={pos.delay} />}
              {pos.type === 'rose' && <Rose delay={pos.delay} />}
              {pos.type === 'sunflower' && <Sunflower delay={pos.delay} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GardenSection;