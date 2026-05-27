import Header from "../../components/layout/Header";


const Dashboard = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Content */}
        <main className="p-6">

          {/* Welcome */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Here's what's happening today.
            </p>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h2 className="text-3xl font-bold mt-3">
                1,245
              </h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-3">
                $12,450
              </h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm">
                Active Sessions
              </p>

              <h2 className="text-3xl font-bold mt-3">
                324
              </h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm">
                New Orders
              </p>

              <h2 className="text-3xl font-bold mt-3">
                89
              </h2>
            </div>

          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-xl font-semibold text-gray-800">
                Recent Activity
              </h2>

              <button className="text-blue-600 hover:underline text-sm">
                View All
              </button>

            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between border-b pb-3">

                <div>
                  <p className="font-medium text-gray-800">
                    New user registered
                  </p>

                  <p className="text-sm text-gray-500">
                    2 minutes ago
                  </p>
                </div>

                <span className="text-green-500 text-sm font-medium">
                  Success
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">

                <div>
                  <p className="font-medium text-gray-800">
                    Payment completed
                  </p>

                  <p className="text-sm text-gray-500">
                    10 minutes ago
                  </p>
                </div>

                <span className="text-blue-500 text-sm font-medium">
                  Paid
                </span>
              </div>

              <div className="flex items-center justify-between">

                <div>
                  <p className="font-medium text-gray-800">
                    Server restarted
                  </p>

                  <p className="text-sm text-gray-500">
                    1 hour ago
                  </p>
                </div>

                <span className="text-orange-500 text-sm font-medium">
                  System
                </span>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;