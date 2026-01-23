"use client";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

export default function AddMuralPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    media: "",
    year: "",
    is_active: true,
    password: ""
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  // Supabase client for uploads
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  // Handle file selection and upload
  const handleMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const filePath = `murals/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('murals').upload(filePath, file, { upsert: false });
      if (!error) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/murals/${encodeURIComponent(filePath.replace('murals/', ''))}`;
        uploadedUrls.push(publicUrl);
      } else {
        setStatus(`Failed to upload ${file.name}`);
      }
    }
    setMediaUrls(prev => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  // Simple password protection (change this password!)
  const ADMIN_PASSWORD = "Logancobb13!";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    if (form.password !== ADMIN_PASSWORD) {
      setStatus("Incorrect password.");
      return;
    }
    // Prepare media as array: combine uploaded URLs and manual URLs
    const manualUrls = form.media.split(",").map(s => s.trim()).filter(Boolean);
    const allMedia = [...mediaUrls, ...manualUrls];
    const payload = {
      title: form.title,
      description: form.description,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      media: allMedia,
      year: form.year ? parseInt(form.year) : null,
      is_active: form.is_active
    };
    const res = await fetch("/api/admin/add-mural", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      setStatus("Mural added!");
      setForm({ title: "", description: "", latitude: "", longitude: "", media: "", year: "", is_active: true, password: "" });
      setMediaUrls([]);
    } else {
      const data = await res.json();
      setStatus(data.error || "Failed to add mural.");
    }
  };

  return (
    <main className="max-w-md mx-auto p-4 mt-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Mural</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" value={form.title} onChange={handleChange} required placeholder="Title (location)" className="w-full border p-2 rounded" aria-label="Title" />
        <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Description" className="w-full border p-2 rounded" aria-label="Description" />
        <input name="latitude" value={form.latitude} onChange={handleChange} required placeholder="Latitude" className="w-full border p-2 rounded" aria-label="Latitude" type="number" step="any" />
        <input name="longitude" value={form.longitude} onChange={handleChange} required placeholder="Longitude" className="w-full border p-2 rounded" aria-label="Longitude" type="number" step="any" />
        <input name="media" value={form.media} onChange={handleChange} placeholder="Media URLs (comma separated)" className="w-full border p-2 rounded" aria-label="Media URLs" />
        <input type="file" multiple accept="image/*,video/*" onChange={handleMediaChange} className="w-full border p-2 rounded" aria-label="Upload Media Files" />
        {uploading && <div className="text-blue-600">Uploading...</div>}
        {mediaUrls.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {mediaUrls.map((url, i) => (
              <div key={i} className="w-20 h-20 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                {url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={url} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={url} alt="media preview" className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>
        )}
        <input name="year" value={form.year} onChange={handleChange} placeholder="Year (optional)" className="w-full border p-2 rounded" aria-label="Year" type="number" />
        <label className="flex items-center">
          <input name="is_active" type="checkbox" checked={form.is_active} onChange={handleChange} className="mr-2" aria-label="Is Active" />
          Active
        </label>
        <input name="password" value={form.password} onChange={handleChange} required placeholder="Admin Password" className="w-full border p-2 rounded" aria-label="Admin Password" type="password" />
        <button type="submit" className="w-full bg-sea-life text-white font-bold py-2 rounded">Add Mural</button>
      </form>
      {status && <div className="mt-4 text-center text-red-600">{status}</div>}
    </main>
  );
}
