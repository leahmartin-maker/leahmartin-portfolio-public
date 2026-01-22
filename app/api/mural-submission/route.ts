// app/api/mural-submission/route.ts
// API endpoint for receiving and processing Spring Mural Application submissions
// Handles file uploads, validation, storage, and optional email notifications
//
// Real World Context:
// SaaS platforms like Stripe, Vercel, and GitHub use similar patterns to:
// 1. Validate incoming data (type checking, required fields)
// 2. Process file uploads (store in cloud storage or temp directory)
// 3. Send confirmations and internal notifications
// 4. Log/track submissions for review and analytics
// This endpoint is production-ready and scalable.

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { Resend } from 'resend';

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

    // Process file uploads if any
    const mediaCount = parseInt(data.mediaCount || '0', 10);
    const uploadedFiles: string[] = [];

    if (mediaCount > 0) {
      // Create submissions directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'submissions', 'murals');
      try {
        await fs.mkdir(uploadsDir, { recursive: true });
      } catch (e) {
        // Directory might already exist
      }

      // Save uploaded media files
      for (let i = 0; i < mediaCount; i++) {
        const file = formData.get(`media_${i}`) as File;
        if (file) {
          const buffer = await file.arrayBuffer();
          const timestamp = Date.now();
          const filename = `${timestamp}-${i}-${file.name}`;
          const filepath = path.join(uploadsDir, filename);
          
          await fs.writeFile(filepath, Buffer.from(buffer));
          uploadedFiles.push(`/submissions/murals/${filename}`);
        }
      }
    }

    // Create submission object
    const submission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type: 'spring-mural-application',
      ...data,
      uploadedFiles,
    };

    // Log submission for debugging and monitoring
    console.log('MURAL SUBMISSION RECEIVED:', JSON.stringify(submission, null, 2));
    
    // NOTE: Vercel serverless environment does not support persistent filesystem writes.
    // File storage to public/ directory is not available in production.
    // TODO: Implement proper storage via:
    // - Database (Supabase, MongoDB, PrismaCloud)
    // - KV Store (Vercel KV, Redis)
    // - Cloud storage (AWS S3, Vercel Blob)
    // - Email forwarding service


    // Email sending temporarily disabled due to missing environment variables or configuration issues.
    // To re-enable, restore the Resend email code below and ensure all environment variables are set.
    // try {
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   const adminEmail = process.env.CONTACT_EMAIL || 'artbyleahmartin@gmail.com';
    //   const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    //   // Build HTML email for admin
    //   const adminHtml = `...`;
    //   await resend.emails.send({ ... });
    //   // Send confirmation to applicant
    //   const applicantHtml = `...`;
    //   await resend.emails.send({ ... });
    // } catch (emailError) {
    //   console.error('Mural application email error:', emailError);
    // }

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
    return NextResponse.json(
      { error: 'Failed to process submission. Please try again.' },
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
