import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Trash2, 
  Loader2,
  Mail,
  User,
  Clock,
  MessageSquare,
  Search
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const ContactsManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setContacts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message?')) {
      await supabase.from('contacts').delete().eq('id', id);
      fetchContacts();
    }
  };

  if (loading && contacts.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-4 border-b border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            placeholder="Search messages..." 
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          />
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
            <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50">{contacts.length} Total Messages</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {contacts.map(contact => (
          <div key={contact.id} className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-blue-500/20 hover:bg-zinc-900/60 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3 xl:w-1/4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center border border-blue-500/20 shadow-inner">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight leading-tight">{contact.name}</h4>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium uppercase tracking-wider mt-0.5 opacity-80">
                        <Mail size={12} className="shrink-0" />
                        <span>{contact.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium pt-1">
                    <Clock size={16} className="opacity-60" />
                    <span>{new Date(contact.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex-1 rounded-xl bg-zinc-950/40 border border-zinc-800 p-5 shadow-inner">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                    <MessageSquare size={14} />
                    <span>User Message</span>
                </div>
                <p className="text-zinc-300 leading-relaxed font-sans">{contact.message}</p>
              </div>

              <div className="hidden lg:flex shrink-0">
                <button 
                  onClick={() => handleDelete(contact.id)}
                  className="h-12 w-12 flex items-center justify-center text-red-400 hover:bg-red-500/10 rounded-2xl transition-all border border-red-500/10 group-hover:border-red-500/30 shadow-sm"
                  title="Delete message"
                >
                  <Trash2 size={22} className="transition-transform group-hover:rotate-12" />
                </button>
              </div>
               <button 
                onClick={() => handleDelete(contact.id)}
                className="lg:hidden flex w-full items-center justify-center gap-2 py-3 mt-2 text-red-500 bg-red-500/5 rounded-xl border border-red-500/10 transition-colors"
              >
                  <Trash2 size={18} />
                  <span>Delete Message</span>
              </button>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <Mail size={48} className="opacity-20 mb-4" />
            <p className="text-lg font-medium opacity-60">No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsManager;
