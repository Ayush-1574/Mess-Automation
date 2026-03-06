import { Card } from '../../../components/ui/Card';

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
                <p className="text-slate-500 mt-2 font-medium">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Total Students', value: '--', subtext: 'Active students in database', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-indigo-500', shadow: 'shadow-indigo-200' },
                    { title: 'Pending Rebates', value: '--', subtext: 'Requiring approval', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-orange-500', shadow: 'shadow-orange-200' },
                    { title: 'Bills Generated', value: '--', subtext: 'For current month', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', color: 'bg-emerald-500', shadow: 'shadow-teal-200' }
                ].map((stat, idx) => (
                    <Card key={idx} className="p-6 group">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">{stat.title}</h3>
                                <p className="text-4xl font-extrabold text-slate-800 tracking-tight mt-2">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg ${stat.shadow} transform group-hover:rotate-6 transition-transform`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path></svg>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 mt-5 relative z-10 font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            {stat.subtext}
                        </p>
                    </Card>
                ))}
            </div>

            <Card className="mt-10 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Placeholder for quick action buttons */}
                    <div className="h-24 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/50 transition-colors cursor-pointer">
                        + New Action
                    </div>
                </div>
            </Card>
        </div>
    );
}
