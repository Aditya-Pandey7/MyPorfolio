import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Code2,
  Database,
  Wrench,
  Shapes,
  Loader2,
  Image as ImageIcon,
  Upload,
  X
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'others';
  icon_url: string;
  proficiency: number;
}

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({
    name: '',
    category: 'frontend',
    proficiency: 0,
    icon_url: ''
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setSkills(data || []);
    setLoading(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from('skills')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('skills')
        .getPublicUrl(filePath);

      setCurrentSkill(prev => ({ ...prev, icon_url: publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (currentSkill.id) {
      await supabase.from('skills').update(currentSkill).eq('id', currentSkill.id);
    } else {
      await supabase.from('skills').insert([currentSkill]);
    }

    setIsEditing(false);
    setCurrentSkill({ name: '', category: 'frontend', proficiency: 0, icon_url: '' });
    fetchSkills();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this skill?')) {
      // If the icon is in our storage, we could delete it here too
      // For now, just delete the database record
      await supabase.from('skills').delete().eq('id', id);
      fetchSkills();
    }
  };

  const categories = ['frontend', 'backend', 'tools', 'others'];

  if (loading && skills.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-zinc-900/50 p-8 border border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{currentSkill.id ? 'Edit Skill' : 'New Skill'}</h3>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Skill Name</label>
                <input
                  required
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                  value={currentSkill.name}
                  onChange={e => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                  placeholder="Ex: React.js"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Category</label>
                <select
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer appearance-none px-4"
                  value={currentSkill.category}
                  onChange={e => setCurrentSkill({ ...currentSkill, category: e.target.value as unknown as 'frontend' | 'backend' | 'tools' | 'others' })}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-zinc-900 border-none">{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Proficiency (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                  value={currentSkill.proficiency}
                  onChange={e => setCurrentSkill({ ...currentSkill, proficiency: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-zinc-400">Skill Icon (Image or GIF)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center h-48 w-full rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-800/20 hover:bg-zinc-800/40 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-blue-500" size={32} />
                    <p className="text-xs text-zinc-500">Uploading...</p>
                  </div>
                ) : currentSkill.icon_url ? (
                  <>
                    <img src={currentSkill.icon_url} alt="Preview" className="h-full w-full object-contain p-4" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={24} className="text-white" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Change Image</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-4 text-center">
                    <div className="p-4 rounded-full bg-zinc-800 text-zinc-500 group-hover:text-blue-500 transition-colors">
                      <Upload size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-300">Click to upload image</p>
                      <p className="text-xs text-zinc-500 mt-1 uppercase tracking-tight">SVG, PNG, JPG or GIF</p>
                    </div>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-zinc-800">
            <button type="submit" disabled={uploading} className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">
              Save Skill
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl bg-zinc-800 px-8 py-3 font-bold text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all shadow-sm">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
           <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl bg-blue-600/10 text-blue-500 px-5 py-3 font-semibold hover:bg-blue-600/20 transition-all group"
            >
                <Plus size={20} className="transition-transform group-hover:rotate-90 duration-300" />
                <span>Add Skill</span>
            </button>

          {categories.map(cat => {
            const catSkills = skills.filter(s => s.category === cat);
            if (catSkills.length === 0) return null;
            
            const Icon = cat === 'frontend' ? Code2 : cat === 'backend' ? Database : cat === 'tools' ? Wrench : Shapes;

            return (
              <div key={cat} className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-400 pb-2 border-b border-zinc-800/60">
                  <Icon size={22} className="text-zinc-500 opacity-60" />
                  <h4 className="text-lg font-bold tracking-wide capitalize">{cat}</h4>
                  <span className="text-xs bg-zinc-800 text-zinc-500 px-2.5 py-1 rounded-full">{catSkills.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.map(skill => (
                    <div key={skill.id} className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all hover:border-blue-500/30 hover:bg-zinc-900/60 shadow-md">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-zinc-800 p-2 flex items-center justify-center border border-zinc-700 group-hover:border-blue-500/50 transition-colors">
                            {skill.icon_url ? (
                              <img src={skill.icon_url} alt={skill.name} className="h-full w-full object-contain" />
                            ) : (
                              <ImageIcon size={20} className="text-zinc-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{skill.name}</p>
                            <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-1 opacity-70">Level: {skill.proficiency}%</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button onClick={() => { setCurrentSkill(skill); setIsEditing(true); }} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete(skill.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                      </div>
                      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-800 border border-zinc-700/50">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-1000 group-hover:from-blue-600 group-hover:to-blue-400" 
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SkillsManager;


