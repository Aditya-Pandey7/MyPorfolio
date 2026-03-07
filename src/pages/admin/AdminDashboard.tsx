import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Terminal, 
  BookText, 
  Mail, 
  LogOut,
  Plus
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

import ProjectsManager from '@/components/admin/sections/ProjectsManager';
import SkillsManager from '@/components/admin/sections/SkillsManager';
import ExperienceManager from '@/components/admin/sections/ExperienceManager';
import BlogManager from '@/components/admin/sections/BlogManager';
import ContactsManager from '@/components/admin/sections/ContactsManager';
import ProfileManager from '@/components/admin/sections/ProfileManager';
import { Settings } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

// Dashboard Overview Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => (
  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:bg-zinc-900/60 shadow-lg group">
    <div className="flex items-center justify-between gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${color}-600/10 text-${color}-500 shadow-inner group-hover:scale-110 transition-all`}>
        <Icon size={24} />
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{label}</p>
        <h4 className="text-3xl font-bold text-white mt-1 tabular-nums">{value}</h4>
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  const [stats, setStats] = useState({ projects: 0, skills: 0, blogs: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: sCount } = await supabase.from('skills').select('*', { count: 'exact', head: true });
      const { count: bCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });
      const { count: mCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
      setStats({ projects: pCount || 0, skills: sCount || 0, blogs: bCount || 0, messages: mCount || 0 });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-10 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard label="Projects" value={stats.projects} icon={Briefcase} color="blue" />
        <StatCard label="Skills" value={stats.skills} icon={Terminal} color="purple" />
        <StatCard label="Blog Posts" value={stats.blogs} icon={BookText} color="amber" />
        <StatCard label="Inquiries" value={stats.messages} icon={Mail} color="emerald" />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-md shadow-2xl">
          <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome Back, Admin 👋</h3>
          <p className="text-zinc-400 font-medium leading-relaxed max-w-2xl">
            You are now in full control of your portfolio content. Here you can add new professional experiences, showcase your latest coding projects, share insights through blogs, and manage incoming messages from potential clients or collaborators.
          </p>
           <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-zinc-800/60">
                <button className="rounded-xl bg-blue-600/10 text-blue-500 px-5 py-2.5 text-sm font-bold border border-blue-600/20 hover:bg-blue-600/20 transition-all">Quick Project Add</button>
                <button className="rounded-xl bg-zinc-800/80 text-zinc-400 px-5 py-2.5 text-sm font-bold border border-zinc-700/50 hover:bg-zinc-800 transition-all">View Site Analytics</button>
           </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/40 to-zinc-950 p-6 flex flex-col justify-between group overflow-hidden relative shadow-md">
            <div className="absolute top-[-20%] right-[-10%] opacity-10 blur-3xl group-hover:opacity-20 transition-all duration-1000">
                <div className="h-64 w-64 rounded-full bg-blue-600 blur-3xl"></div>
            </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2 drop-shadow-md">Portfolio Health</h4>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">System is running efficiently with latest Supabase integration and RLS policies active.</p>
          </div>
          <div className="mt-8 space-y-4 relative z-10">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                <span>Database Connectivity</span>
                <span className="text-emerald-500 flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>Optimal</span>
            </div>
             <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                <span>Asset Storage</span>
                <span className="text-amber-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ActiveTab = 'dashboard' | 'projects' | 'skills' | 'experience' | 'blogs' | 'contacts' | 'settings';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Terminal },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'blogs', label: 'Blogs', icon: BookText },
    { id: 'contacts', label: 'Contacts', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome />;
      case 'projects': return <ProjectsManager />;
      case 'skills': return <SkillsManager />;
      case 'experience': return <ExperienceManager />;
      case 'blogs': return <BlogManager />;
      case 'contacts': return <ContactsManager />;
      case 'settings': return <ProfileManager />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 font-sans text-white selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-72 border-r border-zinc-800/40 bg-zinc-900/5 backdrop-blur-2xl flex flex-col relative z-20">
        <div className="flex items-center gap-4 p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <LayoutDashboard size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">ADMIN<span className="text-blue-500">HUB</span></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 mt-1">Control Center</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2 px-6 overflow-y-auto py-4">
          <div className="px-3 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Main Menu</p>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-500 ease-out ${
                activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-blue-500/20' 
                : 'text-zinc-500 hover:bg-zinc-800/40 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-all duration-500 ${activeTab === item.id ? 'bg-blue-500/20 text-blue-400' : 'bg-transparent group-hover:bg-zinc-800'}`}>
                   <item.icon size={18} />
                </div>
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              {activeTab === item.id && (
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/50 p-4 mb-4">
            <p className="text-[11px] font-medium text-zinc-500 leading-relaxed text-center italic">"Simplicity is the soul of efficiency."</p>
          </div>
          <button 
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-2xl px-5 py-4 text-zinc-500 transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20"
          >
            <div className="p-2 rounded-xl bg-zinc-800 group-hover:bg-red-500/20 transition-all">
               <LogOut size={18} />
            </div>
            <span className="font-bold text-sm tracking-wide">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.05),transparent_40%)] relative">
        <header className="flex h-24 items-center justify-between border-b border-zinc-800/40 px-10 bg-zinc-950/40 backdrop-blur-xl sticky top-0 z-10 transition-all duration-300">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black capitalize tracking-tight text-white drop-shadow-sm">{activeTab}</h1>
            <div className="flex items-center gap-2 mt-1">
               <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
               <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Management System / <span className="text-zinc-300">{activeTab}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2.5 rounded-2xl bg-white text-black px-6 py-3 font-bold transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5">
              <Plus size={18} strokeWidth={3} />
              <span>Create New</span>
            </button>
          </div>
        </header>

        <div className="p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-6rem)]">
          <div className="rounded-[2.5rem] border border-zinc-800/40 bg-zinc-900/5 p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden group min-h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative z-10 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;