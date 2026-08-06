import {
  LayoutDashboard,
  Wallet,
  FolderKanban,
  BarChart3,
  PiggyBank,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const menuItem =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700";

  const activeMenu =
    "bg-blue-600 text-white";

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-blue-400">
          FinPilot AI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Personal Finance Manager
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeMenu : ""}`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeMenu : ""}`
          }
        >
          <Wallet size={20} />
          Expenses
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeMenu : ""}`
          }
        >
          <FolderKanban size={20} />
          Categories
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeMenu : ""}`
          }
        >
          <BarChart3 size={20} />
          Analytics
        </NavLink>

        <NavLink
            to="/budget"
            className={({ isActive }) =>
              `${menuItem} ${isActive ? activeMenu : ""}`
            }
          >
            <PiggyBank size={20} />
            Budget
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeMenu : ""}`
          }
        >
          <User size={20} />
          Profile
        </NavLink>

      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}