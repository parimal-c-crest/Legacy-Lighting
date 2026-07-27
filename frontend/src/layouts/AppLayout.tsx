import { NavLink, Outlet } from "react-router-dom";
import { getStoredUser, logout } from "../api/auth";

// Nav labels match the live Lovable UI screen titles — see docs/4-ui/1-navigation.md
const navItems = [
  { to: "/", label: "Executive Dashboard", end: true },
  { to: "/intake", label: "Project Intake" },
  { to: "/workbench", label: "Estimator Workbench" },
  { to: "/projects", label: "All Projects" },
  { to: "/reports", label: "Reports" },
  { to: "/settings", label: "Settings" },
];

export default function AppLayout() {
  const user = getStoredUser();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="flex w-56 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-4">
          <p className="text-sm font-semibold text-gray-900">Legacy Lighting</p>
          <p className="text-xs text-gray-500">Sales Task Workspace</p>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm ${
                  isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <div className="border-t border-gray-200 p-4 text-xs text-gray-500">
            <p className="font-medium text-gray-900">{user.displayName}</p>
            <p>{user.role}</p>
            <button
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="mt-2 text-gray-500 underline"
            >
              Sign out
            </button>
          </div>
        )}
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
