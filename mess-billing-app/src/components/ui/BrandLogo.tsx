import React from 'react';

interface BrandLogoProps {
    className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "" }) => {
    return (
        <div className={`inline-flex bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white items-center justify-center transition-all duration-300 hover:shadow-md ${className}`}>
            <img
                src="/IITRopar.png"
                alt="IIT Ropar Logo"
                className="w-10 sm:w-12 h-auto object-contain"
            />
        </div>
    );
};
