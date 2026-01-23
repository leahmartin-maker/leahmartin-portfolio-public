import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Basic validation
    if (!data.title || !data.latitude || !data.longitude) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    // Insert mural
    const { error } = await supabase.from('murals').insert([
      {
        title: data.title,
        description: data.description || '',
        latitude: data.latitude,
        longitude: data.longitude,
        media: data.media,
        year: data.year || null,
        is_active: data.is_active !== false
      }
    ]);
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to add mural.' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
