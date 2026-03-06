import React, { useState, useRef, useEffect } from 'react';

export interface SelectProps {
    label?: string;
    error?: string;
    options: { label: string; value: string | number }[];
    value: string | number;
    onChange: (value: string | number) => void;
    className?: string;
    disabled?: boolean;
}

export function Select({
    label,
    error,
    options,
    value,
    onChange,
    className = '',
    disabled = false
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`
            w-full flex items-center justify-between border px-4 py-3 rounded-xl 
            focus:outline-none focus:ring-2 focus:border-indigo-500 
            transition-all duration-300 font-medium bg-white/20 backdrop-blur-2xl text-left
            hover:bg-white/40 hover:shadow-lg hover:border-white/80
            ${error
                            ? 'border-rose-300 focus:ring-rose-500/50 text-rose-900 bg-rose-50/80 hover:bg-rose-50'
                            : 'border-white/50 text-slate-800 focus:ring-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus:bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed'}
            ${className}
          `}
                    disabled={disabled}
                >
                    <span className="truncate">{selectedOption?.label || 'Select...'}</span>
                    <span className="pointer-events-none flex items-center text-indigo-500 ml-2">
                        <svg className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-3xl border border-white/60 rounded-xl shadow-[0_15px_40px_-5px_rgb(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <ul className="max-h-60 overflow-auto custom-scrollbar p-1.5">
                            {options.map((opt, i) => (
                                <li
                                    key={i}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    className={`
                    px-4 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-colors border-none m-0 list-none
                    ${value === opt.value
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                                >
                                    {opt.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-sm font-medium text-rose-500">{error}</p>
            )}
        </div>
    );
}
