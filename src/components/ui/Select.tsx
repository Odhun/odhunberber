import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-dark-200">{label}</label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'h-12 w-full appearance-none rounded-xl border bg-dark-800 px-4 pr-10 text-white transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error
                ? 'border-red-500/50'
                : 'border-dark-600 hover:border-dark-500',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" className="bg-dark-800">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-dark-800">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-400"
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
