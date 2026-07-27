import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/login/LoginPage";
import ExecutiveDashboardPage from "../pages/executive-dashboard/ExecutiveDashboardPage";
import RequestIntakePage from "../pages/request-intake/RequestIntakePage";
import TaskWorkbenchPage from "../pages/task-workbench/TaskWorkbenchPage";
import Projects360Page from "../pages/projects-360/Projects360Page";
import ReportsPage from "../pages/reports/ReportsPage";
import SettingsPage from "../pages/settings-administration/SettingsPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <ExecutiveDashboardPage /> },
          { path: "/intake", element: <RequestIntakePage /> },
          { path: "/workbench", element: <TaskWorkbenchPage /> },
          { path: "/projects", element: <Projects360Page /> },
          { path: "/reports", element: <ReportsPage /> },
          { path: "/settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
]);
