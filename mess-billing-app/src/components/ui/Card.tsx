import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hoverEffect?: boolean;
}

export function Card({ children, hoverEffect = true, className = '', ...props }: CardProps) {
    return (
        <div
            className={`bg-white rounded-3xl shadow-sm border border-slate-200 relative ${hoverEffect ? 'hover:shadow-md transition-all duration-300' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '', ...props }: CardProps) {
    return (
        <div className={`p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-3xl ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ children, className = '', ...props }: CardProps) {
    return (
        <div className={`p-6 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '', ...props }: CardProps) {
    return (
        <h3 className={`text-xl font-bold tracking-tight text-slate-800 ${className}`} {...props}>
            {children}
        </h3>
    );
}

export function CardDescription({ children, className = '', ...props }: CardProps) {
    return (
        <p className={`text-sm text-slate-500 font-medium ${className}`} {...props}>
            {children}
        </p>
    );
}
