'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';

export default function StaffAccommodationForm() {
  const applicantType = 'project_staff';
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [applicantName, setApplicantName] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [category, setCategory] = useState('');
  const [declaration, setDeclaration] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaration || !category) { alert('Please accept the declaration and select a category.'); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('applicantType', applicantType);
      formData.append('category', category);
      formData.append('applicantName', applicantName);
      formData.append('gender', gender);
      formData.append('department', department);
      formData.append('contactNo', contactNo);
      formData.append('address', address);
      formData.append('mentorName', mentorName);
      formData.append('mentorEmail', mentorEmail);
      formData.append('arrivalDate', arrivalDate);
      formData.append('arrivalTime', arrivalTime);
      formData.append('departureDate', departureDate);
      formData.append('departureTime', departureTime);
      if (uploadedFile) formData.append('file', uploadedFile);

      const res = await fetch('/api/accommodation/apply', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) { setSubmitted(true); } else { const d = await res.json(); alert('Failed: ' + d.error); }
    } catch { alert('An unexpected error occurred.'); }
    finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
        <Card className="p-0 overflow-hidden max-w-2xl mx-auto">
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-emerald-100">
              <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-3">Application Submitted!</h2>
            <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">Your staff accommodation application has been submitted for review. Track its status from your dashboard.</p>
            <Link href="/accommodation/dashboard"><Button variant="secondary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Dashboard
            </Button></Link>
          </div>
        </Card>
      </div>
    );
  }

  const inputClass = "w-full bg-slate-50/80 border border-slate-200/60 px-4 py-2.5 rounded-xl text-slate-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-300 focus:bg-white transition-all duration-200 placeholder:text-slate-400";

  return (
    <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
      {/* Breadcrumb + Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Link href="/accommodation/apply" className="text-slate-400 hover:text-emerald-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <span className="text-sm text-slate-400 font-medium">Accommodation</span>
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          <span className="text-sm text-slate-700 font-semibold">Staff Request Form</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Staff & JRF Application</h1>
        <p className="text-slate-500 mt-1.5 font-medium">Fill in the details below to request temporary accommodation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Card */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md" hoverEffect={false}>
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-slate-100/50 flex items-center gap-3 bg-gradient-to-r from-emerald-50/50 to-transparent">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shadow-inner border border-emerald-100/50">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Application Form</h2>
                <p className="text-xs text-slate-500 font-medium">Project Staff / JRF / SRF / RA / Post Doc</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* 1. Applicant Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name <span className="text-rose-500">*</span></label>
                  <input type="text" value={applicantName} onChange={e => setApplicantName(e.target.value)} required className={inputClass} placeholder="Enter full name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gender <span className="text-rose-500">*</span></label>
                  <select value={gender} onChange={e => setGender(e.target.value)} required className={inputClass}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Department <span className="text-rose-500">*</span></label>
                  <input type="text" value={department} onChange={e => setDepartment(e.target.value)} required className={inputClass} placeholder="e.g. Mechanical Engineering" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Number <span className="text-rose-500">*</span></label>
                  <input type="tel" value={contactNo} onChange={e => setContactNo(e.target.value)} required className={inputClass} placeholder="+91 0000000000" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Address <span className="text-rose-500">*</span></label>
                  <textarea value={address} onChange={e => setAddress(e.target.value)} required rows={2} className={`${inputClass} resize-none`} placeholder="Current residential address..." />
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 2. Faculty PI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Name of Faculty PI <span className="text-rose-500">*</span></label>
                  <input type="text" value={mentorName} onChange={e => setMentorName(e.target.value)} required className={inputClass} placeholder="PI Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Faculty Email <span className="text-rose-500">*</span></label>
                  <input type="email" value={mentorEmail} onChange={e => setMentorEmail(e.target.value)} required className={inputClass} placeholder="faculty@iitrpr.ac.in" />
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 3. Stay Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Arrival Date <span className="text-rose-500">*</span></label>
                  <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Arrival Time <span className="text-rose-500">*</span></label>
                  <input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Departure Date <span className="text-rose-500">*</span></label>
                  <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Departure Time <span className="text-rose-500">*</span></label>
                  <input type="time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} required className={inputClass} />
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 4. Category */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Room Rent Category <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className={`cursor-pointer flex flex-col border-2 rounded-xl p-4 transition-all ${category === 'A' ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className="flex items-center mb-1">
                      <input type="radio" required name="category" value="A" checked={category==='A'} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300" onChange={(e) => setCategory(e.target.value)} />
                      <span className="ml-2 font-bold text-slate-800 text-sm">Category A</span>
                    </div>
                    <p className="text-xs text-slate-500 ml-6 font-medium">Project Staff / Post Docs / JRF / SRF / RA</p>
                    <p className="text-xs text-emerald-700 font-bold mt-1 ml-6">₹200/day (max ₹4,000/mo) • Security: ₹10,000</p>
                  </label>
                  <label className={`cursor-pointer flex flex-col border-2 rounded-xl p-4 transition-all ${category === 'B' ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className="flex items-center mb-1">
                      <input type="radio" required name="category" value="B" checked={category==='B'} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300" onChange={(e) => setCategory(e.target.value)} />
                      <span className="ml-2 font-bold text-slate-800 text-sm">Category B</span>
                    </div>
                    <p className="text-xs text-slate-500 ml-6 font-medium">Visiting Scholars / Others</p>
                    <p className="text-xs text-emerald-700 font-bold mt-1 ml-6">₹150/day (max ₹3,000/mo) • Security: ₹10,000</p>
                  </label>
                </div>
              </div>

              {/* Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Upload Offer Letter / Proof</label>
                <div className="flex justify-center px-5 py-4 border-2 border-slate-200 border-dashed rounded-xl hover:bg-emerald-50/30 transition-colors cursor-pointer group">
                  <div className="text-center">
                    <svg className="mx-auto h-8 w-8 text-slate-300 group-hover:text-emerald-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <div className="flex text-sm text-slate-600 justify-center mt-1">
                      <label className="relative cursor-pointer font-medium text-emerald-600 hover:text-emerald-500">
                        <span>Select file</span>
                        <input type="file" className="sr-only" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{uploadedFile ? <span className="text-emerald-600 font-bold">{uploadedFile.name}</span> : 'PDF, PNG, JPG up to 5MB'}</p>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start gap-3 p-3.5 bg-amber-50/80 border border-amber-200/60 rounded-xl">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm text-amber-800 font-medium">Hostel accommodation is temporary. Management may ask residents to vacate on short notice.</p>
              </div>

              {/* Declaration */}
              <label className="flex items-start p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 cursor-pointer hover:bg-emerald-50/30 transition-colors">
                <input type="checkbox" checked={declaration} onChange={e => setDeclaration(e.target.checked)} required className="w-4 h-4 mt-0.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                <span className="ml-3 text-sm text-slate-700 font-medium leading-relaxed">
                  I have gone through all rules and regulations of the hostel and will abide by the same during my stay. I agree to vacate the room as and when asked by the Hostel Management Section.
                </span>
              </label>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <Link href="/accommodation/apply"><Button variant="secondary" type="button">Cancel</Button></Link>
                <button type="submit" disabled={loading || !declaration || !category} className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all active:scale-[0.98] shadow-md shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Submitting...</>) : (<><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>Submit Application</>)}
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-br from-emerald-50/50 to-white border-emerald-100/50" hoverEffect={false}>
            <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Approval Process
            </h3>
            <div className="space-y-2.5">
              {['Faculty PI verifies', 'HOD approves department', 'Asst. Registrar clears', 'Chief Warden allocates room'].map((step, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                  <span className="text-sm text-slate-600 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-blue-50/50 to-white border-blue-100/50" hoverEffect={false}>
            <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Processing Time
            </h3>
            <p className="text-sm text-slate-500 font-medium">Usually takes 3-5 working days for complete processing through all 4 approval stages.</p>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-amber-50/50 to-white border-amber-100/50" hoverEffect={false}>
            <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Important Note
            </h3>
            <p className="text-sm text-slate-500 font-medium">Accommodation is temporary. Management may ask residents to vacate on short notice depending on regular student availability.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
