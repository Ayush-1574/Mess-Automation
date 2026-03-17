'use client';
import React, { useRef, useState, useEffect } from 'react';

interface SignaturePadProps {
    value: string | null;
    onChange: (data: string | null) => void;
    label?: string;
}

export default function SignaturePad({ value, onChange, label = 'Signature' }: SignaturePadProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);
    const [mode, setMode] = useState<'draw' | 'upload'>('draw');
    const [hasDrawn, setHasDrawn] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas resolution
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#1e293b';

        // If there's already a value, draw it
        if (value && !hasDrawn) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, rect.width, rect.height);
            };
            img.src = value;
        }
    }, [mode]);

    const getPos = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setDrawing(true);
        setHasDrawn(true);
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (!drawing) return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    const endDraw = () => {
        if (!drawing) return;
        setDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            onChange(canvas.toDataURL('image/png'));
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
        setHasDrawn(false);
        onChange(null);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be under 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            onChange(result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                    <button type="button" onClick={() => setMode('draw')}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${mode === 'draw' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>
                        ✍️ Draw
                    </button>
                    <button type="button" onClick={() => setMode('upload')}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${mode === 'upload' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>
                        📁 Upload
                    </button>
                </div>
            </div>

            {mode === 'draw' ? (
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-white cursor-crosshair touch-none"
                        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                        onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
                    />
                    {!hasDrawn && !value && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="text-slate-400 text-xs font-medium">Draw your signature here</p>
                        </div>
                    )}
                    <button type="button" onClick={clearCanvas}
                        className="absolute top-2 right-2 w-6 h-6 bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-500 rounded-lg flex items-center justify-center transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            ) : (
                <div className="space-y-2">
                    {value ? (
                        <div className="relative border-2 border-slate-200 rounded-xl p-3 bg-white">
                            <img src={value} alt="Signature" className="max-h-24 mx-auto" />
                            <button type="button" onClick={() => onChange(null)}
                                className="absolute top-2 right-2 w-6 h-6 bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-500 rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                            <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <p className="text-xs text-slate-400 font-medium">Click to upload signature image</p>
                            <p className="text-[10px] text-slate-300">(PNG, JPG — max 2MB)</p>
                            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                        </label>
                    )}
                </div>
            )}
        </div>
    );
}
