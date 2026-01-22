import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const data: Record<string, any> = {};
    for (const [key, value] of formData) {
      if (!key.startsWith('media_')) {
        data[key] = value as string;
      }
    }

    // Convert string booleans to actual booleans
    const submissionData = {
      org_name: data.orgName,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone || null,
      location: data.location,
      about_org: data.aboutOrg,
      why_mural: data.whyMural,
      wall_details: data.wallDetails,
      timeline: data.timeline || null,
      other_notes: data.otherNotes || null,
      submission_type: data.submissionType,
      auth_checkbox: data.authCheckbox === 'true',
      agree_checkbox: data.agreeCheckbox === 'true',
    };

    // Save to Supabase
    const { data: result, error } = await supabase
      .from('mural_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    console.log('Submission saved:', result);

    return NextResponse.json(
      {
        success: true,
        message: 'Application received successfully',
        submissionId: result?.[0]?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Mural submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

// Real World Production Notes:
// 1. Replace file storage with cloud service (AWS S3, Cloudinary, Vercel Blob)
// 2. Replace JSON file storage with actual database (Prisma + PostgreSQL, MongoDB, etc.)
// 3. Implement email service (Resend, SendGrid, AWS SES)
// 4. Add rate limiting to prevent spam
// 5. Add CSRF protection and request validation
// 6. Log submissions for analytics and monitoring
// 7. Consider webhook notifications for admin
