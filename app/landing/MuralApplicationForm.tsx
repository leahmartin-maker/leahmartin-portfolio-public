import { ChangeEvent, FormEvent } from 'react';
// Represents the data collected by the mural application form.
// Explicitly typing all fields for type safety and better editor support.
export interface MuralApplicationFormData {
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  aboutOrg: string;
  whyMural: string;
  wallDetails: string;
  timeline: string;
  otherNotes: string;
  authCheckbox: boolean;
  agreeCheckbox: boolean;
}

export interface MuralApplicationFormProps {
  formData: MuralApplicationFormData;
  mediaFiles: File[];
  mediaPreviews: string[];
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onMediaChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveMedia: (idx: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  legalText: React.ReactNode;
  detailsText: React.ReactNode;
  successText: React.ReactNode;
  submitLabel: string;
  ariaLabel: string;
}

export default function MuralApplicationForm({
  formData,
  mediaFiles,
  mediaPreviews,
  status,
  errorMessage,
  onInputChange,
  onMediaChange,
  onRemoveMedia,
  onSubmit,
  legalText,
  detailsText,
  successText,
  submitLabel,
  ariaLabel,
}: MuralApplicationFormProps) {
  return (
    <>
      {status === 'success' ? (
        <div className="text-center py-8" role="status" aria-live="polite">
          {successText}
        </div>
      ) : (
        <form
          className="space-y-1"
          aria-label={ariaLabel}
          autoComplete="off"
          onSubmit={onSubmit}
        >
          {/* Details Paragraph */}
          {detailsText}
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
              Organization or Business Name
            </label>
            <input
              type="text"
              id="orgName"
              name="orgName"
              value={formData.orgName}
              onChange={onInputChange}
              required
              aria-label="Organization Name"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={onInputChange}
              required
              aria-label="Contact Name"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              aria-label="Email Address"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              aria-label="Phone Number"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={onInputChange}
              required
              aria-label="Proposed Mural Location"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="aboutOrg" className="block text-sm font-medium text-gray-700">
              How does your organization contribute to the community?
            </label>
            <textarea
              id="aboutOrg"
              name="aboutOrg"
              value={formData.aboutOrg}
              onChange={onInputChange}
              rows={3}
              required
              aria-label="About Organization"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="whyMural" className="block text-sm font-medium text-gray-700">
              How would my services be meaningful for you?
            </label>
            <textarea
              id="whyMural"
              name="whyMural"
              value={formData.whyMural}
              onChange={onInputChange}
              rows={3}
              required
              aria-label="Why do you want a mural?"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="wallDetails" className="block text-sm font-medium text-gray-700">
              Surface Details (size, texture, condition, etc.)
            </label>
            <textarea
              id="wallDetails"
              name="wallDetails"
              value={formData.wallDetails}
              onChange={onInputChange}
              rows={2}
              required
              aria-label="Wall Details"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
              Preferred Start Date/Timeline
            </label>
            <input
              type="text"
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={onInputChange}
              aria-label="Preferred Timeline"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          {/* Media Upload (Optional) */}
          <div>
            <label htmlFor="media" className="block text-sm font-medium text-gray-700">
              Upload Site Photos, Sketches, or Reference Images (optional)
            </label>
            <input
              type="file"
              id="media"
              name="media"
              onChange={onMediaChange}
              aria-label="Upload images or sketches"
              className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-sea-life/10 file:text-sea-life hover:file:bg-sea-life/20"
              accept="image/*"
              multiple
            />
            <p className="text-xs text-gray-500 mt-1">You may upload multiple images. This is not required, but visuals help us understand your project.</p>
            {/* Media Preview Thumbnails */}
            {mediaPreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Selected Images ({mediaPreviews.length}):</p>
                <div className="grid grid-cols-3 gap-2">
                  {mediaPreviews.map((preview, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-24 object-cover rounded border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveMedia(idx)}
                        aria-label={`Remove image ${idx + 1}`}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600"
                      >
                        ├ù
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="otherNotes" className="block text-sm font-medium text-gray-700">
              Is there anything else you'd like to share?
            </label>
            <textarea
              id="otherNotes"
              name="otherNotes"
              value={formData.otherNotes}
              onChange={onInputChange}
              rows={2}
              aria-label="Other Notes"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sea-life focus:outline-none transition-colors"
            />
          </div>
          {/* Legal Disclaimer Section */}
          {legalText}
          {/* Error Message */}
          {status === 'error' && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700" role="alert" aria-live="polite">
              <p className="font-semibold">Error:</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded bg-sea-life px-4 py-3 font-semibold text-white shadow hover:bg-sea-life/90 focus:outline-none focus:ring-2 focus:ring-sea-life disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label={submitLabel}
          >
            {status === 'submitting' ? 'Submitting...' : submitLabel}
          </button>
        </form>
      )}
    </>
  );
}
