import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-9xl font-black bg-gradient-to-br from-[#FD853A] to-blue-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-bold text-white mt-4 mb-6">Page Not Found</h2>
        <p className="text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/10 transition-colors"
          >
            Return Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
