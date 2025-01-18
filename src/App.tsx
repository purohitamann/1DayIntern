import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../login";
import LogoutButton from "../logout";
import Profile from "../profile";
import Sidebar from "./components/dashboard/Sidebar";
import TaskBoard from "./components/dashboard/TaskBoard";
import GameBoard from "./components/dashboard/GameBoard";
import BulletinBoard from "./components/dashboard/BulletinBoard";
import Dashboard from "./components/bot";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Auth0 React Integration</h1>
        <div className="mt-2">
          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <LogoutButton />
              <Profile />
            </div>
          )}
        </div>
      </header>

      {isAuthenticated ? (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <div className="glass-effect card-hover rounded-md p-6 text-xl text-white">
                    Loading...
                  </div>
                </div>
              }
            >
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<TaskBoard />} />
                  <Route path="/games" element={<GameBoard />} />
                  <Route path="/bulletin" element={<BulletinBoard />} />
                  <Route path="/bot" element={<Dashboard />} />
                </Routes>
              </div>
            </Suspense>
          </main>
        </div>
      ) : (
        <div className="text-center p-10">
          <h2 className="text-lg font-semibold text-gray-500">
            Please log in to access the dashboard.
          </h2>
        </div>
      )}

      {/* Callback Route */}
      <Routes>
        <Route path="/callback" element={<div>Callback Handler</div>} />
      </Routes>
    </div>
  );
};

export default App;
