import { motion } from "motion/react";
import { Sparkles, Loader2, Code2, Database, Wrench, Shapes } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'others';
  icon_url: string;
  proficiency: number;
}

export function Stack() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('proficiency', { ascending: false });

        if (error) throw error;
        setSkills(data || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  const categories = ['frontend', 'backend', 'tools', 'others'];
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Code2 size={20} />;
      case 'backend': return <Database size={20} />;
      case 'tools': return <Wrench size={20} />;
      default: return <Shapes size={20} />;
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-black">
      <section className="relative min-h-screen py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/20 mb-6"
            >
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm">My Tech Stack</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-white">Skills & </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Technologies
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Tools and technologies I use to bring ideas to life
            </motion.p>
          </div>

          {/* Stack Content */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
          ) : (
            <div className="space-y-16">
              {categories.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat);
                if (catSkills.length === 0) return null;

                return (
                  <div key={cat} className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                        {getCategoryIcon(cat)}
                      </div>
                      <h2 className="text-2xl font-bold text-white capitalize tracking-tight">
                        {cat} <span className="text-gray-600 font-medium text-lg ml-2">{catSkills.length}</span>
                      </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catSkills.map((tech, index) => (
                        <motion.div
                          key={tech.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                        >
                          {/* Icon */}
                          <div className="flex items-start gap-4 mb-4">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              className="w-16 h-16 bg-gray-800/80 rounded-xl flex items-center justify-center p-3 border border-gray-700"
                            >
                              <img
                                src={tech.icon_url}
                                alt={tech.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                {tech.name}
                              </h3>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="space-y-2 mt-auto">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Proficiency</span>
                              <span className="text-blue-400 font-semibold">
                                {tech.proficiency}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${tech.proficiency}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                              />
                            </div>
                          </div>

                          {/* Hover glow effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-teal-500/10 transition-all duration-300 pointer-events-none" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Decorative blur elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl" />
      </section>
    </div>
  );
}

