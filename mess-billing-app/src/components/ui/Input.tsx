import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full appearance-none border px-4 py-2.5 rounded-xl 
              focus:outline-none focus:ring-2 focus:border-indigo-500 
              transition-all duration-300 font-medium flex bg-white/20 backdrop-blur-2xl
              hover:bg-white/40 hover:shadow-lg hover:border-white/80
              ${icon ? 'pl-10' : ''}
              ${error
                                ? 'border-rose-300 focus:ring-rose-500/50 text-rose-900 placeholder-rose-300 bg-rose-50/80 hover:bg-rose-50'
                                : 'border-white/50 text-slate-800 focus:ring-indigo-500/50 focus:bg-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgb(0,0,0,0.08)] disabled:bg-slate-50/20 disabled:text-slate-500 disabled:border-slate-100/50 disabled:shadow-none hover:border-white/70'}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1.5 text-sm font-medium text-rose-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
