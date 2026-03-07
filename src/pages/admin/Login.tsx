import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FcGoogle } from 'react-icons/fc';
import { LayoutDashboard } from 'lucide-react';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/admin',
      },
    });

    if (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 backdrop-blur-xl">
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-500 shadow-inner">
            <LayoutDashboard size={32} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Admin Login</h2>
          <p className="mt-2 text-zinc-500 font-medium text-center">
            Sign in to access your portfolio management dashboard.
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-800/50 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-500 active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-white"></div>
          ) : (
            <>
              <FcGoogle size={24} />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <p className="text-center text-sm text-zinc-600">
           Only authorized administrators can access this area.
        </p>
      </div>
    </div>
  );
};

export default Login;
