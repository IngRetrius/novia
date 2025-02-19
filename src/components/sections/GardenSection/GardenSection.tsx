import React, { useEffect, useState } from 'react';
import { Iris, Tulip, Lavender, Lily, Daisy, Rose, Sunflower } from './Flowers';
import { Heart } from 'lucide-react';

interface FlowerPosition {
  x: number;
  y: number;
  delay: number;
  scale: number;
  rotation: number;
  type?: 'iris' | 'tulip' | 'lavender' | 'lily' | 'daisy' | 'rose' | 'sunflower';
}

interface Position {
  x: number;
  y: number;
}

const GardenSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const noResponsePhrases = [
    "Are you sure? Think again...",
    "Please, think about it one more time 🥺",
    "But I love you so much! Try again ❤️",
    "Don't break my heart... Reconsider? 💔",
    "Remember all our moments together... Sure about that no?",
    "Come on! Give us another chance 🌹",
    "Really? You know you want to say yes 😊",
    "Just one more chance, I promise it'll be worth it ✨",
    "My heart says you'll change your mind ❤️",
    "You're making me sad... Sure about that? 🥺",
    "I'll keep asking until you say yes! 💝",
    "Remember our first kiss? Try again 💋",
    "Look at all these flowers... Sure about no? 🌸",
    "I can't take no for an answer 😅",
    "Let's make new memories together... Reconsider? 📸"
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleYes = () => {
    setShowQuestion(false);
    setShowConfirmation(true);
  };

  const handleNo = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * noResponsePhrases.length);
    } while (newIndex === currentPhraseIndex);
    
    setCurrentPhraseIndex(newIndex);
  };

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
        <h2 className="text-4xl font-bold text-purple-800 text-center mb-8">
          Our Garden
        </h2>
        <p className="text-purple-600 text-center mb-12 max-w-2xl mx-auto text-lg italic">
          "Just like these flowers, my reasons to love you that you saw before are infinite and forever."
        </p>
        
        <div 
          className={`relative h-[1000px] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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

        {/* Question Modal */}
        <div
          className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 ${
            showQuestion ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl transform transition-all duration-500 scale-110 max-w-md w-full mx-4">
            <div className="text-center">
              <Heart 
                className={`w-16 h-16 text-pink-500 mx-auto mb-4 ${
                  currentPhraseIndex === 0 ? 'animate-pulse' : 'animate-bounce'
                }`} 
              />
              <h3 className="text-2xl font-bold text-purple-800 mb-6">
                {currentPhraseIndex === 0 ? "Would you be my girlfriend again?" : noResponsePhrases[currentPhraseIndex]}
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleYes}
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all shadow-lg"
                >
                  Yes
                </button>
                <button
                  onClick={handleNo}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all shadow-lg"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <div
          className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 ${
            showConfirmation ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl transform transition-all duration-500 scale-110 max-w-md w-full mx-4"
          >
            <div className="text-center">
              <div className="relative">
                <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-bounce" />
                <div className="absolute -top-2 -right-2">
                  <Heart className="w-8 h-8 text-purple-500 animate-ping" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                I knew it! 
              </h3>
              <p className="text-purple-600 text-lg mb-6">
                I love you so much ❤️
              </p>
              <div className="space-y-4">
                <p className="text-purple-500 text-sm italic">
                  "Together, we'll create more beautiful memories than all the flowers in this garden"
                </p>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all shadow-lg"
                >
                  I love you too ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenSection;