'use client';
import React, { useState } from 'react';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setMessage('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload-students', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.error || 'Upload failed');
            }
        } catch (error) {
            setMessage('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadTemplate = () => {
        window.open('/api/template', '_blank');
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Upload Student Data</h1>
                <button
                    onClick={handleDownloadTemplate}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Download Template
                </button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Excel File</label>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
            <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {loading ? 'Uploading...' : 'Upload Data'}
            </button>
            {message && <p className="mt-4 text-center font-medium">{message}</p>}
        </div>
    );
}
