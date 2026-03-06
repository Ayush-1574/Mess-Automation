import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {

    const baseStyles = 'inline-flex items-center justify-center font-bold active:translate-y-1 active:border-b-0 active:mb-1 disabled:opacity-50 disabled:pointer-events-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150';

    const variants = {
        primary: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-b-4 border-indigo-300 focus:ring-indigo-500',
        secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-b-4 border-slate-300 focus:ring-slate-500',
        outline: 'bg-white text-slate-700 border-t border-x border-slate-200 border-b-4 border-slate-300 hover:bg-slate-50 focus:ring-slate-500',
        danger: 'bg-rose-100 text-rose-700 hover:bg-rose-200 border-b-4 border-rose-300 focus:ring-rose-500',
        success: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-b-4 border-emerald-300 focus:ring-emerald-500',
        warning: 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-b-4 border-amber-300 focus:ring-amber-500',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-b-4 border-transparent hover:border-slate-200 focus:ring-slate-500'
    };


    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-4 text-base'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            )}
            {children}
        </button>
    );
}
