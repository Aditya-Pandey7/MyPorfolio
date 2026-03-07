import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  MessageCircle,
  Save,
  Loader2,
  Globe,
  FileText,
  Upload,
  X,
  CheckCircle2
} from 'lucide-react';
import { useRef } from 'react';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  whatsapp_number: string;
  resume_url: string;
  years_experience: string;
  bio: string;
  education: string;
}

const ProfileManager = () => {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profile').select('*').single();
    if (error) console.error('Error fetching profile:', error);
    else setProfile(data || {});
    setLoading(false);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file for your resume.');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `resume_${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      setProfile(prev => ({ ...prev, resume_url: publicUrl }));
      alert('Resume uploaded successfully! Click "Update All Settings" to save changes.');
    } catch (error: unknown) {
      alert('Error uploading resume: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await supabase
      .from('profile')
      .update(profile)
      .eq('id', profile.id);

    if (error) {
      alert('Error updating profile: ' + error.message);
    } else {
      alert('Profile updated successfully!');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div className="space-y-6 rounded-2xl bg-zinc-900/40 p-6 border border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-blue-500" size={20} />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Personal Identity</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
              <input
                className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={profile.full_name || ''}
                onChange={e => setProfile({ ...profile, full_name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={profile.email || ''}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={profile.phone || ''}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={profile.location || ''}
                  onChange={e => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800/20">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Education/Degree</label>
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={profile.education || ''}
                  onChange={e => setProfile({ ...profile, education: e.target.value })}
                  placeholder="e.g. BCA Degree..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Level of Expertise (Years)</label>
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                  value={profile.years_experience || ''}
                  onChange={e => setProfile({ ...profile, years_experience: e.target.value })}
                  placeholder="e.g. 1+ Years"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Summary Bio</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none text-sm"
                  value={profile.bio || ''}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="A short professional bio..."
                />
              </div>
            </div>

             <div className="space-y-4 pt-4 border-t border-zinc-800/50">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Manual Resume Upload (PDF)</label>
              
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  accept=".pdf"
                  className="hidden"
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer
                    ${uploading ? 'bg-blue-500/5 border-blue-500/30' : 'bg-zinc-800/30 border-zinc-700/50 hover:border-blue-500/50 hover:bg-zinc-800/50'}
                    ${profile.resume_url ? 'border-emerald-500/30 bg-emerald-500/5' : ''}
                  `}
                >
                  {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={32} className="text-blue-500 animate-spin" />
                      <span className="text-sm font-medium text-blue-400">Uploading Document...</span>
                    </div>
                  ) : profile.resume_url ? (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle2 size={32} className="text-emerald-500" />
                      <span className="text-sm font-bold text-emerald-400">Resume Ready</span>
                      <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[200px]">
                        {profile.resume_url.split('/').pop()}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-blue-400 transition-colors">
                        <Upload size={24} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-zinc-300">Upload New PDF</p>
                        <p className="text-xs text-zinc-500 mt-1">Click to browse files</p>
                      </div>
                    </div>
                  )}
                </div>

                {profile.resume_url && !uploading && (
                   <button 
                   type="button"
                   onClick={(e) => {
                     e.stopPropagation();
                     setProfile({...profile, resume_url: ''});
                   }}
                   className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-500 hover:text-red-400 transition-colors"
                 >
                   <X size={14} />
                 </button>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Active Resume Path</label>
                <div className="flex items-center gap-2 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800 font-mono text-[10px] text-zinc-500">
                  <FileText size={14} className="shrink-0" />
                  <span className="truncate">{profile.resume_url || 'No resume linked'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Presence */}
        <div className="space-y-6 rounded-2xl bg-zinc-900/40 p-6 border border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="text-purple-500" size={20} />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Social Presence</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">GitHub Profile</label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                  value={profile.github_url || ''}
                  onChange={e => setProfile({ ...profile, github_url: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">LinkedIn Profile</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-sm"
                  value={profile.linkedin_url || ''}
                  onChange={e => setProfile({ ...profile, linkedin_url: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Twitter / X Profile</label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-zinc-400/50 transition-all text-sm"
                  value={profile.twitter_url || ''}
                  onChange={e => setProfile({ ...profile, twitter_url: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Instagram Profile</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-sm"
                  value={profile.instagram_url || ''}
                  onChange={e => setProfile({ ...profile, instagram_url: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">WhatsApp Number (No +)</label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                  value={profile.whatsapp_number || ''}
                  onChange={e => setProfile({ ...profile, whatsapp_number: e.target.value })}
                  placeholder="919876543210"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-10 py-4 font-bold text-white transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-600/20"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>Update All Settings</span>
        </button>
      </div>
    </form>
  );
};

export default ProfileManager;
