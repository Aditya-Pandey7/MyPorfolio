import { motion, useScroll, useTransform } from "motion/react";
import TextPressure from "@/reactbits/TextPressure/TextPressure";
import { useTheme } from "@/context/ThemeProvider";
import { useRef } from "react";

function Connect() {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section 
      ref={containerRef}
      id="connect" 
      className="relative  overflow-hidden bg-black"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.12) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center py-20">
          <div className="h-40 md:h-64 flex items-center justify-center">
            <TextPressure
              text="Let's Connect"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor={theme === "dark" ? "#ffffff" : "#ffffff"}
              strokeColor="#a855f7"
              minFontSize={64}
            />
          </div>
        </div>
      </motion.div>

      {/* Extreme Blur Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full filter blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full filter blur-[150px] -z-10" />
    </section>
  );
}

export default Connect;


