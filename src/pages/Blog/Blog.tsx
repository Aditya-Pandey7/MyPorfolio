import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "How React Works Under the Hood",
    date: "Aug 3, 2025",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    excerpt:
      "An in-depth look at how React operates internally, including DOM its virtual DOM and reconciliation process , React Fiber , Diffing Algorithms .",
    link: "https://medium.com/@captain-adi/how-react-works-under-the-hood-683ce807d1df",
  },
  {
    title: "Setup react-router-dom",
    date: "Aug 26, 2024",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    excerpt:
      "A guide on how to set up react-router-dom in your React application in an efficient way for your large-scale applications.",
    link: "https://medium.com/@captain-adi/️setup-react-router-7e240c5b1264",
  },
  {
    title: "Send Form Data from Frontend to Backend",
    date: "Mar 11, 2025",
    category: "MERN Stack",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    excerpt:
      "Learn how to send form data from your React frontend to a backend server in MERN stack.",
    link: "https://medium.com/@captain-adi/how-to-send-data-from-frontend-to-backend-using-a-form-39413f165e46",
  },
];

// const blogPosts = [
//   {
//     title: "Getting Started with React 19",
//     excerpt:
//       "Explore the latest features and improvements in React 19, including automatic batching, transitions, and more.",
//     date: "Feb 20, 2026",
//     readTime: "5 min read",
//     category: "React",
//     image:
//       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
//   },
//   {
//     title: "Mastering Tailwind CSS",
//     excerpt:
//       "Learn how to build beautiful, responsive designs with Tailwind CSS utility classes and custom configurations.",
//     date: "Feb 18, 2026",
//     readTime: "8 min read",
//     category: "CSS",
//     image:
//       "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop",
//   },
//   {
//     title: "Building Scalable APIs with Node.js",
//     excerpt:
//       "Best practices for creating robust, scalable REST APIs using Node.js and Express.js framework.",
//     date: "Feb 15, 2026",
//     readTime: "10 min read",
//     category: "Backend",
//     image:
//       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
//   },
//   {
//     title: "TypeScript Tips and Tricks",
//     excerpt:
//       "Discover advanced TypeScript patterns and techniques to write more maintainable and type-safe code.",
//     date: "Feb 12, 2026",
//     readTime: "6 min read",
//     category: "TypeScript",
//     image:
//       "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
//   },
//   {
//     title: "Web Performance Optimization",
//     excerpt:
//       "Techniques and strategies to improve your website's loading speed and overall performance.",
//     date: "Feb 10, 2026",
//     readTime: "7 min read",
//     category: "Performance",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
//   },
//   {
//     title: "Modern UI/UX Design Principles",
//     excerpt:
//       "Essential design principles for creating intuitive and engaging user experiences in modern web applications.",
//     date: "Feb 8, 2026",
//     readTime: "9 min read",
//     category: "Design",
//     image:
//       "https://images.unsplash.com/photo-1763833294545-e38e4fab1961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwd3JpdGluZyUyMGNyZWF0aXZlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MjAwODYwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//   },
// ];

export function Blogs() {
  return (
    <div className="pt-16 min-h-screen bg-black">
      <section className="relative min-h-screen py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500/20 mb-6"
            >
              <Sparkles size={16} className="text-orange-400" />
              <span className="text-orange-300 text-sm">Blog & Articles</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-white">Latest </span>
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Thoughts
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Insights, tutorials, and thoughts on web development and design
            </motion.p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-800">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Shine effect */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Read more link */}
                  <div className="flex items-center gap-2 text-orange-400 font-semibold">
                    <Link
                      to={`${post.link}`}
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm">Read More</span>
                    </Link>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 origin-left"
                />
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
            >
              Load More Articles
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative blur elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl" />
      </section>
    </div>
  );
}
