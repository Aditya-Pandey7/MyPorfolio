import { motion } from "motion/react";
import { Calendar, ArrowRight, Sparkles, Loader2, BookOpen, ExternalLink, Link as LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  external_url: string;
  tags: string[];
  published_at: string;
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-black text-white font-sans">
      <section className="relative min-h-screen py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-orange-500/10 backdrop-blur-xl rounded-full border border-orange-500/20 mb-8"
            >
              <Sparkles size={16} className="text-orange-400" />
              <span className="text-orange-300 text-sm font-bold uppercase tracking-widest">Digital Chronicles</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase"
            >
              LATEST <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                INSIGHTS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              Exploring the frontiers of technology, design, and creative coding through in-depth articles and tutorials.
            </motion.p>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-40">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-orange-500" size={48} />
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Decrypting data...</p>
              </div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -12 }}
                  className="group relative bg-zinc-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-zinc-800">
                    {post.cover_image ? (
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-700">
                        <BookOpen size={64} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

                    {/* Meta Badge */}
                    <div className="absolute top-6 left-6 flex gap-2">
                        {post.tags?.slice(0, 1).map((tag, i) => (
                            <span key={i} className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                            {tag}
                            </span>
                        ))}
                    </div>

                    {/* Link Icon */}
                    <div className="absolute top-6 right-6">
                        <div className="p-2.5 rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/20 group-hover:scale-110 transition-transform">
                           {post.external_url ? <ExternalLink size={16} /> : <LinkIcon size={16} />}
                        </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 pt-6">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-orange-500" />
                        <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="h-1 w-1 rounded-full bg-zinc-800" />
                    
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer Action */}
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <a
                        href={post.external_url || `/blog/${post.slug}`}
                        target={post.external_url ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-white group/btn"
                      >
                        <span className="text-xs font-black uppercase tracking-tighter">Read Full Story</span>
                        <div className="p-2 rounded-full bg-zinc-800 group-hover/btn:bg-orange-500 group-hover/btn:translate-x-1 transition-all duration-300">
                           <ArrowRight size={14} />
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-40">
                <BookOpen size={48} className="mx-auto text-zinc-800 mb-6" />
                <h2 className="text-2xl font-bold text-zinc-500">No articles found.</h2>
                <p className="text-zinc-600 mt-2">Check back later for fresh content!</p>
            </div>
          )}
        </div>

        {/* Decorative blur elements */}
        <div className="absolute top-1/4 -left-20 w-[30rem] h-[30rem] bg-orange-500/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-red-500/5 rounded-full filter blur-[100px]" />
      </section>
    </div>
  );
}

