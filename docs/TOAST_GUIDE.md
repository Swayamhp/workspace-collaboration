# Toast Notification System - Production Ready

A modern, production-level toast notification system built with **Sonner** for your React application. Features beautiful UI with smooth animations, multiple toast types, and easy integration.

## Features

✨ **Multiple Toast Types**
- Success, Error, Warning, Info, Loading, and Custom toasts
- Smooth slide-in/out animations
- Auto-dismiss with customizable durations
- Close button for manual dismissal

🎨 **Beautiful UI**
- Color-coded toasts for different notification types
- Gradient backgrounds
- Glassmorphism effect with backdrop blur
- Dark mode support
- Maximum 3 visible toasts at once

⚡ **Easy to Use**
- Custom `useToast` hook for consistent API
- Single import across your app
- Promise-based toast for async operations
- Type-safe with TypeScript

## Installation

The toast system is already set up! Sonner is installed and configured in your app.

## Usage

### Basic Setup

The toast system is already configured in `main.tsx`. All you need to do is import and use the `useToast` hook in your components.

### Import the Hook

```typescript
import { useToast } from '@/hooks/useToast';
```

### Use in Components

```typescript
const MyComponent = () => {
  const toast = useToast();

  const handleClick = () => {
    toast.success('Success!', 'Operation completed');
  };

  return <button onClick={handleClick}>Show Toast</button>;
};
```

## Available Methods

### 1. Success Toast

```typescript
toast.success('Success!', 'Your action completed successfully');
```

**Parameters:**
- `message` (string, required): Main message
- `description` (string, optional): Detailed description

**Use Cases:** Form submission, file upload, data saved

---

### 2. Error Toast

```typescript
toast.error('Error!', 'Something went wrong. Please try again');
```

**Parameters:**
- `message` (string, required): Error title
- `description` (string, optional): Error details

**Use Cases:** Failed API calls, validation errors, network issues

---

### 3. Warning Toast

```typescript
toast.warning('Warning!', 'Please review this action before continuing');
```

**Parameters:**
- `message` (string, required): Warning title
- `description` (string, optional): Additional details

**Use Cases:** Confirmation alerts, data loss warnings, deprecated features

---

### 4. Info Toast

```typescript
toast.info('Info', 'This is an informational message');
```

**Parameters:**
- `message` (string, required): Info message
- `description` (string, optional): Additional information

**Use Cases:** App updates, feature announcements, status updates

---

### 5. Loading Toast

```typescript
const toastId = toast.loading('Loading...');

// Later, dismiss it
setTimeout(() => {
  toast.success('Done!', 'Operation completed');
  toast.dismiss(toastId);
}, 2000);
```

**Use Cases:** Long-running operations, file uploads, data processing

---

### 6. Promise Toast

```typescript
const mockPromise = new Promise((resolve) => {
  setTimeout(() => resolve('Success!'), 2000);
});

toast.promise(mockPromise, {
  loading: 'Processing your request...',
  success: 'Request completed successfully!',
  error: 'Request failed. Please try again',
});
```

**Parameters:**
- `promise` (Promise): The async operation
- `messages` (object):
  - `loading`: Message while waiting
  - `success`: Message on success
  - `error`: Message on failure

**Use Cases:** API calls, data fetching, async operations

---

### 7. Dismiss Toast

```typescript
// Dismiss specific toast
const toastId = toast.loading('Processing...');
toast.dismiss(toastId);

// Dismiss all toasts
toast.dismiss();
```

---

## Real-World Examples

### Example 1: Form Submission

```typescript
const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const loadingToast = toast.loading('Submitting form...');

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Submission failed');

    toast.dismiss(loadingToast);
    toast.success('Success!', 'Form submitted successfully');
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error('Error', 'Failed to submit form');
  }
};
```

### Example 2: File Upload

```typescript
const handleFileUpload = async (file: File) => {
  const loadingId = toast.loading('Uploading file...');

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');

    toast.dismiss(loadingId);
    toast.success('Upload complete!', `${file.name} uploaded successfully`);
  } catch (error) {
    toast.dismiss(loadingId);
    toast.error('Upload failed', 'Please try again');
  }
};
```

### Example 3: Data Validation

```typescript
const handleLogin = async (email: string, password: string) => {
  const toast = useToast();

  // Validate
  if (!email.includes('@')) {
    toast.error('Invalid Email', 'Please enter a valid email');
    return;
  }

  if (password.length < 6) {
    toast.error('Weak Password', 'Password must be at least 6 characters');
    return;
  }

  // Proceed with login
  const loadingId = toast.loading('Signing in...');

  try {
    // API call here
    toast.dismiss(loadingId);
    toast.success('Welcome!', 'Login successful');
  } catch (error) {
    toast.dismiss(loadingId);
    toast.error('Login Failed', 'Invalid credentials');
  }
};
```

### Example 4: Copy to Clipboard

```typescript
const copyToClipboard = (text: string, label: string) => {
  try {
    navigator.clipboard.writeText(text);
    toast.success('Copied!', `${label} copied to clipboard`);
  } catch (error) {
    toast.error('Failed', 'Could not copy to clipboard');
  }
};
```

### Example 5: Delete Confirmation

```typescript
const handleDelete = async (id: string) => {
  toast.warning('Confirm Delete', 'This action cannot be undone');

  const loadingId = toast.loading('Deleting...');

  try {
    await fetch(`/api/delete/${id}`, { method: 'DELETE' });
    toast.dismiss(loadingId);
    toast.success('Deleted', 'Item deleted successfully');
  } catch (error) {
    toast.dismiss(loadingId);
    toast.error('Delete Failed', 'Could not delete item');
  }
};
```

## Customization

### Change Toast Position

Edit `main.tsx` and modify the `position` prop:

```typescript
<Toaster
  position="bottom-right"  // Options: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  // ... other props
/>
```

### Change Theme

```typescript
<Toaster
  theme="dark"  // Options: light, dark, system
/>
```

### Customize Duration

Each toast method accepts a duration option:

```typescript
toast.success('Message', 'Description');
// Default: 4000ms, set to 0 for no auto-dismiss
```

### Max Visible Toasts

```typescript
<Toaster
  visibleToasts={5}  // Number of toasts shown at once
/>
```

## CSS Customization

The toast styles are defined in `src/index.css`. You can customize:

- Colors (using CSS variables)
- Animation timing
- Border radius
- Shadows
- Fonts

### CSS Variables

```css
:root {
  --sonner-background: #ffffff;
  --sonner-border: #e5e7eb;
  --sonner-text: #1f2937;
  --sonner-description: #6b7280;
}
```

Edit these variables in `index.css` to change the toast appearance globally.

## Best Practices

✅ **Do:**
- Use appropriate toast type for the situation
- Keep messages concise and clear
- Dismiss loading toasts when done
- Use promises for async operations
- Validate user input before showing success

❌ **Don't:**
- Show too many toasts at once (limited to 3)
- Use generic messages like "OK" or "Done"
- Forget to dismiss loading toasts
- Show success for failed operations
- Use toasts for critical errors (use modals instead)

## File Structure

```
src/
├── hooks/
│   └── useToast.ts          # Toast hook (imported in components)
├── index.css                # Toast styles and customization
├── main.tsx                 # Toast provider setup
└── components/
    └── shared/
        └── ToastExamples.tsx  # Example usage component
```

## Troubleshooting

### Toasts Not Showing

1. Ensure `Toaster` component is in `main.tsx`
2. Check that `useToast` hook is imported correctly
3. Verify browser console for errors

### Styling Issues

1. Check `index.css` for custom CSS
2. Ensure Tailwind CSS is properly configured
3. Clear browser cache and rebuild

### Performance Issues

1. Limit visible toasts (default: 3)
2. Use appropriate durations
3. Dismiss toasts manually for long operations

## API Reference

| Method | Parameters | Returns | Use Case |
|--------|-----------|---------|----------|
| `success()` | message, description? | void | Success messages |
| `error()` | message, description? | void | Error messages |
| `warning()` | message, description? | void | Warning messages |
| `info()` | message, description? | void | Info messages |
| `loading()` | message | string \| number | Show loading state |
| `promise()` | promise, messages | Promise | Handle async operations |
| `custom()` | message, icon? | void | Custom messages |
| `dismiss()` | toastId? | void | Dismiss toasts |

---

**Ready to use!** Import `useToast` in any component and start showing beautiful notifications. 🎉
