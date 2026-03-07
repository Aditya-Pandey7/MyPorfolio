import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Code2, Rocket, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";

 function About() {
  const { profile } = useProfile();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative  bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px]"
          >
            {/* Main image */}
            <motion.div
              style={{ y }}
              className="absolute top-0 left-0 w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWVyJTIwY29kaW5nJTIwZGFyayUyMHNldHVwfGVufDF8fHx8MTc3MjA0MzE1Nnww&ixlib=rb-4.1.0&q=75&w=800&utm_source=figma&utm_medium=referral"
                  alt="Developer coding"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
            </motion.div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 right-0 w-[280px] h-[200px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1624948384140-e48e47087fad?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBtdWx0aXBsZSUyMG1vbml0b3JzfGVufDF8fHx8MTc3MTk2MDc5MHww&ixlib=rb-4.1.0&q=75&w=600&utm_source=figma&utm_medium=referral"
                  alt="Developer workspace"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent" />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[100px] right-[50px] w-24 h-24 border-2 border-purple-500/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-[250px] left-[350px]"
            >
              <Code2 size={40} className="text-purple-400/50" />
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-500/20 mb-6"
            >
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-purple-300 text-sm">About Me</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Crafting Digital </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Experiences
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 text-gray-300 text-lg leading-relaxed mb-8"
            >
              <p>
                I'm <span className="text-white font-bold">{profile?.full_name || "Aditya Pandey"}</span>, a
                Frontend Architect based in <span className="text-white">{profile?.location || "Bilaspur, India"}</span>, with a deep-rooted
                passion for building high-performance web applications. {profile?.bio || `My journey in technology started during my ${profile?.education || "BCA at Govt E Raghavendra Rao Science College"}, where I discovered the power of code to transform ideas into extraordinary digital realities.`}
              </p>
              <p>
                Specializing in the <span className="text-purple-400 font-semibold">React ecosystem</span>,
                I focus on creating scalable architectures and buttery-smooth
                user interfaces. I believe that every pixel matters and every
                micro-interaction should tell a story. Whether it's optimizing
                bundle sizes or perfecting state management, I strive for
                technical excellence in every project.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              {[
                { icon: Code2, label: "Clean Code", color: "text-purple-400" },
                {
                  icon: Rocket,
                  label: "Fast Delivery",
                  color: "text-pink-400",
                },
                {
                  icon: Sparkles,
                  label: "Pixel Perfect",
                  color: "text-orange-400",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center p-4 bg-gray-900/50 rounded-xl border border-gray-800"
                >
                  <item.icon size={32} className={`${item.color} mb-2`} />
                  <span className="text-white text-sm font-semibold">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/me">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold flex items-center gap-2 "
                >
                More About Me 
                    <ArrowRight size={20} />
              </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                >
                Let's Talk
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;