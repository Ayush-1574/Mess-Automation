import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
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

    const baseStyles = 'inline-flex items-center justify-center font-bold active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 hover:-translate-y-0.5';

    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 focus:ring-indigo-500',
        secondary: 'bg-white/30 backdrop-blur-lg text-indigo-700 hover:bg-white/50 hover:text-indigo-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-lg focus:ring-indigo-500',
        outline: 'bg-white/10 backdrop-blur-md text-slate-700 border border-white/40 hover:bg-white/30 hover:shadow-lg focus:ring-slate-500',
        danger: 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-600 hover:text-white rounded-xl shadow-sm hover:shadow-rose-200 hover:shadow-md focus:ring-rose-500',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100/50 hover:text-slate-900 focus:ring-slate-500 hover:shadow-sm'
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
