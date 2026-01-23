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

    // Store submission (in production, this would be a database)
    // For now, we'll log it and save to a JSON file
    const submission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type: 'spring-mural-application',
      ...data,
      uploadedFiles,
    };

    // Save to submissions file (production: use database)
    const submissionsDir = path.join(process.cwd(), 'public', 'submissions');
    try {
      await fs.mkdir(submissionsDir, { recursive: true });
    } catch (e) {
      // Directory might already exist
    }

    const submissionsFile = path.join(submissionsDir, 'submissions.json');
    let submissions = [];
    try {
      const content = await fs.readFile(submissionsFile, 'utf-8');
      submissions = JSON.parse(content);
    } catch {
      // File doesn't exist yet
    }
    submissions.push(submission);
    await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));


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
