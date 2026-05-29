// QUICK REFERENCE - Toast Notifications

// ═══════════════════════════════════════════════════════════════════════════
// 1. IMPORT IN ANY COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import { useToast } from '@/hooks/useToast';

const MyComponent = () => {
  const toast = useToast();
  // ... rest of component
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. SIMPLE TOASTS (Copy & Paste)
// ═══════════════════════════════════════════════════════════════════════════

// SUCCESS
toast.success('Success!');
toast.success('Success!', 'Additional description here');

// ERROR
toast.error('Error!');
toast.error('Error!', 'Something went wrong');

// WARNING
toast.warning('Warning!');
toast.warning('Warning!', 'Be careful');

// INFO
toast.info('Info');
toast.info('Info', 'Just so you know');

// ═══════════════════════════════════════════════════════════════════════════
// 3. LOADING TOAST (for long operations)
// ═══════════════════════════════════════════════════════════════════════════

const toastId = toast.loading('Processing...');

// When done, dismiss and show result
setTimeout(() => {
  toast.dismiss(toastId);
  toast.success('Done!');
}, 2000);

// ═══════════════════════════════════════════════════════════════════════════
// 4. PROMISE TOAST (recommended for async operations)
// ═══════════════════════════════════════════════════════════════════════════

const myPromise = fetch('/api/data').then(r => r.json());

toast.promise(myPromise, {
  loading: 'Loading data...',
  success: 'Data loaded!',
  error: 'Failed to load data'
});

// ═══════════════════════════════════════════════════════════════════════════
// 5. REAL-WORLD EXAMPLES
// ═══════════════════════════════════════════════════════════════════════════

// --- LOGIN ---
const handleLogin = async (email: string, password: string) => {
  if (!email || !password) {
    toast.error('Validation Error', 'Please fill in all fields');
    return;
  }

  const loadingId = toast.loading('Signing in...');

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    toast.dismiss(loadingId);
    toast.success('Welcome back!', `Logged in as ${email}`);
    // Redirect...
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error('Login failed', error.message);
  }
};

// --- FORM SUBMISSION ---
const handleSubmit = async (formData: any) => {
  const loadingId = toast.loading('Submitting form...');

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error('Submission failed');

    toast.dismiss(loadingId);
    toast.success('Submitted!', 'Form submitted successfully');
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error('Submission failed', error.message);
  }
};

// --- DELETE WITH CONFIRMATION ---
const handleDelete = async (id: string, name: string) => {
  toast.warning('Confirm', `Delete "${name}"? This cannot be undone.`);

  const loadingId = toast.loading('Deleting...');

  try {
    await fetch(`/api/delete/${id}`, { method: 'DELETE' });
    toast.dismiss(loadingId);
    toast.success('Deleted!', `"${name}" has been deleted`);
  } catch (error) {
    toast.dismiss(loadingId);
    toast.error('Delete failed', 'Please try again');
  }
};

// --- FILE UPLOAD ---
const handleFileUpload = async (file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    toast.error('File too large', 'Maximum size is 5MB');
    return;
  }

  const loadingId = toast.loading(`Uploading ${file.name}...`);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error('Upload failed');

    toast.dismiss(loadingId);
    toast.success('Uploaded!', `${file.name} uploaded successfully`);
  } catch (error) {
    toast.dismiss(loadingId);
    toast.error('Upload failed', 'Please try again');
  }
};

// --- COPY TO CLIPBOARD ---
const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text)
    .then(() => toast.success('Copied!', `${label} copied to clipboard`))
    .catch(() => toast.error('Failed', 'Could not copy to clipboard'));
};

// --- API ERROR HANDLING ---
const fetchData = async () => {
  const loadingId = toast.loading('Loading...');

  try {
    const res = await fetch('/api/data');
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    toast.dismiss(loadingId);
    toast.success('Loaded!', 'Data loaded successfully');
    return data;
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error('Error', error.message);
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// 6. DISMISS TOASTS
// ═══════════════════════════════════════════════════════════════════════════

// Dismiss specific toast
const id = toast.loading('Processing...');
toast.dismiss(id);

// Dismiss all toasts
toast.dismiss();

// ═══════════════════════════════════════════════════════════════════════════
// 7. TIPS & BEST PRACTICES
// ═══════════════════════════════════════════════════════════════════════════

// ✅ DO:
// - Use appropriate toast type for situation
// - Keep messages short and clear
// - Always dismiss loading toasts
// - Use promise() for async operations
// - Validate input before showing success

// ❌ DON'T:
// - Show too many toasts (limited to 3)
// - Use generic messages like "OK"
// - Forget to dismiss loading toasts
// - Show success for failed operations
// - Use for critical errors (use modals)

// ═══════════════════════════════════════════════════════════════════════════
