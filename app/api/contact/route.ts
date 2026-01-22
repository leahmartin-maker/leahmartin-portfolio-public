import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, projectType, message } = body;

    // Validation
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Spam protection: Check for common spam patterns
    const spamKeywords = ['viagra', 'casino', 'lottery', 'crypto mining'];
    const messageText = message.toLowerCase();
    if (spamKeywords.some(keyword => messageText.includes(keyword))) {
      return NextResponse.json(
        { error: 'Message flagged as spam' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL || 'artbyleahmartin@gmail.com'],
      replyTo: email,
      subject: `Portfolio Inquiry: ${projectType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00c5cd; border-bottom: 3px solid #00c5cd; padding-bottom: 10px;">
            New Portfolio Contact Form Submission
          </h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Project Type:</strong> ${projectType}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Sent from leahmartin-maker.github.io contact form</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Save to Supabase
    const { data: dbResult, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{
        name,
        email,
        project_type: projectType,
        message
      }])
      .select();

    if (dbError) {
      console.error('Supabase error:', dbError);
      // Don't fail the request, email was already sent
    } else {
      console.log('✅ Saved to database:', dbResult?.[0]?.id);
    }

    // Log success (keep for debugging)
    console.log('✅ Email sent successfully:', data?.id);

    return NextResponse.json(
      { 
        success: true,
        message: 'Form submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Real World Context:
// ====================
// In professional tech companies, contact forms typically:
//
// 1. EMAIL SERVICE (Most Common):
//    - SendGrid, Resend, AWS SES, Postmark
//    - Sends email notification to business inbox
//    - Auto-reply confirmation to customer
//
// 2. DATABASE STORAGE:
//    - Supabase, PostgreSQL, MongoDB
//    - Stores all submissions for CRM tracking
//    - Allows admin dashboard to view/filter inquiries
//
// 3. INTEGRATIONS:
//    - Slack notifications for urgent inquiries
//    - HubSpot/Salesforce for sales pipeline
//    - Zapier for automated workflows
//
// 4. SECURITY:
//    - Rate limiting (prevent spam bots)
//    - CAPTCHA (Google reCAPTCHA v3)
//    - Email verification before sending
//    - XSS sanitization on inputs
//
// 5. ANALYTICS:
//    - Track form completion rate
//    - A/B test form fields
//    - Monitor spam detection accuracy
//
// For your portfolio, start with console logging (development),
// then add SendGrid or Resend when you get your first real inquiry.
// Cost: $0-15/month for email service depending on volume.
