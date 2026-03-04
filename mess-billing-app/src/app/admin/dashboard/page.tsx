export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Total Students</h3>
                    <p className="text-4xl text-blue-600 font-bold">--</p>
                    <p className="text-sm text-gray-500 mt-2">Active students in database</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Pending Rebates</h3>
                    <p className="text-4xl text-orange-500 font-bold">--</p>
                    <p className="text-sm text-gray-500 mt-2">Rebates requiring approval</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Bills Generated</h3>
                    <p className="text-4xl text-green-600 font-bold">--</p>
                    <p className="text-sm text-gray-500 mt-2">For current month</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    {/* Add buttons or links here if needed */}
                </div>
            </div>
        </div>
    );
}
