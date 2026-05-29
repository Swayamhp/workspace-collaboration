import { toast } from 'sonner';

export const useToast = () => {
  return {
    success: (message: string, description?: string) => {
      toast.success(message, {
        description: description,
        duration: 4000,
      });
    },

    error: (message: string, description?: string) => {
      toast.error(message, {
        description: description,
        duration: 4000,
      });
    },

    info: (message: string, description?: string) => {
      toast.info(message, {
        description: description,
        duration: 4000,
      });
    },

    warning: (message: string, description?: string) => {
      toast.warning(message, {
        description: description,
        duration: 4000,
      });
    },

    loading: (message: string) => {
      return toast.loading(message);
    },

    promise: <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      }
    ) => {
      return toast.promise(promise, messages);
    },

    // custom: (message: string, icon?: string) => {
    //   toast.custom(message, {
    //     duration: 4000,
    //   });
    // },

    dismiss: (toastId?: string | number) => {
      toast.dismiss(toastId);
    },
  };
};
