"use client";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

type Mural = {
  id: number;
  title: string;
  description: string;
  media: string[];
};

export default function AdminPage() {
  const [murals, setMurals] = useState<Mural[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMurals = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) return;
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from('murals')
        .select('id, title, description, media')
        .order('created_at', { ascending: false });
      if (!error && data) setMurals(data);
      setLoading(false);
    };
    fetchMurals();
  }, []);

  return (
    <main className="min-h-screen bg-stucco p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Quick Links Card */}
      <section className="w-full max-w-xl bg-white rounded-lg shadow-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/leahmartin-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 rounded hover:bg-sea-life/20 border border-sea-life text-sea-life font-semibold transition focus:outline-none focus:ring-2 focus:ring-sea-life"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://vercel.com/leah-martins-projects/leahmartin-portfolio-public"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 rounded hover:bg-sea-life/20 border border-sea-life text-sea-life font-semibold transition focus:outline-none focus:ring-2 focus:ring-sea-life"
            aria-label="Vercel"
          >
            Vercel
          </a>
          <a
            href="https://platform.claude.com/settings/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 rounded hover:bg-sea-life/20 border border-sea-life text-sea-life font-semibold transition focus:outline-none focus:ring-2 focus:ring-sea-life"
            aria-label="Claude"
          >
            Claude
          </a>
          <a
            href="https://supabase.com/dashboard/project/rsohhfwmpzqqvacinfno/editor/18679"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 rounded hover:bg-sea-life/20 border border-sea-life text-sea-life font-semibold transition focus:outline-none focus:ring-2 focus:ring-sea-life"
            aria-label="Supabase"
          >
            Supabase
          </a>
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 rounded hover:bg-sea-life/20 border border-sea-life text-sea-life font-semibold transition focus:outline-none focus:ring-2 focus:ring-sea-life"
            aria-label="Gmail"
          >
            Gmail
          </a>
        </div>
      </section>

      {/* Todoist Widget Card */}
      <section className="w-full max-w-xl bg-white rounded-lg shadow-lg p-4 mb-8" aria-label="Todo List">
        <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
        <div className="w-full flex justify-center">
          {/* Todoist free widget embed - replace the src URL with your Todoist project or use the default */}
          <iframe
            title="Todoist To-Do List"
            aria-label="Todoist To-Do List"
            src="https://todoist.com/app/embed/project?projectUrl=https%3A%2F%2Ftodoist.com%2Fapp%2Fproject%2Fdefault"
            style={{ width: '100%', minHeight: '500px', border: 'none', background: 'transparent' }}
            allow="clipboard-write"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Powered by <a href="https://todoist.com/" target="_blank" rel="noopener noreferrer" className="underline">Todoist</a> free widget.</p>
      </section>
      {/* Murals Card */}
      <section className="w-full max-w-xl bg-white rounded-lg shadow-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-2">Murals <span className="text-xs text-gray-400">(Edit or review)</span></h2>
        <div className="max-h-64 overflow-y-auto border rounded p-2 bg-gray-50" aria-label="Murals List" tabIndex={0}>
          {loading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : murals.length === 0 ? (
            <div className="text-center text-gray-400">No murals found.</div>
          ) : (
            <ul className="space-y-2">
              {murals.map(mural => (
                <li key={mural.id} className="flex items-center justify-between bg-white rounded p-2 shadow-sm hover:bg-sea-life/10 transition">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sea-life truncate" title={mural.title}>{mural.title}</div>
                    <div className="text-xs text-gray-500 truncate" title={mural.description}>{mural.description}</div>
                  </div>
                  <button
                    className="ml-4 px-3 py-1 bg-sea-life text-white rounded hover:bg-sea-life/80 focus:outline-none focus:ring-2 focus:ring-sea-life"
                    aria-label={`Edit mural ${mural.title}`}
                    // onClick={() => handleEdit(mural.id)}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {/* Add more dashboard cards/sections here */}
    </main>
  );
}
