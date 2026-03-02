import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap, Target, Code2, Sparkles, BookOpen, Star, Briefcase } from "lucide-react";
import { useRef } from "react";

export default function Me() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: backgroundY }}
          animate={{
            background: [
              "radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 40%)",
              "radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%)",
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 40%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none" />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 200}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300 tracking-wider uppercase">Personal Journey</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
            ABOUT <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              MYSELF
            </span>
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" 
          />
        </motion.div>

        {/* Story Section */}
        <div className="space-y-16">
          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl group-hover:bg-purple-600/10 transition-colors" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-xl">
                  <BookOpen className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Introduction</h2>
              </div>
              
              <p className="text-gray-400 leading-relaxed text-xl font-medium">
                Hello! I'm <span className="text-white">Aditya Pandey</span>, a high-performance 
                <span className="text-purple-400"> Frontend Architect</span> dedicated 
                to pushing the boundaries of web experiences. I specialize in crafting 
                dynamic, visually arresting digital landscapes that prioritize speed 
                and pixel-perfect precision.
              </p>
            </div>
          </motion.div>

          {/* Experience Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-md border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="p-4 w-fit rounded-2xl bg-blue-500/10 mb-6">
                <GraduationCap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase">Education</h3>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">BCA Degree</h4>
                <p className="text-blue-400 font-semibold italic text-sm">Govt E Raghavendra Rao Science College</p>
                <p className="text-gray-500 text-sm">Bilaspur, Chhattisgarh, India</p>
              </div>
            </motion.div>

            {/* Background */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-md border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="p-4 w-fit rounded-2xl bg-pink-500/10 mb-6">
                <Target className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase">Background</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Native to <span className="text-white">Bilaspur</span>, my passion 
                for engineering complex digital systems was born from a curiosity 
                about how the web could be more interactive and alive.
              </p>
            </motion.div>
          </div>

          {/* Expertise Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-[3rem] bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10 border border-white/10 group overflow-hidden"
          >
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-40 -right-40 w-96 h-96 border border-white/5 rounded-full pointer-events-none"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-10">
                <div className="p-5 rounded-[2rem] bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-2xl">
                  <Code2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                  Core <br />Expertise
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <p className="text-gray-400 text-lg leading-relaxed font-medium">
                    I build high-performance applications with a focus on 
                    <span className="text-white italic"> scalability and architecture</span>.
                  </p>
                  <div className="flex items-center gap-3 text-white font-bold tracking-widest text-xs uppercase bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10">
                    <Star className="w-4 h-4 text-yellow-400" />
                    React Specialist
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {['State Architecture', 'Component Life-cycles', 'Performance Tuning', 'UI/UX Fluidity'].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-gray-300 font-bold group/item">
                      <div className="w-2 h-2 rounded-full bg-purple-500 group-hover/item:scale-150 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Vision/Goal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 rounded-[3rem] bg-gradient-to-r from-orange-600/10 to-pink-600/10 border border-orange-500/20 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Briefcase className="w-12 h-12 text-orange-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">Visionary Outlook</h2>
            <p className="text-gray-400 leading-relaxed text-xl max-w-2xl mx-auto font-medium">
              I strive to mentor, contribute to the developer ecosystem, and bridge 
              the gap between <span className="text-white">complex engineering</span> and 
              <span className="text-white italic"> human-centric design</span>.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Visual Accents */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
