// app/landing/MuralSubmissionForm.tsx
// Accessible, modular tabbed form for mural submissions
// Follows all of Leah's rules: accessibility, modularity, industry standards, no slop
//
// Real World Context:
// This tabbed form pattern is used by platforms like Airbnb, GitHub, and AWS for complex
// multi-step applications. The keyboard navigation (arrow keys to switch tabs) and ARIA
// attributes ensure accessibility compliance (WCAG 2.1 AA standard). Professional teams
// use this to handle multiple related forms without overwhelming users or creating separate pages.

"use client";
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import MuralApplicationForm, { MuralApplicationFormData } from './MuralApplicationForm';

const TABS = [
  { label: 'Spring Mural Application', id: 'spring' },
  { label: 'Use It or Lose It', id: 'useit' },
];

export default function MuralSubmissionForm() {
  const [activeTab, setActiveTab] = useState('spring');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState<MuralApplicationFormData>({
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    aboutOrg: '',
    whyMural: '',
    wallDetails: '',
    timeline: '',
    otherNotes: '',
    authCheckbox: false,
    agreeCheckbox: false,
  });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setMediaPreviews(previews);
  };

  const removeMedia = (idx: number) => {
    URL.revokeObjectURL(mediaPreviews[idx]);
    setMediaFiles(prev => prev.filter((_, i) => i !== idx));
    setMediaPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, String(value));
      });
      mediaFiles.forEach((file, idx) => {
        form.append(`media_${idx}`, file);
      });
      form.append('mediaCount', String(mediaFiles.length));
      form.append('submissionType', activeTab);

      const response = await fetch('/api/mural-submission', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          orgName: '',
          contactName: '',
          email: '',
          phone: '',
          location: '',
          aboutOrg: '',
          whyMural: '',
          wallDetails: '',
          timeline: '',
          otherNotes: '',
          authCheckbox: false,
          agreeCheckbox: false,
        });
        setMediaFiles([]);
        setMediaPreviews([]);
      } else {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  // Keyboard navigation for tabs
  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % TABS.length;
      tabRefs.current[next]?.focus();
      setActiveTab(TABS[next].id);
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + TABS.length) % TABS.length;
      tabRefs.current[prev]?.focus();
      setActiveTab(TABS[prev].id);
    }
  }

  return (
    <section aria-label="Mural Submission" className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-8">
      {/* Tab Navigation */}
      <div role="tablist" aria-label="Submission Type" className="flex mb-6 border-b-2 border-sea-life/30">
        {TABS.map((tab, idx) => (
          <button
            key={tab.id}
            ref={el => { tabRefs.current[idx] = el; }}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={`px-6 py-3 text-lg font-semibold focus:outline-none transition border-b-4 ${activeTab === tab.id ? 'border-sea-life text-sea-life bg-sea-life/10' : 'border-transparent text-gray-400 bg-transparent hover:text-sea-life'}`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={e => handleKeyDown(e, idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Panels */}
      <div>
        {activeTab === 'spring' && (
          <div id="panel-spring" role="tabpanel" aria-labelledby="tab-spring">
            <MuralApplicationForm
              formData={formData}
              mediaFiles={mediaFiles}
              mediaPreviews={mediaPreviews}
              status={status}
              errorMessage={errorMessage}
              onInputChange={handleInputChange}
              onMediaChange={handleMediaChange}
              onRemoveMedia={removeMedia}
              onSubmit={handleSubmit}
              ariaLabel="Spring Mural Application Form"
              submitLabel="Submit Application"
              detailsText={
                <>
                  <p className="text-gray-600 text-sm mb-2" aria-live="polite">
                    Our <strong>Spring Mural Application</strong> is now open exclusively to non-profit organizations. As part of my initiative to provide one pro-bono project per quarter, I am accepting proposals for a free mural until <strong>March 1, 2026</strong>.<br /><br />
                    The selected partner will be notified by <strong>March 30, 2026</strong>. Please use the form below to share your organization's needs.
                  </p>
                  <p className="text-xs text-gray-500 mb-2 ml-1">
                    * While the design and labor are free, the organization may be responsible for minimal costs related to travel, materials, or equipment rentals if required.
                  </p>
                </>
              }
              legalText={
                <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-2">
                  <p className="text-xs text-gray-500 mb-2">
                    By submitting, you certify you are an authorized representative of a registered non-profit. Applications are reviewed quarterly. One project will be selected per cycle.
                  </p>
                  <div className="flex items-start mb-2">
                    <input
                      type="checkbox"
                      id="authCheckbox"
                      name="authCheckbox"
                      checked={formData.authCheckbox as boolean}
                      onChange={handleInputChange}
                      required
                      aria-label="I am authorized to submit this application."
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="authCheckbox" className="text-xs text-gray-700 select-none">
                      I confirm I am authorized to submit this application on behalf of the organization.
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeCheckbox"
                      name="agreeCheckbox"
                      checked={formData.agreeCheckbox as boolean}
                      onChange={handleInputChange}
                      required
                      aria-label="I agree to the terms and conditions."
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="agreeCheckbox" className="text-xs text-gray-700 select-none">
                      I have read and agree to the terms above.
                    </label>
                  </div>
                </div>
              }
              successText={
                <>
                  <div className="text-6xl mb-4">🐢</div>
                  <h3 className="text-2xl font-bold text-sea-life mb-2">Application Received!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for submitting your Spring Mural Application. We've received your submission and will review it carefully.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    A confirmation email has been sent to <strong>{formData.email as string}</strong>.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sea-life hover:underline font-semibold"
                  >
                    Submit Another Application
                  </button>
                </>
              }
            />
          </div>
        )}
        {activeTab === 'useit' && (
          <div id="panel-useit" role="tabpanel" aria-labelledby="tab-useit">
            <MuralApplicationForm
              formData={formData}
              mediaFiles={mediaFiles}
              mediaPreviews={mediaPreviews}
              status={status}
              errorMessage={errorMessage}
              onInputChange={handleInputChange}
              onMediaChange={handleMediaChange}
              onRemoveMedia={removeMedia}
              onSubmit={handleSubmit}
              ariaLabel="Use It or Lose It Application Form"
              submitLabel="Submit Application"
              detailsText={
                <>
                  <p className="text-gray-600 text-sm mb-2" aria-live="polite">
                    The <strong>Use It or Lose It Application</strong> is now open. Use this form to request a mural project to help you utilize remaining budget or grants before year-end deadlines.
                  </p>
                </>
              }
              legalText={
                <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-2">
                  <p className="text-xs text-gray-500 mb-2">
                    By submitting, you certify you are an authorized representative. Applications are reviewed on a rolling basis.
                  </p>
                  <div className="flex items-start mb-2">
                    <input
                      type="checkbox"
                      id="authCheckbox-useit"
                      name="authCheckbox"
                      checked={formData.authCheckbox as boolean}
                      onChange={handleInputChange}
                      required
                      aria-label="I am authorized to submit this application."
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="authCheckbox-useit" className="text-xs text-gray-700 select-none">
                      I confirm I am authorized to submit this application.
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeCheckbox-useit"
                      name="agreeCheckbox"
                      checked={formData.agreeCheckbox as boolean}
                      onChange={handleInputChange}
                      required
                      aria-label="I agree to the terms and conditions."
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="agreeCheckbox-useit" className="text-xs text-gray-700 select-none">
                      I have read and agree to the terms above.
                    </label>
                  </div>
                </div>
              }
              successText={
                <>
                  <div className="text-6xl mb-4">🐢</div>
                  <h3 className="text-2xl font-bold text-sea-life mb-2">Application Received!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for submitting your Use It or Lose It Application. We'll review your request soon.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    A confirmation email has been sent to <strong>{formData.email as string}</strong>.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sea-life hover:underline font-semibold"
                  >
                    Submit Another Application
                  </button>
                </>
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}
