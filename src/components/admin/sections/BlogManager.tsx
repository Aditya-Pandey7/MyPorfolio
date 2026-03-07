import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Loader2,
  Calendar,
  Image as ImageIcon,
  Upload,
  X,
  ExternalLink,
  Link as LinkIcon
} from 'lucide-react';

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

const BlogManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image: '',
    external_url: '',
    tags: [],
    published_at: new Date().toISOString()
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) console.error('Error fetching blogs:', error);
    else setBlogs(data || []);
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
        .from('blogs')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('blogs')
        .getPublicUrl(filePath);

      setCurrentBlog(prev => ({ ...prev, cover_image: publicUrl }));
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

    const blogData = {
      ...currentBlog,
      tags: typeof currentBlog.tags === 'string' 
        ? (currentBlog.tags as string).split(',').map(s => s.trim())
        : currentBlog.tags,
      slug: currentBlog.slug || currentBlog.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    };

    if (currentBlog.id) {
      const { error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', currentBlog.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('blogs')
        .insert([blogData]);
      if (error) alert(error.message);
    }

    setIsEditing(false);
    resetForm();
    fetchBlogs();
  };

  const resetForm = () => {
    setCurrentBlog({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      cover_image: '',
      external_url: '',
      tags: [],
      published_at: new Date().toISOString()
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchBlogs();
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-zinc-900/50 p-8 border border-zinc-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">{currentBlog.id ? 'Edit Blog Post' : 'New Blog Post'}</h3>
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
                <label className="text-sm font-medium text-zinc-400">Post Title</label>
                <input
                  required
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  value={currentBlog.title}
                  onChange={e => {
                    const title = e.target.value;
                    setCurrentBlog({ 
                      ...currentBlog, 
                      title, 
                      slug: currentBlog.id ? currentBlog.slug : generateSlug(title) 
                    });
                  }}
                  placeholder="Ex: Master React in 10 Minutes"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Slug</label>
                  <input
                    className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono text-sm"
                    value={currentBlog.slug}
                    onChange={e => setCurrentBlog({ ...currentBlog, slug: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Publish Date</label>
                  <input
                    type="date"
                    className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                    value={currentBlog.published_at?.split('T')[0]}
                    onChange={e => setCurrentBlog({ ...currentBlog, published_at: new Date(e.target.value).toISOString() })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Excerpt (Short description)</label>
                <textarea
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white min-h-[80px] focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm leading-relaxed"
                  value={currentBlog.excerpt}
                  onChange={e => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                  placeholder="Summarize your post for the grid view..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">External URL (Medium, Dev.to, etc.)</label>
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  value={currentBlog.external_url}
                  onChange={e => setCurrentBlog({ ...currentBlog, external_url: e.target.value })}
                  placeholder="https://medium.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Tags (comma separated)</label>
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  value={Array.isArray(currentBlog.tags) ? (currentBlog.tags as string[]).join(', ') : (currentBlog.tags as unknown as string) || ''}
                  onChange={e => setCurrentBlog({ ...currentBlog, tags: e.target.value as unknown as string[] })}
                  placeholder="React, Frontend, WebDev"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-zinc-400">Cover Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center min-h-[200px] w-full rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-800/20 hover:bg-zinc-800/40 hover:border-orange-500/50 transition-all cursor-pointer overflow-hidden"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-orange-500" size={40} />
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Processing Image...</p>
                  </div>
                ) : currentBlog.cover_image ? (
                  <>
                    <img src={currentBlog.cover_image} alt="Cover preview" className="h-64 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={32} className="text-white" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Replace Cover</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 p-8 text-center">
                    <div className="p-4 rounded-full bg-zinc-800 text-zinc-500 group-hover:text-orange-500 transition-colors">
                      <Upload size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-300">Upload Cover Image</p>
                      <p className="text-xs text-zinc-600 mt-1">Recommended size: 1200x630px</p>
                    </div>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Full Content (Markdown)</label>
                <textarea
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 text-white min-h-[220px] focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-sans leading-relaxed text-sm"
                  value={currentBlog.content}
                  onChange={e => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  placeholder="The full story goes here if no external URL is provided..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-zinc-800/50">
            <button
              type="submit"
              disabled={uploading}
              className="px-10 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50"
            >
              {currentBlog.id ? 'Save Changes' : 'Publish Article'}
            </button>
            <button
              type="button"
              onClick={() => { setIsEditing(false); resetForm(); }}
              className="px-8 py-3 rounded-xl bg-zinc-800 text-zinc-400 font-bold hover:bg-zinc-700 hover:text-white transition-all"
            >
              Discard
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/10 text-zinc-500 hover:bg-zinc-800/30 hover:text-orange-500 hover:border-orange-500/30 transition-all group lg:col-span-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-zinc-500 group-hover:scale-110 group-hover:bg-orange-600/20 group-hover:text-orange-500 transition-all">
              <Plus size={24} />
            </div>
            <div className="text-center">
              <span className="block font-bold uppercase tracking-wider">New Blog Post</span>
              <span className="text-xs text-zinc-600 group-hover:text-zinc-500">Draft a new article for your readers</span>
            </div>
          </button>

          {blogs.map(blog => (
            <div key={blog.id} className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all hover:border-orange-500/30 hover:bg-zinc-900/60 shadow-xl">
              <div className="flex gap-5">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-800 border border-zinc-800">
                  {blog.cover_image ? (
                    <img src={blog.cover_image} alt={blog.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-700">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    {blog.external_url ? (
                        <ExternalLink size={12} className="text-orange-400" />
                    ) : (
                        <LinkIcon size={12} className="text-blue-400" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h4 className="text-lg font-bold text-white truncate group-hover:text-orange-400 transition-colors uppercase tracking-tight">{blog.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500 font-medium">
                        <Calendar size={12} className="text-zinc-600" />
                        <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                        <span className="opacity-30">•</span>
                        <span className="truncate italic">/{blog.slug}</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-500 line-clamp-2 leading-relaxed">{blog.excerpt || 'No excerpt provided...'}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-1.5">
                        {blog.tags?.slice(0, 3).map((tag, i) => (
                           <span key={i} className="text-[9px] font-bold text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50 uppercase">
                             {tag}
                           </span>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => {
                          setCurrentBlog(blog);
                          setIsEditing(true);
                        }}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                        title="Edit Post"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
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

export default BlogManager;

