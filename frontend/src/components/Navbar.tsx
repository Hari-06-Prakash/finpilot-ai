import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell
            size={22}
            className="text-slate-700 hover:text-blue-600 transition"
          />

          <span className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-2">

          <UserCircle
            size={36}
            className="text-blue-600"
          />

          <div>

            <p className="font-semibold">
              Hari
            </p>

            <p className="text-xs text-gray-500">
              Personal Account
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}