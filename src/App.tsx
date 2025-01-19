'use client';
import { useEffect } from "react";
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
import { useUser } from "./contexts/UserContext";
import Roles from "./components/dashboard/Roles";
import LoginPage from "./components/dashboard/Login";

const App = () => {
  const { isAuthenticated } = useAuth0();
  const { user, setUser } = useUser();
  const clicked = () => {
    const audioElement = new Audio("/assets/audio/click.ogg");
    audioElement.volume = 0.2;
    audioElement.play();
  };


  useEffect(() => {
    document.addEventListener("click", clicked);
    const fetchUser = async () => {
      const userData = await user; // Replace with your user fetching logic
      setUser(userData);

    };
    fetchUser();
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("click", clicked);
    };

  }, [setUser]);

  return (
    <div>
      <header className=" bg-gray-800 text-white">

        <div className="mt-0">
          {!isAuthenticated && <LoginPage />}
          {/* {isAuthenticated && (
            <div className="flex items-center gap-4">
              <LogoutButton />
              <Profile />
            </div>
          )} */}
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
                  {/* <Route path="/roles" element={<Roles />} /> */}
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
      {/* <Routes>
        <Route path="/callback" element={<div>Callback Handler</div>} />
      </Routes> */}
    </div>
  );
};

export default App;
