// const socialMediaData = [
//   {
//     name: "Twitter",
//     icon: Twitter,
//     link: "https://twitter.com/yourusername",
//   },
//   {
//     name: "LinkedIn",
//     icon: Linkedin,
//     link: "https://linkedin.com/in/yourusername",
//   },
//   {
//     name: "Instagram",
//     icon: Instagram,
//     link: "https://instagram.com/yourusername",
//   },
//   {
//     name: "WhatsApp",
//     icon: MessageCircle,
//     link: "https://wa.me/919171977959",
//   },
// ];

import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "adipandey830@gmail.com",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9171977959",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Bilaspur ,Chattisgarh, India",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "Github",
      href: "https://github.com/Aditya-Pandey7",
      color: "hover:text-purple-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aditya-pandey-070447233",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/adi_iox",
      color: "hover:text-cyan-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:adipandey830@gmail.com",
      color: "hover:text-pink-400",
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-black">
      <section className="relative min-h-screen py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
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
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-500/20 mb-6"
            >
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-purple-300 text-sm">Get In Touch</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-white">Let's Work </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Together
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Have a project in mind? Let's create something amazing together
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Project Discussion"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all"
                    >
                      <div className={`${info.bgColor} p-3 rounded-lg`}>
                        <Icon size={24} className={info.color} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{info.title}</p>
                        <p className="text-white font-semibold">{info.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50"
              >
                <h4 className="text-xl font-bold text-white mb-4">
                  Connect With Me
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600 text-gray-300 ${social.color} transition-all`}
                      >
                        <Icon size={20} />
                        <span className="font-semibold">{social.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-6 bg-gradient-to-br from-green-900/20 to-gray-900/50 rounded-2xl border border-green-500/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-green-500 rounded-full"
                  />
                  <span className="text-green-400 font-semibold">
                    Available for work
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Currently accepting new projects and collaborations. Let's
                  build something great together!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative blur elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl" />
      </section>
    </div>
  );
}
