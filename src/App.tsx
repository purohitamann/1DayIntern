import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import TaskBoard from "./components/dashboard/TaskBoard";
import GameBoard from "./components/dashboard/GameBoard";
import BulletinBoard from "./components/dashboard/BulletinBoard";
import AIManagerChat from "./components/dashboard/AIManagerChat";
import Sidebar from "./components/dashboard/Sidebar";

function App() {
  return (
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
              <Route path="/bot" element={<AIManagerChat />} />
            </Routes>
          </div>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
