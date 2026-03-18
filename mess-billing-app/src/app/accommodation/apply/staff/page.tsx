'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StaffAccommodationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const applicantType = 'project_staff';
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
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
  const [declaration, setDeclaration] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Step Validation Checkers
  const canGoNext = () => {
    if (currentStep === 1) {
      return applicantName && gender && department && contactNo && address;
    }
    if (currentStep === 2) {
      return mentorName && mentorEmail;
    }
    if (currentStep === 3) {
      return arrivalDate && arrivalTime && departureDate && departureTime;
    }
    return true;
  };

  const nextStep = () => {
    if (canGoNext() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaration || !category) {
       alert('Please accept the declaration and select a category.');
       return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/accommodation/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           applicantType,
           category,
           applicantName,
           gender,
           department,
           contactNo,
           address,
           mentorName,
           mentorEmail,
           arrivalDate,
           arrivalTime,
           departureDate,
           departureTime,
           financialSupportAmount: null // Not collected for staff
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        alert('Failed to submit: ' + errorData.error);
      }
    } catch (e) {
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-teal-50/50 via-white to-teal-50/50">
        <div className="max-w-md w-full bg-white/60 backdrop-blur-2xl p-10 rounded-3xl border border-white/60 shadow-xl text-center">
          <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Application Submitted!</h2>
          <p className="text-slate-600 font-medium mb-8">
            Your accommodation application for Project Staff / Scholar has been successfully submitted to the Hostel Management Section. You can track its status in your dashboard.
          </p>
          <Link href="/accommodation/dashboard" className="inline-block bg-teal-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-teal-700 transition shadow-md">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[32rem] bg-teal-600 rounded-b-[4rem] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-32 -left-24 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col h-full max-h-[90vh]">
        <div className="flex justify-between items-center mb-6 text-white shrink-0">
          <div>
            <Link href="/accommodation/apply" className="flex items-center text-teal-100 hover:text-white font-medium mb-2 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Selection
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Staff Accommodation Form</h1>
            <p className="mt-2 text-teal-100 font-medium">Project Staff & JRF / Post Doc Categorization</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(20,184,166,0.1)] overflow-hidden border border-slate-100 flex flex-col flex-1 min-h-0">
          
          {/* Progress Bar Header - Shrink 0 to keep it visible while scrolling */}
          <div className="bg-slate-50/80 border-b border-slate-100 p-6 sm:px-10 shrink-0">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-500 rounded-full z-0 transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
              
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${currentStep >= step ? 'bg-teal-600 text-white shadow-md shadow-teal-200' : 'bg-white text-slate-400 border-2 border-slate-200'}`}>
                    {currentStep > step ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      step
                    )}
                  </div>
                  <div className={`hidden sm:block absolute top-12 mt-1 text-xs font-bold whitespace-nowrap transition-colors duration-300 ${currentStep >= step ? 'text-teal-700' : 'text-slate-400'}`}>
                    {step === 1 && 'Applicant Info'}
                    {step === 2 && 'Faculty PI'}
                    {step === 3 && 'Stay Duration'}
                    {step === 4 && 'Category Select'}
                  </div>
                </div>
              ))}
            </div>
            <div className="sm:hidden mt-4 text-center text-sm font-bold text-teal-700">
               Step {currentStep} of {totalSteps}
            </div>
          </div>

          {/* Form Content Body - flex-1 and overflow-y-auto enables internal scrolling */}
          <div className="p-8 sm:p-10 flex-1 overflow-y-auto">
             
            {/* STEP 1: Applicant Information */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">Applicant Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" value={applicantName} onChange={e => setApplicantName(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none" placeholder="Enter applicant name" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                    <select value={gender} onChange={e => setGender(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none bg-white">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Department / Affiliation</label>
                    <input type="text" value={department} onChange={e => setDepartment(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none" placeholder="e.g. Mechanical Engineering" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number</label>
                    <input type="tel" value={contactNo} onChange={e => setContactNo(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none" placeholder="+91 0000000000" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Address</label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)} required rows={3} className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none resize-none" placeholder="Current residential address..."></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Faculty PI */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">Faculty PI / Supervisor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Name of Faculty PI</label>
                    <input type="text" value={mentorName} onChange={e => setMentorName(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none" placeholder="PI Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Faculty Email (@iitrpr.ac.in)</label>
                    <input type="email" value={mentorEmail} onChange={e => setMentorEmail(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none" placeholder="faculty@iitrpr.ac.in" />
                  </div>
                </div>
                <div className="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600 font-medium">
                   <div className="flex items-start">
                     <svg className="w-5 h-5 text-teal-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <div>
                       Your faculty PI will receive a notification to verify your request. Please ensure you provide their correct institute email address. They must approve this before the HOD and Hostel Management can process it.
                     </div>
                   </div>
                </div>
              </div>
            )}

            {/* STEP 3: Stay Duration */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">Stay Duration & Timings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                        Arrival Details
                     </h3>
                     <div className="space-y-5">
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Date of Arrival</label>
                         <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                       </div>
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Estimated Time</label>
                         <input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                       </div>
                     </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Departure Details
                     </h3>
                     <div className="space-y-5">
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Date of Departure</label>
                         <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                       </div>
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Estimated Time</label>
                         <input type="time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} required className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                       </div>
                     </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start shadow-sm">
                   <svg className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                   </svg>
                   <div className="text-sm text-yellow-800 font-medium">
                     Accommodation in the hostel will be provided on a temporary basis only. Hostel Management Section can ask the resident to vacate the room at any time on short notice depending on regular student availability.
                   </div>
                </div>
              </div>
            )}

            {/* STEP 4: Category Select */}
            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">Financial & Category Rules</h2>
                <div className="space-y-6">

                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-4">Select Hostel Room Rent Category</label>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <label className={`cursor-pointer flex flex-col h-full border-2 rounded-2xl p-6 transition-all ${category === 'A' ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600 shadow-md transform -translate-y-1' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                         <div className="flex items-center mb-2 shrink-0">
                           <input type="radio" required name="category" value="A" checked={category==='A'} className="w-5 h-5 text-teal-600 focus:ring-teal-500 border-slate-300" onChange={(e) => setCategory(e.target.value)} />
                           <span className="ml-3 font-extrabold text-slate-800 text-lg">Category A</span>
                         </div>
                         <div className="flex-1 flex flex-col justify-between">
                            <p className="text-sm text-slate-500 ml-8 mt-1 font-medium">Project Staff / Post Docs / JRF / SRF / RA / PA</p>
                            <ul className="text-sm text-teal-800 font-bold mt-4 ml-8 space-y-2 bg-teal-100/50 p-3 rounded-xl border border-teal-100">
                              <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Rent: ₹200/day (max ₹4000/month)</li>
                              <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Refundable Security: ₹10,000</li>
                            </ul>
                         </div>
                       </label>
                       
                       <label className={`cursor-pointer flex flex-col h-full border-2 rounded-2xl p-6 transition-all ${category === 'B' ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600 shadow-md transform -translate-y-1' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                         <div className="flex items-center mb-2 shrink-0">
                           <input type="radio" required name="category" value="B" checked={category==='B'} className="w-5 h-5 text-teal-600 focus:ring-teal-500 border-slate-300" onChange={(e) => setCategory(e.target.value)} />
                           <span className="ml-3 font-extrabold text-slate-800 text-lg">Category B</span>
                         </div>
                         <div className="flex-1 flex flex-col justify-between">
                            <p className="text-sm text-slate-500 ml-8 mt-1 font-medium">Visiting Scholars / Others</p>
                            <ul className="text-sm text-teal-800 font-bold mt-4 ml-8 space-y-2 bg-teal-100/50 p-3 rounded-xl border border-teal-100">
                              <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Rent: ₹150/day (max ₹3000/month)</li>
                              <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Refundable Security: ₹10,000</li>
                            </ul>
                         </div>
                       </label>
                     </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Upload Offer Letter / Proof</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition duration-150 cursor-pointer group relative">
                      <div className="space-y-1 text-center">
                         {!uploadedFile ? (
                            <>
                              <svg className="mx-auto h-12 w-12 text-slate-400 group-hover:text-teal-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="flex text-sm text-slate-600 justify-center">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500 px-3 py-1 shadow-sm border border-slate-200">
                                  <span>Select file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                </label>
                              </div>
                              <p className="text-xs text-slate-500 pt-1">PDF, PNG, JPG up to 5MB</p>
                            </>
                         ) : (
                            <div className="flex flex-col items-center">
                               <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-2">
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                               </div>
                               <div className="text-sm font-bold text-slate-800">{uploadedFile.name}</div>
                               <div className="text-xs text-slate-500 mb-3 ml-2">({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</div>
                               <label className="relative cursor-pointer bg-white rounded-md font-medium text-slate-500 hover:text-red-500 px-3 py-1 shadow-sm border border-slate-200 text-xs">
                                  <span>Change replace file</span>
                                  <input id="file-upload-replace" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                               </label>
                            </div>
                         )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-slate-100/50 rounded-2xl border border-slate-200 mt-6 shadow-sm">
                     <label className="flex items-start cursor-pointer group">
                       <div className="flex items-center h-5 mt-0.5 shrink-0">
                         <input type="checkbox" checked={declaration} onChange={e => setDeclaration(e.target.checked)} required className="w-5 h-5 text-teal-600 rounded border-slate-400 focus:ring-teal-500 transition-colors cursor-pointer" />
                       </div>
                       <div className="ml-4 text-sm text-slate-700 leading-relaxed font-semibold group-hover:text-slate-900 transition-colors">
                         I have gone through all rules and regulations of the hostel and will abide by the same during my stay at the hostel. In addition, I agree to vacate the room as and when asked by the Hostel Management Section.
                       </div>
                     </label>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Form Footer / Navigation - Shrink 0 to anchor to bottom */}
          <div className="bg-slate-50 border-t border-slate-100 p-6 sm:px-10 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
               <button 
                type="button" 
                onClick={prevStep}
                className="px-6 py-3 font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-teal-50 hover:border-teal-200 rounded-xl transition-all shadow-sm flex items-center"
               >
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 Back
               </button>
            ) : (
               <div></div>
            )}

            {currentStep < totalSteps ? (
               <button 
                type="button" 
                onClick={nextStep}
                disabled={!canGoNext()}
                className="px-8 py-3 font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group flex items-center border border-teal-700"
               >
                 Next Step
                 <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
               </button>
            ) : (
               <button 
                type="button" 
                onClick={handleSubmit}
                disabled={loading || !declaration || !category}
                className="px-8 py-3.5 font-extrabold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed flex items-center focus:ring-4 focus:ring-teal-500/30 transform active:scale-95"
               >
                 {loading ? (
                   <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                   </>
                 ) : (
                   <>
                     Submit Application
                     <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                   </>
                 )}
               </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
