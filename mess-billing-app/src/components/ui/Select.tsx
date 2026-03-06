'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface SelectProps {
    label?: string;
    error?: string;
    options: { label: string; value: string | number }[];
    value: string | number;
    onChange: (value: string | number) => void;
    className?: string;
    disabled?: boolean;
    theme?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'teal' | 'blue' | 'purple';
}

export function Select({
    label,
    error,
    options,
    value,
    onChange,
    className = '',
    disabled = false,
    theme = 'primary'
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Compare as strings to avoid number/string type mismatches from API data
    const selectedOption = options.find(opt => String(opt.value) === String(value));

    const themes = {
        primary:   { ring: 'focus:border-indigo-500 focus:ring-indigo-500/50',  active: 'bg-indigo-50 text-indigo-700',  icon: 'text-indigo-500' },
        success:   { ring: 'focus:border-emerald-500 focus:ring-emerald-500/50', active: 'bg-emerald-50 text-emerald-700', icon: 'text-emerald-500' },
        warning:   { ring: 'focus:border-orange-500 focus:ring-orange-500/50',  active: 'bg-orange-50 text-orange-700',  icon: 'text-orange-500' },
        danger:    { ring: 'focus:border-rose-500 focus:ring-rose-500/50',      active: 'bg-rose-50 text-rose-700',      icon: 'text-rose-500' },
        secondary: { ring: 'focus:border-slate-500 focus:ring-slate-500/50',    active: 'bg-slate-50 text-slate-700',    icon: 'text-slate-500' },
        teal:      { ring: 'focus:border-teal-500 focus:ring-teal-500/50',      active: 'bg-teal-50 text-teal-700',      icon: 'text-teal-500' },
        blue:      { ring: 'focus:border-blue-500 focus:ring-blue-500/50',      active: 'bg-blue-50 text-blue-700',      icon: 'text-blue-500' },
        purple:    { ring: 'focus:border-purple-500 focus:ring-purple-500/50',  active: 'bg-purple-50 text-purple-700',  icon: 'text-purple-500' },
    };
    const currentTheme = themes[theme];

    // Recalculate dropdown position whenever it opens
    const openDropdown = () => {
        if (disabled || !buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setDropPos({
            top: rect.bottom + window.scrollY + 6,
            left: rect.left + window.scrollX,
            width: rect.width,
        });
        setIsOpen(true);
    };

    // Close on click outside (check both button and portal dropdown)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                buttonRef.current && !buttonRef.current.contains(target) &&
                dropdownRef.current && !dropdownRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Reposition if window scrolls while open
    useEffect(() => {
        if (!isOpen) return;
        const reposition = () => {
            if (!buttonRef.current) return;
            const rect = buttonRef.current.getBoundingClientRect();
            setDropPos({ top: rect.bottom + window.scrollY + 6, left: rect.left + window.scrollX, width: rect.width });
        };
        window.addEventListener('scroll', reposition, true);
        window.addEventListener('resize', reposition);
        return () => {
            window.removeEventListener('scroll', reposition, true);
            window.removeEventListener('resize', reposition);
        };
    }, [isOpen]);

    const dropdownMenu = isOpen ? (
        <div
            ref={dropdownRef}
            style={{ position: 'absolute', top: dropPos.top, left: dropPos.left, width: dropPos.width, zIndex: 99999 }}
            className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
            <ul className="max-h-60 overflow-auto p-1.5 space-y-0.5">
                {options.map((opt, i) => (
                    <li
                        key={i}
                        onMouseDown={e => {
                            // Use mousedown so we fire before the click-outside handler
                            e.preventDefault();
                            onChange(opt.value);
                            setIsOpen(false);
                        }}
                        className={`
                            px-4 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-colors list-none
                            ${String(value) === String(opt.value)
                                ? currentTheme.active
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}
                        `}
                    >
                        {opt.label}
                    </li>
                ))}
            </ul>
        </div>
    ) : null;

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-bold text-slate-700 mb-1.5">{label}</label>
            )}
            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={openDropdown}
                    className={`
                        w-full flex items-center justify-between border px-4 py-3 rounded-xl
                        focus:outline-none focus:ring-2 transition-all duration-200 font-medium
                        bg-slate-50/50 hover:bg-slate-50 text-left
                        ${error
                            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/50 text-rose-900 bg-rose-50/80 hover:bg-rose-50'
                            : `border-slate-200 text-slate-800 ${currentTheme.ring} shadow-sm focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
                        ${className}
                    `}
                    disabled={disabled}
                >
                    <span className="truncate">{selectedOption?.label ?? 'Select...'}</span>
                    <span className={`pointer-events-none flex items-center ml-2 ${currentTheme.icon}`}>
                        <svg className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
            </div>

            {/* Portal: renders outside any overflow-hidden ancestors */}
            {typeof document !== 'undefined' && createPortal(dropdownMenu, document.body)}

            {error && <p className="mt-1.5 text-sm font-medium text-rose-500">{error}</p>}
        </div>
    );
}
