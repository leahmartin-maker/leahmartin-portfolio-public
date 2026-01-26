// app/api/mural-submission/route.ts
// API endpoint for receiving and processing Spring Mural Application submissions
// Handles form validation, stores to Supabase database, and sends email notifications
//
// Real World Context:
// - Stores data in Supabase (reliable across localhost and production)
// - Does NOT write to filesystem (production servers like Vercel don't allow this)
// - Follows same pattern as contact form for consistency
// - Professional apps always use databases for form submissions

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role (server-side only, secure)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// Validation helper
function validateFormData(data: Record<string, string>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.orgName?.trim()) errors.push('Organization name is required');
  if (!data.contactName?.trim()) errors.push('Contact name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.location?.trim()) errors.push('Location is required');
  if (!data.aboutOrg?.trim()) errors.push('Organization description is required');
  if (!data.whyMural?.trim()) errors.push('Why you want a mural is required');
  if (!data.wallDetails?.trim()) errors.push('Wall/surface details are required');

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Check required checkboxes
  if (data.authCheckbox !== 'true') errors.push('You must confirm you are authorized to submit');
  if (data.agreeCheckbox !== 'true') errors.push('You must agree to the terms');

  return { valid: errors.length === 0, errors };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const data: Record<string, string> = {};
    for (const [key, value] of formData) {
      if (!key.startsWith('media_')) {
        data[key] = value as string;
      }
    }

    // Validate form data
    const validation = validateFormData(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join('; ') },
        { status: 400 }
      );
    }

    // Get submission type (spring or useit)
    const submissionType = data.submissionType || 'spring';

    // Save to Supabase (this works on localhost AND production)
    const { data: dbResult, error: dbError } = await supabase
      .from('mural_submissions')
      .insert([{
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
        submission_type: submissionType,
        created_at: new Date().toISOString(),
      }])
      .select();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      // Log the failed submission to Supabase
      try {
        await supabase
          .from('submission_errors')
          .insert([
            {
              email: data.email || null,
              error_message: dbError.message,
              failed_at: new Date().toISOString(),
              form_type: submissionType,
            },
          ]);
      } catch (logError) {
        console.error('Failed to log submission error:', logError);
      }
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 }
      );
    }

    console.log('✅ Saved to Supabase:', dbResult?.[0]?.id);
    const submission = dbResult?.[0];


    // Send notification email to Leah (admin)
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const adminEmail = process.env.CONTACT_EMAIL || 'artbyleahmartin@gmail.com';
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

      // Build HTML email for admin
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00c5cd; border-bottom: 3px solid #00c5cd; padding-bottom: 10px;">New Mural Application Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Organization:</strong> ${data.orgName}</p>
            <p><strong>Contact Name:</strong> ${data.contactName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
            <p><strong>Location:</strong> ${data.location}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">About the Organization</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.aboutOrg}</p>
            <h3 style="color: #333; margin-top: 16px;">Why a Mural?</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.whyMural}</p>
            <h3 style="color: #333; margin-top: 16px;">Wall/Surface Details</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.wallDetails}</p>
            <h3 style="color: #333; margin-top: 16px;">Timeline</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.timeline || 'N/A'}</p>
            <h3 style="color: #333; margin-top: 16px;">Other Notes</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.otherNotes || 'N/A'}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Sent from leahmartin-portfolio-public mural application form</p>
          </div>
        </div>
      `;

      // Send to Leah
      await resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        subject: `New Mural Application from ${data.contactName || data.orgName}`,
        replyTo: data.email,
        html: adminHtml,
      });

      // Send confirmation to applicant
      const applicantHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00c5cd; border-bottom: 3px solid #00c5cd; padding-bottom: 10px;">Thank You for Your Application!</h2>
          <p style="margin: 20px 0;">Hi ${data.contactName || data.orgName},</p>
          <p style="margin: 20px 0;">Your mural application has been received. I will review your submission and reach out within 48 hours.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Sent from leahmartin-portfolio-public mural application form</p>
          </div>
        </div>
      `;
      await resend.emails.send({
        from: fromEmail,
        to: [data.email],
        subject: 'Your Mural Application Was Received',
        html: applicantHtml,
      });
    } catch (emailError) {
      // Log but don't block submission
      console.error('Mural application email error:', emailError);
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Application received successfully',
        submissionId: submission.id,
      },
      { status: 200 }
    );
  } catch (error) {
  console.error('Mural submission error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to process submission: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Real World Production Notes:
// ✅ DONE: Using Supabase database (reliable on localhost and production)
// ✅ DONE: Removed filesystem writes (Vercel/serverless don't support this)
// ✅ DONE: Email notifications via Resend
// TODO: Add rate limiting to prevent spam (use middleware or Redis)
// TODO: Add file upload support (currently form data only)
// TODO: Add CAPTCHA for production security
// TODO: Log submissions for analytics and monitoring
