import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export default function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-card border rounded-lg shadow-lg p-4 min-w-[300px] max-w-md ${
            toast.variant === 'destructive' ? 'border-destructive' : 'border-border'
          }`}
          style={{ animation: 'fadeIn 0.2s ease-in' }}
        >
          <div className="flex items-start gap-3">
            {toast.variant === 'destructive' ? (
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              {toast.title && (
                <p className="font-semibold text-foreground text-sm">{toast.title}</p>
              )}
              {toast.description && (
                <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="p-1 hover:bg-accent rounded transition-all"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
