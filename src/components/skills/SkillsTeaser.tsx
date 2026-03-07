import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Skill {
  id: string;
  name: string;
  category: string;
  icon_url: string;
  proficiency: number;
}

function SkillsTeaser() {
  const containerRef = useRef(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('proficiency', { ascending: false })
          .limit(4);

        if (error) throw error;
        setSkills(data || []);
      } catch (error) {
        console.error("Error fetching featured skills:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedSkills();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-24 overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8"
          >
            <Terminal size={16} className="text-purple-400" />
            <span className="text-white/80 text-sm font-medium tracking-wider uppercase">
              Technical Arsenal
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
            EXPERTISE <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              & SKILLSET
            </span>
          </h2>
        </div>

        {/* Skills Grid Teaser */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-purple-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/10 transition-colors" />

                <div className="relative z-10">
                  <div className="p-4 w-fit rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent mb-6">
                    <img
                      src={skill.icon_url}
                      alt={skill.name}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">
                    {skill.name}
                  </h3>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {skill.proficiency}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center">
          <Link to="/stack">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-4 px-10 py-5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <span className="text-white font-black uppercase tracking-tighter text-lg">
                View Full Tech Stack
              </span>
              <div className="p-2 rounded-full bg-purple-500 group-hover:translate-x-2 transition-transform">
                <ArrowRight size={20} className="text-white" />
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Decorative Blur and Grid */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}

export default SkillsTeaser;
