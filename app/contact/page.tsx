'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-stucco to-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Let's Create Together
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you need a public mural, interactive web experience, or both — 
              I'd love to hear about your project. Fill out the form below and I'll get back to you within 48 hours.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-sea-life">
            
            {status === 'success' ? (
              <div className="text-center py-16 md:py-20">
            
                
                {/* Success Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-sea-life mb-2">
                  Message Sent!
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-sea-life to-transparent mx-auto mb-8"></div>
                
                {/* Success Message */}
                <p className="text-lg text-gray-700 mb-3 leading-relaxed max-w-xl mx-auto">
                  Thank you for reaching out! Your message has been successfully delivered.
                </p>
                <p className="text-base text-gray-600 mb-10 max-w-xl mx-auto">
                  I review all inquiries carefully and aim to respond within <span className="font-semibold">48 hours</span>. In the meantime, feel free to explore more of my work or connect with me on social media.
                </p>
                
                {/* Success Badge */}
                <div className="inline-block bg-sea-life/10 border border-sea-life/30 rounded-full px-6 py-3 mb-10">
                  <p className="text-sea-life font-semibold">✓ Confirmed</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 bg-sea-life text-white rounded-lg font-semibold hover:bg-sea-life/90 transition-colors shadow-lg"
                    aria-label="Send another message"
                  >
                    Send Another Message
                  </button>
                  <a
                    href="/"
                    className="px-8 py-3 border-2 border-sea-life text-sea-life rounded-lg font-semibold hover:bg-sea-life/5 transition-colors"
                    aria-label="Return to home page"
                  >
                    Back to Home
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                
                {/* Name */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-label="Your full name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sea-life focus:outline-none transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="Your email address"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sea-life focus:outline-none transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>

                {/* Project Type */}
                <div className="mb-6">
                  <label htmlFor="projectType" className="block text-gray-700 font-semibold mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    aria-label="Type of project"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sea-life focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select a project type...</option>
                    <option value="mural">Public Mural Commission</option>
                    <option value="web">Website/Web Development</option>
                    <option value="ar">AR Experience</option>
                    <option value="both">Mural + Digital Experience</option>
                    <option value="nonprofit">Non-Profit Collaboration</option>
                    <option value="other">Other/Just Exploring</option>
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                    Tell Me About Your Project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    aria-label="Project details and message"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sea-life focus:outline-none transition-colors resize-vertical"
                    placeholder="Share details about your project, timeline, budget range, and what you hope to achieve..."
                  />
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p className="font-semibold">Error:</p>
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-sea-life text-white py-4 rounded-lg font-semibold text-lg hover:bg-sea-life/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  * Required fields. I typically respond within 48 hours.
                </p>
              </form>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-gray-600">
            <p className="mb-2">
              <span className="font-semibold">Based in:</span> Corpus Christi, Texas
            </p>
            <p className="mb-2">
              <span className="font-semibold">Service Area:</span> Coastal Bend & Remote Projects
            </p>
            <p>
              <span className="font-semibold">Non-Profit Program:</span> 4 free murals/year available
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
