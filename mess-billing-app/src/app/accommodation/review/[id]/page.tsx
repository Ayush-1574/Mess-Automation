import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import ReviewActionForm from "./ReviewActionForm";

const prisma = new PrismaClient();

export default async function RequestReviewPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const requestId = parseInt(id);

  if (isNaN(requestId)) redirect('/');

  // Auth check
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) redirect('/accommodation/reviewer-login');
  const session = await decrypt(sessionCookie);

  if (!session || session.role !== 'accommodation_reviewer') {
    redirect('/accommodation/reviewer-login');
  }

  // Fetch request
  const req = await prisma.accommodationRequest.findUnique({
    where: { id: requestId }
  });

  if (!req) {
    return (
      <div className="p-8 max-w-2xl mx-auto"><Card className="p-12 text-center text-red-500 font-bold">Request not found.</Card></div>
    );
  }

  // Check if current reviewer can act on this based on their role
  // Determines what status they manage
  let roleStatus = '';
  if (session.reviewerRole === 'FACULTY') roleStatus = req.mentorStatus;
  else if (session.reviewerRole === 'HOD') roleStatus = req.hodStatus;
  else if (session.reviewerRole === 'REGISTRAR') roleStatus = req.registrarStatus;
  else if (session.reviewerRole === 'WARDEN') roleStatus = req.wardenStatus;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/accommodation/${session.reviewerRole.toLowerCase() === 'faculty' ? 'mentor' : session.reviewerRole.toLowerCase()}`} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-800">Review Application #{req.id}</h1>
      </div>

      <Card className="p-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
             <h3 className="text-xl font-bold border-b pb-2">Applicant Details</h3>
             <div><p className="text-sm font-bold text-slate-500 uppercase">Name</p><p className="font-semibold text-lg">{req.applicantName}</p></div>
             <div><p className="text-sm font-bold text-slate-500 uppercase">Type / Role</p><p className="font-semibold">{req.applicantType.replace('_', ' ')}</p></div>
             <div><p className="text-sm font-bold text-slate-500 uppercase">Contact No</p><p className="font-semibold">{req.contactNo}</p></div>
             <div><p className="text-sm font-bold text-slate-500 uppercase">Gender / Dept</p><p className="font-semibold">{req.gender} | {req.department}</p></div>
             <div><p className="text-sm font-bold text-slate-500 uppercase">Category</p><p className="font-semibold">{req.category}</p></div>
          </div>
          
          <div className="space-y-6">
             <h3 className="text-xl font-bold border-b pb-2">Stay Details</h3>
             <div><p className="text-sm font-bold text-slate-500 uppercase">Arrival</p><p className="font-semibold">{req.arrivalDate.toLocaleDateString()} at {req.arrivalTime}</p></div>
             <div><p className="text-sm font-bold text-slate-500 uppercase">Departure</p><p className="font-semibold">{req.departureDate.toLocaleDateString()} at {req.departureTime}</p></div>
             
             {req.financialSupportAmount && (
               <div><p className="text-sm font-bold text-slate-500 uppercase">Financial Support</p><p className="font-bold text-emerald-600 text-xl">₹{req.financialSupportAmount}</p></div>
             )}

             {req.documentUrl && (
               <div className="pt-4">
                 <a href={req.documentUrl} target="_blank" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm">
                    View Document Proof
                 </a>
               </div>
             )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Current Approvals</h3>
          <div className="grid grid-cols-4 gap-4">
             <StatusBox label="Mentor" status={req.mentorStatus} remarks={req.mentorRemarks} />
             <StatusBox label="HOD" status={req.hodStatus} remarks={req.hodRemarks} />
             <StatusBox label="Registrar" status={req.registrarStatus} remarks={req.registrarRemarks} />
             <StatusBox label="Warden" status={req.wardenStatus} remarks={req.wardenRemarks} />
          </div>
        </div>
      </Card>

      {roleStatus === 'PENDING' ? (
        <Card className="p-8 bg-slate-50 border-slate-200">
           <h3 className="text-xl font-bold text-slate-800 mb-6">Your Decision</h3>
           <ReviewActionForm requestId={req.id} dashboardPath={`/accommodation/${session.reviewerRole.toLowerCase() === 'faculty' ? 'mentor' : session.reviewerRole.toLowerCase()}`} />
        </Card>
      ) : (
        <Card className="p-8 bg-green-50/50 border-green-100/50 text-center">
           <h3 className="text-xl font-bold text-green-800">You have already processed this request.</h3>
           <p className="text-green-600 font-medium">Your status: {roleStatus}</p>
        </Card>
      )}
    </div>
  );
}

function StatusBox({ label, status, remarks }: { label: string, status: string, remarks: string | null }) {
   if (status === 'PENDING') return <div className="p-3 bg-slate-50 border rounded-lg"><p className="text-xs font-bold text-slate-500 uppercase">{label}</p><p className="text-slate-400 font-medium mt-1">⏳ Pending</p></div>;
   if (status === 'APPROVED') return <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg"><p className="text-xs font-bold text-emerald-700 uppercase">{label}</p><p className="text-emerald-600 font-bold mt-1">✅ Approved</p>{remarks && <p className="text-xs text-emerald-800 bg-emerald-100/50 mt-2 p-1 rounded italic">&quot;{remarks}&quot;</p>}</div>;
   return <div className="p-3 bg-red-50 border border-red-100 rounded-lg"><p className="text-xs font-bold text-red-700 uppercase">{label}</p><p className="text-red-600 font-bold mt-1">❌ Rejected</p>{remarks && <p className="text-xs text-red-800 bg-red-100/50 mt-2 p-1 rounded italic">&quot;{remarks}&quot;</p>}</div>;
}
