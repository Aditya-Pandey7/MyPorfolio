import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  ExternalLink, 
  Github,
  Loader2,
  Image as ImageIcon,
  Upload,
  X
} from 'lucide-react';

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

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    github_url: '',
    live_url: '',
    image_url: '',
    tags: []
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data || []);
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
        .from('projects')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      setCurrentProject(prev => ({ ...prev, image_url: publicUrl }));
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

    const projectData = {
      ...currentProject,
      technologies: typeof currentProject.technologies === 'string' 
        ? (currentProject.technologies as string).split(',').map(s => s.trim())
        : currentProject.technologies,
      tags: typeof currentProject.tags === 'string'
        ? (currentProject.tags as string).split(',').map(s => s.trim())
        : currentProject.tags
    };

    if (currentProject.id) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', currentProject.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([projectData]);
      if (error) alert(error.message);
    }

    setIsEditing(false);
    resetForm();
    fetchProjects();
  };

  const resetForm = () => {
    setCurrentProject({
      title: '',
      description: '',
      technologies: [],
      github_url: '',
      live_url: '',
      image_url: '',
      tags: []
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchProjects();
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-zinc-900/50 p-8 border border-zinc-800/80">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">{currentProject.id ? 'Edit Project' : 'New Project'}</h3>
            <button 
              type="button" 
              onClick={() => { setIsEditing(false); resetForm(); }}
              className="p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Project Title</label>
                <input
                  required
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={currentProject.title}
                  onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                  placeholder="Ex: E-commerce Dashboard"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Description</label>
                <textarea
                  required
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans leading-relaxed"
                  value={currentProject.description}
                  onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                  placeholder="What makes this project special?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Technologies</label>
                  <input
                    className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={Array.isArray(currentProject.technologies) ? currentProject.technologies.join(', ') : currentProject.technologies}
                    onChange={e => setCurrentProject({ ...currentProject, technologies: e.target.value as unknown as string[] })}
                    placeholder="React, Next.js, etc."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Tags</label>
                  <input
                    className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={Array.isArray(currentProject.tags) ? currentProject.tags.join(', ') : currentProject.tags}
                    onChange={e => setCurrentProject({ ...currentProject, tags: e.target.value as unknown as string[] })}
                    placeholder="Frontend, Fullstack"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">GitHub URL</label>
                  <input
                    className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={currentProject.github_url}
                    onChange={e => setCurrentProject({ ...currentProject, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Live Demo URL</label>
                  <input
                    className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={currentProject.live_url}
                    onChange={e => setCurrentProject({ ...currentProject, live_url: e.target.value })}
                    placeholder="https://project.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-zinc-400">Project Thumbnail</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center min-h-[300px] w-full rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-800/20 hover:bg-zinc-800/40 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Uploading Media...</p>
                  </div>
                ) : currentProject.image_url ? (
                  <>
                    <img src={currentProject.image_url} alt="Thumbnail preview" className="h-full w-full object-cover p-2" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={32} className="text-white" />
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Change Thumbnail</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 p-8 text-center">
                    <div className="p-5 rounded-full bg-zinc-800 text-zinc-500 group-hover:text-blue-500 transition-colors">
                      <Upload size={32} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-zinc-300">Upload Project Image</p>
                      <p className="text-sm text-zinc-500 mt-2 mx-auto max-w-[200px]">Click to browse or drag and drop your project screenshot</p>
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

          <div className="flex gap-4 pt-6 border-t border-zinc-800">
            <button
              type="submit"
              disabled={uploading}
              className="px-10 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {currentProject.id ? 'Update Project' : 'Publish Project'}
            </button>
            <button
              type="button"
              onClick={() => { setIsEditing(false); resetForm(); }}
              className="px-10 py-4 rounded-xl bg-zinc-800 text-zinc-400 font-bold hover:bg-zinc-700 hover:text-white transition-all text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/10 text-zinc-500 hover:bg-zinc-800/30 hover:text-zinc-300 transition-all group lg:col-span-2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-all">
              <Plus size={32} />
            </div>
            <div className="text-center">
              <span className="block font-bold text-xl uppercase tracking-wider">New Project Entry</span>
              <span className="text-sm text-zinc-600 group-hover:text-zinc-500">Add a new showcase to your portfolio</span>
            </div>
          </button>

          {projects.map(project => (
            <div key={project.id} className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-blue-500/30 hover:bg-zinc-900/60 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative h-40 w-full sm:w-48 shrink-0 overflow-hidden rounded-xl bg-zinc-800 border border-zinc-800 shadow-inner">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-700">
                      <ImageIcon size={40} />
                    </div>
                  )}
                  {project.tags && project.tags.length > 0 && (
                     <div className="absolute top-2 left-2 flex gap-1">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-md uppercase tracking-tighter shadow-lg">
                          {project.tags[0]}
                        </span>
                     </div>
                  )}
                </div>
                
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div>
                    <h4 className="text-2xl font-bold text-white drop-shadow-md line-clamp-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h4>
                    <p className="mt-2 text-sm text-zinc-500 line-clamp-2 leading-relaxed font-sans">{project.description}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                       {project.technologies?.slice(0, 3).map((tech, i) => (
                         <span key={i} className="text-[10px] font-bold text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-full uppercase tracking-widest border border-zinc-700/50">
                           {tech}
                         </span>
                       ))}
                       {project.technologies?.length > 3 && (
                         <span className="text-[10px] font-bold text-zinc-600 px-1 py-1">+{project.technologies.length - 3}</span>
                       )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-3">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" className="p-2.5 text-zinc-400 hover:text-white bg-zinc-800/50 rounded-xl transition-all hover:scale-110" title="Source Code">
                          <Github size={20} />
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" className="p-2.5 text-zinc-400 hover:text-white bg-zinc-800/50 rounded-xl transition-all hover:scale-110" title="Live Demo">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => {
                          setCurrentProject(project);
                          setIsEditing(true);
                        }}
                        className="p-3 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all hover:scale-105"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all hover:scale-105"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;

