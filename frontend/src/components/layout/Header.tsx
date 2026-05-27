import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-10">

          <h1 className="text-3xl font-bold text-blue-600">
            DriversUI
          </h1>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Analytics
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Projects
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Settings
            </a>

          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2">

            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 text-sm"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">

            <Bell
              size={22}
              className="text-gray-700"
            />

            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl">

            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                Swayam
              </p>

              <p className="text-xs text-gray-500">
                Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;