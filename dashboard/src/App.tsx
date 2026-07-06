import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center text-slate-500">
      {children}
    </div>
  );
}

export default function App() {
  const { session, me, loading } = useAuth();

  if (loading) {
    return <FullScreen>Loading…</FullScreen>;
  }

  const isPrivileged = me?.role === "ADMIN" || me?.role === "DEV";

  return (
    <Routes>
      <Route
        path="/login"
        element={
          session && isPrivileged ? <Navigate to="/" replace /> : <Login />
        }
      />
      <Route
        path="/*"
        element={
          !session ? (
            <Navigate to="/login" replace />
          ) : !isPrivileged ? (
            <FullScreen>
              <div className="text-center">
                <p className="text-lg font-medium text-slate-700">
                  Access denied
                </p>
                <p className="mt-1 text-sm">
                  Your account ({me?.role ?? "unknown"}) cannot use the admin
                  dashboard.
                </p>
              </div>
            </FullScreen>
          ) : (
            <Dashboard />
          )
        }
      />
    </Routes>
  );
}
