import { create } from 'zustand';

export const useToast = create((set, get) => ({
  toasts: [],
  toast: ({ title, description, variant = 'default' }) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, title, description, variant }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  dismiss: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
