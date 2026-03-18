import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const pngPath = path.join(process.cwd(), 'public', 'IITRopar.png');
        const pngBuf = fs.readFileSync(pngPath);
        const b64 = pngBuf.toString('base64');
        
        // Use a rounded rect with white background and center the logo
        const svg = `
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="64" fill="white" />
  <image href="data:image/png;base64,${b64}" x="32" y="32" width="192" height="192" />
</svg>
`.trim();

        return new NextResponse(svg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        });
    } catch (error) {
        console.error('Error generating icon:', error);
        return new NextResponse('Error', { status: 500 });
    }
}
