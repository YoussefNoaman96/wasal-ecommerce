import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import "./scrollToTopButton.css";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Show button after scrolling
      setIsVisible(scrollTop > 300);

      // Calculate scroll percentage
      const scrollProgress =
        documentHeight > 0
          ? scrollTop / documentHeight
          : 0;

      // Convert progress to rotation
      // 0%   = 0deg   ↑
      // 50%  = 90deg  →
      // 100% = 180deg ↓
      const rotation = scrollProgress * 180;

      setRotationAngle(rotation);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="scroll-to-top-button-wrapper"
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.7,
            y: 20,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <motion.button
            className="scroll-to-top-button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Arrow */}
            <motion.div
              className="scroll-to-top-arrow"
              animate={{
                y: [0, -4, 0],
                rotate: rotationAngle,
              }}
              transition={{
                y: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 0.15,
                  ease: "linear",
                },
              }}
            >
              <ArrowUp size={20} strokeWidth={2} />
            </motion.div>

            {/* Sparkle */}
            <Sparkles
              className="scroll-to-top-sparkle"
              size={10}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;