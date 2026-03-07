import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Loader2,
  Calendar,
  Building2
} from 'lucide-react';

interface Experience {
  id: string;
  company_name: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string | null;
  technologies: string[];
}

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<Partial<Experience>>({
    company_name: '',
    role: '',
    description: '',
    start_date: '',
    end_date: null,
    technologies: []
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('experiences').select('*').order('start_date', { ascending: false });
    if (error) console.error(error);
    else setExperiences(data || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const expData = {
      ...currentExp,
      technologies: typeof currentExp.technologies === 'string' 
        ? (currentExp.technologies as string).split(',').map(s => s.trim())
        : currentExp.technologies
    };

    if (currentExp.id) {
      await supabase.from('experiences').update(expData).eq('id', currentExp.id);
    } else {
      await supabase.from('experiences').insert([expData]);
    }

    setIsEditing(false);
    setCurrentExp({ company_name: '', role: '', description: '', start_date: '', end_date: null, technologies: [] });
    fetchExperiences();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this experience?')) {
      await supabase.from('experiences').delete().eq('id', id);
      fetchExperiences();
    }
  };

  if (loading && experiences.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-zinc-900/50 p-8 border border-zinc-800 shadow-xl">
          <h3 className="text-xl font-bold">{currentExp.id ? 'Edit Experience' : 'New Experience'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Company Name</label>
              <input
                required
                className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                value={currentExp.company_name}
                onChange={e => setCurrentExp({ ...currentExp, company_name: e.target.value })}
                placeholder="Ex: Google"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Role</label>
              <input
                required
                className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                value={currentExp.role}
                onChange={e => setCurrentExp({ ...currentExp, role: e.target.value })}
                placeholder="Ex: Senior Frontend Developer"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Start Date</label>
              <input
                type="date"
                required
                className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer appearance-none px-4"
                value={currentExp.start_date}
                onChange={e => setCurrentExp({ ...currentExp, start_date: e.target.value })}
              />
            </div>
            <div className="space-y-2 text-zinc-400">
              <label className="text-sm font-medium">End Date (Leave blank if currently working)</label>
              <input
                type="date"
                className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer px-4 appearance-none"
                value={currentExp.end_date || ''}
                onChange={e => setCurrentExp({ ...currentExp, end_date: e.target.value || null })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-400">Responsibilities</label>
              <textarea
                className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={currentExp.description}
                onChange={e => setCurrentExp({ ...currentExp, description: e.target.value })}
                placeholder="Describe your role and impact..."
              />
            </div>
             <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-400">Technologies (comma separated)</label>
              <input
                className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                value={Array.isArray(currentExp.technologies) ? (currentExp.technologies as string[]).join(', ') : (currentExp.technologies as unknown as string) || ''}
                onChange={e => setCurrentExp({ ...currentExp, technologies: e.target.value as unknown as string[] })}
                placeholder="Ex: Next.js, TypeScript, Docker, CI/CD"
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">Save Experience</button>
            <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl bg-zinc-800 px-8 py-3 font-bold text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all shadow-sm">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-6">
            <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl bg-blue-600/10 text-blue-500 px-5 py-3 font-semibold hover:bg-blue-600/20 transition-all group border border-blue-600/20"
            >
                <Plus size={20} className="transition-transform group-hover:rotate-90 duration-300" />
                <span>Add Professional Experience</span>
            </button>

          {experiences.map(exp => (
            <div key={exp.id} className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-blue-500/30 hover:bg-zinc-900/60 shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-800 border border-zinc-800 shadow-md flex items-center justify-center p-2">
                        <Building2 size={24} className="text-blue-500 opacity-60" />
                    </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white tracking-tight drop-shadow-sm line-clamp-1">{exp.role}</h4>
                  <div className="flex items-center gap-2 text-zinc-400 font-medium">
                    <span className="text-blue-400">{exp.company_name}</span>
                    <span className="opacity-40">•</span>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                      <Calendar size={14} className="opacity-80" />
                      <span>{new Date(exp.start_date).toLocaleDateString()} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}</span>
                    </div>
                  </div>
                </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setCurrentExp(exp); setIsEditing(true); }} className="p-2.5 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(exp.id)} className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
               <div className="mt-5 space-y-4">
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies?.map(tech => (
                      <span key={tech} className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-full border border-zinc-700/50">{tech}</span>
                    ))}
                  </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
