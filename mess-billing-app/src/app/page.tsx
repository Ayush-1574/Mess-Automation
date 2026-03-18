'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PortalLandingPage() {
  const router = useRouter();

  const apps = [
    {
      name: 'Mess Billing & Rebate',
      description: 'Manage mess bills, rebates, fees, and student records.',
      path: '/mess',
      color: 'indigo',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      borderHover: 'hover:border-indigo-300',
      icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zm-7-8V7m0 6v.01',
      status: 'Active',
      statusColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      name: 'No Objection Certificate',
      description: 'Apply for and track NOC requests for various purposes.',
      path: '/noc',
      color: 'emerald',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderHover: 'hover:border-emerald-300',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-700',
    },
    {
    name: 'Accommodation Forms',
    description: 'Apply for guest stay, internships, and temporary accommodation requests.',
    path: '/accommodation/forms',
    color: 'blue',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderHover: 'hover:border-blue-300',
    icon: 'M12 8c-3.866 0-7 1.343-7 3v5h14v-5c0-1.657-3.134-3-7-3zm0-2a2 2 0 100-4 2 2 0 000 4z',
    status: 'Active',
    statusColor: 'bg-blue-100 text-blue-700',
  }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-800 mb-4">
            Hostel Services Portal
          </h1>
          <p className="text-slate-500 text-lg">
            Streamlined platforms for mess and accommodation services
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Mess Card */}
          <Link href="/login" className="group">
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-indigo-600">
                Mess & Rebates
              </h2>
              <p className="text-slate-500">
                Manage bills, attendance, rebates, and finances.
              </p>
            </div>
          </Link>

          {/* Accommodation Card */}
          <Link href="/accommodation" className="group">
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-emerald-600">
                Accommodation
              </h2>
              <p className="text-slate-500">
                Submit and track accommodation requests.
              </p>
            </div>
          </Link>

        </div>

        {/* Dynamic Apps Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app) => (
            <button
              key={app.path}
              onClick={() => app.status === 'Active' && router.push(app.path)}
              disabled={app.status !== 'Active'}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition text-left"
            >
              <h3 className="text-lg font-bold">{app.name}</h3>
              <p className="text-sm text-slate-500">{app.description}</p>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}