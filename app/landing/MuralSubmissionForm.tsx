"use client";
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import MuralApplicationForm, { MuralApplicationFormData, FieldLabels } from './MuralApplicationForm';


const TABS = [
  { label: 'Spring Mural Application', id: 'spring' },
  { label: 'Use It or Lose It', id: 'useit' },
];

// Field labels for Spring Mural Application
const SPRING_FIELD_LABELS: FieldLabels = {
  orgName: 'Organization or Business Name',
  contactName: 'Contact Name',
  email: 'Email Address',
  phone: 'Phone Number',
  location: 'Location',
  aboutOrg: 'How does your organization contribute to the community?',
  whyMural: 'How would my services make an impact for your organization?',
  wallDetails: 'Surface Details (size, texture, condition, etc.)',
  timeline: 'Preferred Start Date/Timeline',
  otherNotes: 'Is there anything else you\'d like to share?',
};

// Field labels for Use It or Lose It
const USEIT_FIELD_LABELS: FieldLabels = {
  orgName: 'Organization or Business Name',
  contactName: 'Contact Name',
  email: 'Email Address',
  phone: 'Phone Number',
  location: 'Project Location',
  aboutOrg: 'What is your project idea?',
  whyMural: 'What is your budget?',
  wallDetails: 'Describe your project space (size, texture, condition, etc.)',
  timeline: 'When do you need this project completed?',
  otherNotes: 'Any additional information?',
};

const createEmptyFormData = (): MuralApplicationFormData => ({
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

export default function MuralSubmissionForm() {
  const [activeTab, setActiveTab] = useState('spring');
  const [springStatus, setSpringStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [useitStatus, setUseitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [springErrorMessage, setSpringErrorMessage] = useState('');
  const [useitErrorMessage, setUseitErrorMessage] = useState('');
  const [springMediaFiles, setSpringMediaFiles] = useState<File[]>([]);
  const [springMediaPreviews, setSpringMediaPreviews] = useState<string[]>([]);
  const [useitMediaFiles, setUseitMediaFiles] = useState<File[]>([]);
  const [useitMediaPreviews, setUseitMediaPreviews] = useState<string[]>([]);
  const [springFormData, setSpringFormData] = useState<MuralApplicationFormData>(createEmptyFormData());
  const [useitFormData, setUseitFormData] = useState<MuralApplicationFormData>(createEmptyFormData());
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Get current form data based on active tab
  const currentFormData = activeTab === 'spring' ? springFormData : useitFormData;
  const currentMediaFiles = activeTab === 'spring' ? springMediaFiles : useitMediaFiles;
  const currentMediaPreviews = activeTab === 'spring' ? springMediaPreviews : useitMediaPreviews;
  const currentStatus = activeTab === 'spring' ? springStatus : useitStatus;
  const currentErrorMessage = activeTab === 'spring' ? springErrorMessage : useitErrorMessage;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const updateFunction = activeTab === 'spring' ? setSpringFormData : setUseitFormData;
    
    if (type === 'checkbox') {
      updateFunction(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      updateFunction(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(file => URL.createObjectURL(file));
    
    if (activeTab === 'spring') {
      setSpringMediaFiles(files);
      setSpringMediaPreviews(previews);
    } else {
      setUseitMediaFiles(files);
      setUseitMediaPreviews(previews);
    }
  };

  const removeMedia = (idx: number) => {
    if (activeTab === 'spring') {
      URL.revokeObjectURL(springMediaPreviews[idx]);
      setSpringMediaFiles(prev => prev.filter((_, i) => i !== idx));
      setSpringMediaPreviews(prev => prev.filter((_, i) => i !== idx));
    } else {
      URL.revokeObjectURL(useitMediaPreviews[idx]);
      setUseitMediaFiles(prev => prev.filter((_, i) => i !== idx));
      setUseitMediaPreviews(prev => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTab === 'spring') {
      setSpringStatus('submitting');
      setSpringErrorMessage('');
    } else {
      setUseitStatus('submitting');
      setUseitErrorMessage('');
    }

    try {
      const form = new FormData();
      const submitFormData = activeTab === 'spring' ? springFormData : useitFormData;
      const submitMediaFiles = activeTab === 'spring' ? springMediaFiles : useitMediaFiles;

      Object.entries(submitFormData).forEach(([key, value]) => {
        form.append(key, String(value));
      });
      submitMediaFiles.forEach((file, idx) => {
        form.append(`media_${idx}`, file);
      });
      form.append('mediaCount', String(submitMediaFiles.length));
      form.append('submissionType', activeTab);

      const response = await fetch('/api/mural-submission', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        if (activeTab === 'spring') {
          setSpringStatus('success');
          setSpringFormData(createEmptyFormData());
          setSpringMediaFiles([]);
          setSpringMediaPreviews([]);
        } else {
          setUseitStatus('success');
          setUseitFormData(createEmptyFormData());
          setUseitMediaFiles([]);
          setUseitMediaPreviews([]);
        }
      } else {
        const data = await response.json();
        if (activeTab === 'spring') {
          setSpringStatus('error');
          setSpringErrorMessage(data.error || 'Failed to submit application. Please try again.');
        } else {
          setUseitStatus('error');
          setUseitErrorMessage(data.error || 'Failed to submit application. Please try again.');
        }
      }
    } catch (error) {
      if (activeTab === 'spring') {
        setSpringStatus('error');
        setSpringErrorMessage('Network error. Please check your connection and try again.');
      } else {
        setUseitStatus('error');
        setUseitErrorMessage('Network error. Please check your connection and try again.');
      }
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
    <section
      aria-label="Mural Submission"
      className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-8 overflow-y-auto max-h-[90vh] min-h-[60vh] flex flex-col justify-between"
      style={{ boxSizing: 'border-box' }}
    >
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
              formData={springFormData}
              mediaFiles={springMediaFiles}
              mediaPreviews={springMediaPreviews}
              status={springStatus}
              errorMessage={springErrorMessage}
              onInputChange={handleInputChange}
              onMediaChange={handleMediaChange}
              onRemoveMedia={removeMedia}
              onSubmit={handleSubmit}
              ariaLabel="Spring Mural Application Form"
              submitLabel="Submit Application"
              fieldLabels={SPRING_FIELD_LABELS}
              detailsText={
                <>
                  <p className="text-gray-600 text-sm mb-2" aria-live="polite">
                    Our <strong>Spring Mural Application</strong> is now open exclusively to non-profit organizations looking to enhance their impact through creative storytelling. As part of my initiative to provide one pro-bono project per quarter, I am accepting proposals for a free mural, AR experience, website, or specialized digital feature until the deadline of <strong>March 1, 2026</strong>. While the design and labor for the project are free of charge, please note that the organization may be responsible for minimal costs related to travel, materials, or specialized equipment rentals if required.<br /><br />
                    The selected partner will be notified by <strong>March 30, 2026</strong>, and all other applicants will receive an email detailing alternative ways we might work together. I encourage you to explore my portfolio or follow my social media to see examples of my work and spark ideas for your own mission. Please use the form below to share what kind of non-profit you are and how a custom project can help fulfill your specific business needs.
                  </p>
                </>
              }
              legalText={
                <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-2">
                  <p className="text-xs text-gray-500 mb-2">
                    <strong>By submitting this application:</strong> you certify that you are an authorized representative of a non-profit organization.<br />
                    <strong>Selection Process:</strong> Submissions are reviewed quarterly; applications must be received by the 1st of the final month of the quarter to be considered for the current cycle. One project will be selected per quarter at the sole discretion of [Your Business Name] based on site viability and community impact, with the recipient notified by the 15th of that month.<br />
                    <strong>Project Scope:</strong> The "free" designation applies to [Artist Labor/Design Fees]; the selected organization may be responsible for specific site costs such as wall preparation or equipment rentals.<br />
                    <strong>Non-Selection & Bidding:</strong> If your project is not selected for the free mural, you are encouraged to re-apply for the following quarter. By submitting, you acknowledge that you will receive a professional service bid for your project for immediate booking, as well as information regarding our "Use It or Lose It" Program, which allows organizations to utilize remaining annual budget or grants for mural projects before year-end deadlines.<br />
                    <strong>Permissions:</strong> You grant [Your Business Name] permission to use submitted site descriptions and photos for promotional and evaluation purposes. This program is governed by the laws of the State of Texas and may be modified or canceled at the artist’s discretion due to safety or scheduling constraints.
                  </p>
                  <div className="flex items-start mb-2">
                    <input
                      type="checkbox"
                      id="authCheckbox"
                      name="authCheckbox"
                      checked={springFormData.authCheckbox as boolean}
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
                      checked={springFormData.agreeCheckbox as boolean}
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
                    A confirmation email has been sent to <strong>{springFormData.email as string}</strong>.
                  </p>
                  <button
                    onClick={() => setSpringStatus('idle')}
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
              formData={useitFormData}
              mediaFiles={useitMediaFiles}
              mediaPreviews={useitMediaPreviews}
              status={useitStatus}
              errorMessage={useitErrorMessage}
              onInputChange={handleInputChange}
              onMediaChange={handleMediaChange}
              onRemoveMedia={removeMedia}
              onSubmit={handleSubmit}
              ariaLabel="Use It or Lose It Form"
              submitLabel="Submit Application"
              fieldLabels={USEIT_FIELD_LABELS}
              detailsText={
                <>
                  <p className="text-gray-600 text-sm mb-2" aria-live="polite">
                    <strong>Use It or Lose It</strong> is a special program for organizations and businesses who want to utilize remaining annual budget or grant funds before they expire. If you have a project idea, a wall, or a creative need, but aren’t sure how to use your resources, submit your information below. I’ll help you design a custom mural, AR experience, or digital feature that fits your goals and budget.<br /><br />
                    
                  </p>
                </>
              }
              legalText={
                <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-2">
                  <p className="text-xs text-gray-500 mb-2">
                    <strong>By submitting this form:</strong> you agree to be contacted by [Your Business Name] regarding your project. Your information will be kept confidential and used only for the purpose of responding to your inquiry.<br />
                    <strong>Budget:</strong> Please provide an estimated budget or range if possible. This helps me tailor my proposal to your needs.<br />
                    <strong>Permissions:</strong> You grant [Your Business Name] permission to use submitted site descriptions and photos for promotional and evaluation purposes. This program is governed by the laws of the State of Texas and may be modified or canceled at the artist’s discretion due to safety or scheduling constraints.
                  </p>
                  <div className="flex items-start mb-2">
                    <input
                      type="checkbox"
                      id="authCheckbox-useit"
                      name="authCheckbox"
                      checked={useitFormData.authCheckbox as boolean}
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
                      checked={useitFormData.agreeCheckbox as boolean}
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
                    A confirmation email has been sent to <strong>{useitFormData.email as string}</strong>.
                  </p>
                  <button
                    onClick={() => setUseitStatus('idle')}
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
