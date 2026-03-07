import { motion, type Variants } from "motion/react";
import {
  StarIcon,
  QuoteIcon,
  SunburstIcon,
  DecorativeCurlLeft,
  DoodleSwirl,
  DoodleFlower,
  DoodleHeart,
  DoodleWave,
  DoodlePlanet,
  DoodleLeaf,
  DoodleStar,
} from "./Doodles";
import { useProfile } from "@/context/ProfileContext";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */

export default function Landing() {
  const { profile } = useProfile();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const doodleVariants: Variants = {
    hidden: { scale: 0, opacity: 0, rotate: -15 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 0.5,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: i * 0.1, // Adding manual staggered delay for doodles
      },
    }),
    hover: {
      scale: 1.1,
      opacity: 1,
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.4 },
    },
  };

  const floatingTransition = {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  } as const;

  const imageVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const backdropVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[70%] bg-[#FD853A]/10 blur-[150px] rounded-full" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[40%] bg-blue-900/10 blur-[130px] rounded-full" />
      </div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full flex flex-col items-center pt-20 md:pt-32 pb-12 px-4"
      >
        {/* Hello! Badge */}
        <motion.div variants={itemVariants} className="relative mb-8 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative inline-flex items-center gap-3 px-7 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <span className="font-sans font-medium text-white/90 text-xl tracking-tight">
              Hello!
            </span>
            <motion.span
              animate={{ rotate: [0, 20, 0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1 }}
              className="text-2xl"
            >
              👋
            </motion.span>
          </motion.div>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-3 -right-10 opacity-70"
          >
            <SunburstIcon />
          </motion.span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-6xl mb-12 relative"
        >
          <h1
            className="font-urbanist font-bold leading-[0.95] tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 10vw, 7.5rem)" }}
          >
            I'm{" "}
            <span className="bg-gradient-to-r from-[#FD853A] via-[#ffb38a] to-[#FD853A] bg-clip-text text-transparent drop-shadow-sm">
              {profile?.full_name?.split(' ')[0] || "Aditya"}
            </span>
            <span className="text-white/20">,</span>
            <br />
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Frontend Architect
            </span>
          </h1>

          {/* Decorative curl below name */}
          <motion.div
            variants={itemVariants}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-30 select-none hidden md:block"
          >
            <DecorativeCurlLeft />
          </motion.div>
        </motion.div>

        {/* Main Interface Layout */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-between gap-16 lg:gap-4 px-4">
          {/* Left: Testimonial */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="hidden lg:flex flex-col gap-6 max-w-[280px] p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-md self-center lg:self-auto mb-32 group"
          >
            <QuoteIcon />
            <p className="font-sans font-medium text-white/50 text-lg leading-relaxed group-hover:text-white/80 transition-colors">
              "{profile?.full_name?.split(' ')[0] || "Aditya"}'s exceptional frontend skills ensure our website's
              success. Highly Recommended"
            </p>
          </motion.div>

          {/* Center: Image & Doodles */}
          <div className="relative flex flex-col items-center flex-1 w-full max-w-[700px]">
            {/* Desktop Doodles */}
            <div className="absolute inset-0 pointer-events-none hidden sm:block">
              {/* Swirl */}
              <motion.div
                variants={doodleVariants}
                custom={1}
                whileHover="hover"
                className="absolute top-[-40px] left-[15%]"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={floatingTransition}
                >
                  <DoodleSwirl className="w-full h-full" />
                </motion.div>
              </motion.div>

              {/* Flower */}
              <motion.div
                variants={doodleVariants}
                custom={2}
                whileHover="hover"
                className="absolute top-[-70px] right-[5%]"
              >
                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                  transition={{
                    y: { ...floatingTransition, delay: 0.5 },
                    rotate: { ...floatingTransition, delay: 0.5 },
                  }}
                >
                  <DoodleFlower className="w-full h-full" />
                </motion.div>
              </motion.div>

              {/* Heart */}
              <motion.div
                variants={doodleVariants}
                custom={3}
                whileHover="hover"
                className="absolute top-[15%] left-[-5%]"
              >
                <DoodleHeart className="w-full h-full" />
              </motion.div>

              {/* Wave */}
              <motion.div
                variants={doodleVariants}
                custom={4}
                whileHover="hover"
                className="absolute bottom-[20%] left-[-8%]"
              >
                <DoodleWave className="w-full h-full" />
              </motion.div>

              {/* Planet */}
              <motion.div
                variants={doodleVariants}
                custom={5}
                whileHover="hover"
                className="absolute top-[25%] right-[-8%]"
              >
                <DoodlePlanet className="w-full h-full" />
              </motion.div>

              {/* Leaf */}
              <motion.div
                variants={doodleVariants}
                custom={6}
                whileHover="hover"
                className="absolute top-[5%] right-[12%]"
              >
                <DoodleLeaf className="w-full h-full" />
              </motion.div>

              {/* Star */}
              <motion.div
                variants={doodleVariants}
                custom={7}
                whileHover="hover"
                className="absolute bottom-[35%] right-[2%]"
              >
                <DoodleStar className="w-full h-full" />
              </motion.div>
            </div>

            {/* Profile Image Container */}
            <div className="relative w-full flex flex-col items-center group">
              <div className="relative z-10 w-full flex justify-center">
                <motion.img
                  variants={imageVariants}
                  src="https://images.pexels.com/photos/33971227/pexels-photo-33971227.jpeg"
                  alt={profile?.full_name || "Aditya Pandey"}
                  className="relative object-cover object-top rounded-t-full shadow-[0_0_60px_rgba(253,133,58,0.1)] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  style={{
                    width: "clamp(240px, 60%, 460px)",
                    height: "clamp(320px, 55vw, 560px)",
                    zIndex: 2,
                    marginBottom: "-2px",
                  }}
                />

                {/* Semicircle Backdrop */}
                <motion.div
                  variants={backdropVariants}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[750px] z-0"
                >
                  <svg
                    viewBox="0 0 812 406"
                    className="w-full drop-shadow-[0_0_30px_rgba(254,178,115,0.2)]"
                  >
                    <path
                      d="M811.779 405.889C541.186 405.889 270.593 405.889 0 405.889C0 181.723 181.723 0 405.889 0C630.056 0 811.779 181.723 811.779 405.889Z"
                      fill="#FD853A"
                      className="opacity-90"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="relative flex gap-4 mt-12 z-20"
              >
                <a 
                  href={profile?.resume_url || "/Aditya_Pandey_Resume.pdf"} 
                  download={`${profile?.full_name || "Aditya_Pandey"}_Resume.pdf`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contents"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#FD853A] text-white font-bold text-lg shadow-[0_10px_30px_rgba(253,133,58,0.3)] hover:shadow-[0_15px_40px_rgba(253,133,58,0.4)] transition-all"
                  >
                    Download CV
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="translate-y-px"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </a>
                
                <Link to="/contact" className="contents">
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(255,255,255,0.08)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 rounded-full border border-white/20 text-white font-semibold backdrop-blur-sm transition-all"
                  >
                    Hire me
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right: Stats */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex flex-col gap-8 items-end mb-32"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex gap-1 bg-white/5 p-3 rounded-2xl border border-white/5"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} />
              ))}
            </motion.div>
            <div className="text-right">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="font-urbanist font-extrabold text-6xl leading-none tracking-tight text-white mb-2"
              >
                {profile?.years_experience || "1+ Years"}
              </motion.p>
              <p className="font-sans text-white/40 text-sm tracking-[0.3em] uppercase font-bold">
                Level of Expertise
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Info */}
        <div className="flex flex-col gap-12 w-full max-w-lg mx-auto px-6 mt-16 lg:hidden">
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 text-center"
          >
            <div className="flex justify-center">
              <QuoteIcon />
            </div>
            <p className="font-sans font-medium text-white/60 text-lg leading-relaxed">
              "{profile?.full_name?.split(' ')[0] || "Aditya"}'s exceptional frontend skills ensure our website's
              success. Highly Recommended"
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <div className="text-center">
              <p className="font-urbanist font-extrabold text-5xl leading-none tracking-tight text-white">
                {profile?.years_experience || "1+ Years"}
              </p>
              <p className="font-sans text-white/40 text-xs tracking-widest uppercase mt-3 font-bold">
                Experience
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom Scroll Decor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block"
      >
        <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </main>
  );
}
