import { memo } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

const socialLinks = [
  { icon: Github, href: "https://github.com/Aditya-Pandey7", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-pandey-070447233", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/adi_iox", label: "Twitter" },
  { icon: Mail, href: "mailto:adipandey830@gmail.com", label: "Email" },
];

const Footer = memo(function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className="relative bg-black pt-16 pb-12 overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Copyright Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm font-medium tracking-tight order-2 md:order-1 text-center md:text-left"
        >
          <span className="block mb-1">© {new Date().getFullYear()} MyPortfolio</span>
          <span>
            Crafted with passion by{" "}
            <span className={`font-bold ${theme === "dark" ? "text-white" : "text-black"} transition-colors`}>
              Aditya Pandey
            </span>
          </span>
        </motion.div>

        {/* Social Links Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end gap-6 order-1 md:order-2"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 hover:border-white/10"
            >
              <link.icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Very subtle background ambient glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-[100%] filter blur-[100px] pointer-events-none" />
    </footer>
  );
});

export default Footer;

