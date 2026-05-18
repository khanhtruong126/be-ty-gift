import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Sparkles } from 'lucide-react';

import img9517 from './assets/IMG_9517.JPG';
import img9518 from './assets/IMG_9518.JPG';
import img9519 from './assets/IMG_9519.JPG';
import img9520 from './assets/IMG_9520.JPG';
import img9521 from './assets/IMG_9521.JPG';
import img9522 from './assets/IMG_9522.PNG';
import img9523 from './assets/IMG_9523.PNG';

const BETY_IMAGES = [
  img9523,
  img9519,
  img9517,
  img9518,
  img9520,
  img9521,
  img9522,
];

export default function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [currentImg, setCurrentImg] = useState(0);

  // Tự động chuyển ảnh trong slideshow
  useEffect(() => {
    if (isAccepted) {
      const interval = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % BETY_IMAGES.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAccepted]);

  // Hàm di chuyển nút "Coá" (Nút chạy trốn)
  const handleHoverCoa = useCallback(() => {
    const randomX =
      Math.random() * (window.innerWidth - 150) - (window.innerWidth / 2 - 75);
    const randomY =
      Math.random() * (window.innerHeight - 100) -
      (window.innerHeight / 2 - 50);
    setNoButtonPos({ x: randomX, y: randomY });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF0F5] flex flex-col items-center justify-center overflow-hidden relative font-sans p-4 select-none">
      {/* Background Decorations */}
      <BackgroundElements />

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center z-10"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-black text-[#FF4D6D] mb-16 px-5 drop-shadow-md"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Bé Ty có đáng iu hong? 🌸
            </motion.h1>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-center h-48 relative">
              {/* Nút KHỒNG - Nút để click */}
              <button
                onClick={() => setIsAccepted(true)}
                className="group relative px-12 py-5 bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3] text-white rounded-full text-2xl font-bold shadow-[0_10px_20px_-5px_rgba(255,77,109,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(255,77,109,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Khồng{' '}
                  <Heart className="fill-white w-6 h-6 group-hover:scale-125 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>

              {/* Nút COÁ - Nút chạy trốn */}
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={handleHoverCoa}
                onClick={handleHoverCoa}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="px-10 py-4 bg-white text-[#FF4D6D] border-4 border-[#FF4D6D] rounded-full text-xl font-bold shadow-lg opacity-80"
              >
                Coá
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10 max-w-2xl w-full"
          >
            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-4xl md:text-5xl font-black text-[#FF4D6D] mb-10 leading-tight"
            >
              Điên?!?! <br />
              <span className="text-[#FF758F] italic font-serif">
                Như này cơ mà!!!
              </span>
            </motion.h2>

            {/* Image Slideshow (Stacked Cards) */}
            <div className="relative w-full max-w-sm mx-auto h-[400px] mt-10 mb-8 flex justify-center items-center">
              {BETY_IMAGES.map((src, index) => {
                const total = BETY_IMAGES.length;
                const relativeIndex = (index - currentImg + total) % total;

                // Tạo góc nghiêng ngẫu nhiên cố định để trông giống ảnh xếp chồng tự nhiên
                const baseRotations = [-6, 8, -5, 7];
                const rotate =
                  relativeIndex === 0
                    ? 0
                    : baseRotations[index % baseRotations.length] +
                      relativeIndex;

                return (
                  <motion.div
                    key={src}
                    className="absolute w-[280px] h-[350px] bg-white p-5 pb-16 rounded-xl shadow-[0_20px_40px_rgba(255,77,109,0.2)] border border-pink-50 origin-bottom"
                    animate={{
                      scale: 1 - relativeIndex * 0.07,
                      y: relativeIndex * 20,
                      x:
                        relativeIndex % 2 === 0
                          ? relativeIndex * 8
                          : relativeIndex * -8,
                      zIndex: total - relativeIndex,
                      rotate: rotate,
                      opacity: 1 - relativeIndex * 0.15,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                  >
                    <div className="w-full h-full overflow-hidden rounded-lg shadow-inner">
                      <img
                        src={src}
                        className="w-full h-full object-cover"
                        alt="Bé Ty"
                      />
                    </div>
                    {/* Polaroid Text */}
                    <div className="absolute bottom-3 left-0 w-full text-center opacity-80">
                      <span className="font-['Dancing_Script'] text-3xl text-[#FF4D6D] font-bold tracking-wider">
                        {
                          [
                            'Em ghệ miền Tây! 💕',
                            'Cutie 🌸',
                            'Xink!!!',
                            'Nét căng 🔥',
                            'Bae 💕',
                            'Nàng thơ ✨',
                            'Bé Ty 🌸',
                          ][index]
                        }
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-[#FF8FA3] font-medium text-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Tặng Bé Ty của tui{' '}
              <Sparkles className="w-5 h-5" />
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Các thành phần trang trí bay bay
function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: '110vh',
            x: Math.random() * 100 + 'vw',
            scale: Math.random() * 0.5 + 0.5,
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            rotate: 360,
            x: Math.random() * 100 - 50 + 'px',
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
          className="absolute text-[#FF8FA3]/20"
        >
          {i % 3 === 0 ? (
            <Heart size={40} fill="currentColor" />
          ) : i % 3 === 1 ? (
            <Stars size={30} fill="currentColor" />
          ) : (
            <Sparkles size={35} fill="currentColor" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
