import { useState } from "react";

type Heart = {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
};

export default function Hero() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const handleClick = () => {
    const newHeart: Heart = {
      id: Date.now(),
      top: window.innerHeight - 100,
      left: Math.random() * window.innerWidth,
      size: Math.random() * (2 - 0.8) + 0.8, // Tamaño entre 0.8x y 2x
      duration: Math.random() * (5 - 3) + 3, // Duración entre 3 y 5 segundos
    };

    setHearts((prevHearts) => [...prevHearts, newHeart]);

    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
    }, newHeart.duration * 1000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-purple-100">
      <h1 className="text-5xl font-bold text-purple-700 drop-shadow-md glow-effect">
        For my beautiful butterfly
      </h1>
      <p className="text-purple-500 mt-4 text-center max-w-lg">
        You deserve the entire world. This is a little show of my love for you
      </p>
      <button
        onClick={handleClick}
        className="mt-6 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition transform hover:scale-110"
      >
        ❤️
      </button>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-animation absolute text-red-500"
          style={{
            left: heart.left,
            fontSize: `${heart.size}rem`, // Tamaño aleatorio
            animationDuration: `${heart.duration}s`, // Duración aleatoria
          }}
        >
          ❤️
        </span>
      ))}
      <style jsx>{`
        .glow-effect {
          text-shadow: 0 0 6px rgba(128, 0, 128, 0.6);
        }

        @keyframes floatUp {
          0% {
            transform: translateX(0) translateY(0) scale(0.8);
            opacity: 1;
          }
          25% {
            transform: translateX(-15px) translateY(-25vh) scale(1);
          }
          50% {
            transform: translateX(15px) translateY(-50vh) scale(1.1);
            opacity: 0.8;
          }
          75% {
            transform: translateX(-10px) translateY(-75vh) scale(1);
          }
          100% {
            transform: translateX(10px) translateY(-100vh) scale(0.7);
            opacity: 0;
          }
        }

        .heart-animation {
          position: absolute;
          animation: floatUp linear infinite;
        }
      `}</style>
    </div>
  );
}
