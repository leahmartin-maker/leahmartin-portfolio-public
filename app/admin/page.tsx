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
