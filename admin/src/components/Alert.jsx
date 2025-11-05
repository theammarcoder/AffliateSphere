import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const styles = {
    success: {
      bg: 'bg-green-900/50',
      border: 'border-green-600',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    error: {
      bg: 'bg-red-900/50',
      border: 'border-red-600',
      icon: AlertCircle,
      iconColor: 'text-red-500'
    },
    info: {
      bg: 'bg-blue-900/50',
      border: 'border-blue-600',
      icon: Info,
      iconColor: 'text-blue-500'
    },
    warning: {
      bg: 'bg-yellow-900/50',
      border: 'border-yellow-600',
      icon: AlertCircle,
      iconColor: 'text-yellow-500'
    }
  };

  const style = styles[type] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 flex items-start gap-3 animate-slide-up`}>
      <Icon className={`${style.iconColor} mt-0.5`} size={20} />
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
