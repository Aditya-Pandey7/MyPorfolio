import { motion, useScroll, useTransform } from "motion/react";
import { ExternalLink, ArrowRight, Sparkles, Github, Loader2, Code2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url: string;
  live_url: string;
  image_url: string;
  tags: string[];
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden pt-16"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-500/20 mb-6"
          >
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-purple-300 text-sm italic tracking-widest uppercase">Portfolio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-white">Latest </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Work
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            A showcase of my recent projects, combining innovative design with
            powerful functionality
          </motion.p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-purple-500" size={48} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className="group block relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-gray-800">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full"
                    >
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop";
                        }}
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Links in Image Overlay */}
                    <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center border border-white/20 transition-colors shadow-xl"
                          title="View on GitHub"
                        >
                          <Github size={20} className="text-white" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors shadow-xl shadow-purple-500/20"
                          title="Live Demo"
                        >
                          <ExternalLink size={20} className="text-white" />
                        </a>
                      )}
                    </div>

                    {/* Tech Stack Overlay (Bottom Left) */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-medium text-white border border-white/10 uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-medium text-white border border-white/10">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Shine effect on hover */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors tracking-tight uppercase">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        {project.tags?.map(tag => (
                          <span key={tag} className="text-[10px] text-purple-400/70 border border-purple-400/20 px-2 py-0.5 rounded italic">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3 min-h-[4.5rem]">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                          <Code2 size={14} />
                          <span>Built with Modern Stack</span>
                        </div>
                        
                        <a 
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold group/link"
                        >
                          View Case Study
                          <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 origin-left"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Decorative blur elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse" />
    </section>
  );
}

