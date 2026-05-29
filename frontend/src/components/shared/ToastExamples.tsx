import React from 'react';
import { useToast } from '../../hooks/useToast';

/**
 * ToastExamples Component - Demonstrates all toast notification types
 * Usage: Import and use the useToast hook in any component
 */
const ToastExamples: React.FC = () => {
  const toast = useToast();

  const handleSuccessToast = () => {
    toast.success('Success!', 'Your action completed successfully');
  };

  const handleErrorToast = () => {
    toast.error('Error!', 'Something went wrong. Please try again');
  };

  const handleWarningToast = () => {
    toast.warning('Warning!', 'Please review this action before continuing');
  };

  const handleInfoToast = () => {
    toast.info('Info', 'This is an informational message');
  };

  const handleLoadingToast = () => {
    const toastId = toast.loading('Loading...');
    setTimeout(() => {
      toast.success('Done!', 'Operation completed');
      toast.dismiss(toastId);
    }, 2000);
  };

  const handlePromiseToast = () => {
    const mockPromise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('Success!'), 2000);
    });

    toast.promise(mockPromise, {
      loading: 'Processing your request...',
      success: 'Request completed successfully!',
      error: 'Request failed. Please try again',
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Toast Notifications Examples</h2>

      <button
        onClick={handleSuccessToast}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Success Toast
      </button>

      <button
        onClick={handleErrorToast}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Error Toast
      </button>

      <button
        onClick={handleWarningToast}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
      >
        Warning Toast
      </button>

      <button
        onClick={handleInfoToast}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Info Toast
      </button>

      <button
        onClick={handleLoadingToast}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
      >
        Loading Toast
      </button>

      <button
        onClick={handlePromiseToast}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        Promise Toast
      </button>
    </div>
  );
};

export default ToastExamples;
