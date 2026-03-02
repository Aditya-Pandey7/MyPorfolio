import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 80% 20%, rgba(252, 161, 125, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(252, 161, 125, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 60%, rgba(252, 161, 125, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(252, 161, 125, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          {/* Left Content */}
          <motion.div style={{ opacity, scale }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
            >
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-white text-sm">
                Available for freelance work
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Creative</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Developer
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl"
            >
              Transforming ideas into stunning digital experiences with
              cutting-edge design and development.
            </motion.p>

            {/* Stats */}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg"
              >
                View Portfolio
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[600px] hidden lg:block"
          >
            {/* Main large image */}
            <motion.div
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-[380px] h-[280px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1771567967255-d770c21a26be?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGFlc3RoZXRpYyUyMG1pbmltYWx8ZW58MXx8fHwxNzcyMDQyMDYxfDA&ixlib=rb-4.1.0&q=75&w=800&utm_source=figma&utm_medium=referral"
                  alt="Creative workspace"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
            </motion.div>

            {/* Second image - bottom left */}
            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-[100px] left-0 w-[300px] h-[240px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1542304807-c7d38f96e2d2?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHdvcmtpbmclMjBsYXB0b3AlMjBjb2ZmZWV8ZW58MXx8fHwxNzcyMDQyMDYyfDA&ixlib=rb-4.1.0&q=75&w=600&utm_source=figma&utm_medium=referral"
                  alt="Designer working"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent" />
            </motion.div>

            {/* Third image - middle right */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[200px] right-[20px] w-[250px] h-[200px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1596716147725-bc96cc16147d?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzIwNDAyMTl8MA&ixlib=rb-4.1.0&q=75&w=500&utm_source=figma&utm_medium=referral"
                  alt="Modern architecture"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
            </motion.div>

            {/* Floating card - small accent */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-[100px] w-[200px] h-[160px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1665764884116-11bf71512155?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGdyYWRpZW50JTIwYWJzdHJhY3QlMjBhcnR8ZW58MXx8fHwxNzcyMDAxNzM2fDA&ixlib=rb-4.1.0&q=75&w=400&utm_source=figma&utm_medium=referral"
                  alt="Abstract gradient"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[50px] left-[50px] w-20 h-20 border-2 border-purple-400/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[200px] left-[150px]"
            >
              <Zap size={32} className="text-yellow-400/50" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-[350px] left-[20px]"
            >
              <Star size={24} className="text-pink-400/50" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
