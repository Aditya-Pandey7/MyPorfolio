import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { motion } from "motion/react";
import { MessageSquare, Send, Star, Zap } from "lucide-react";

function ShareIdea() {      
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
      className="relative min-h-[80vh] py-32 overflow-hidden bg-black"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-24">

          

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Transforming bold ideas into extraordinary digital realities. 
            I'm currently available for freelance work and new opportunities.
          </motion.p>
        </div>

     
       
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group rounded-[3rem] overflow-hidden p-[2px]"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 animate-gradient-xy opacity-80" />
          
          <div className="relative bg-[#050505] rounded-[2.9rem] px-10 py-16 md:py-24 text-center overflow-hidden">
            {/* Background elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -left-20 w-80 h-80 border-2 border-purple-500/10 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-purple-500/10 to-transparent pointer-events-none"
            />

            <div className="relative z-10">
              <div className="flex justify-center gap-6 mb-10">
                <Zap size={40} className="text-yellow-400 animate-pulse" />
                <MessageSquare size={40} className="text-purple-400" />
                <Star size={40} className="text-pink-400 animate-spin-slow" />
              </div>

              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                READY TO START <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  A NEW PROJECT?
                </span>
              </h2>

              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
                Let's collaborate to build something that stands out in the digital landscape.
              </p>

              <motion.a
                href="mailto:your@email.com"
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-black text-lg shadow-2xl transition-all duration-300"
              >
                KICKSTART A PROJECT
                <Send size={24} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Extreme Blur Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full filter blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full filter blur-[150px] -z-10" />
    </section>
  )
}

export default ShareIdea