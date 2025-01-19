// import React from "react";
// import RolesBoard from "./dashboard/RolesBoard";
// import TaskProgressDashboard from "./dashboard/TaskProgressDashboard";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Trophy, Medal } from "lucide-react";
// import Sidebar from "./dashboard/Sidebar";

// interface TaskProps {
//   userName?: string;
//   level?: number;
//   avatarUrl?: string;
//   notifications?: number;
// }

// const Task = ({
//   userName = "John Doe",
//   level = 5,
//   avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//   notifications = 3,
// }: TaskProps) => {
//   return (
//     <div className="min-h-screen bg-background flex">
//       <Sidebar
//         userName={userName}
//         userAvatar={avatarUrl}
//         level={level}
//       />

//       <main className="flex-1 px-6 py-8 max-w-[1400px] mx-auto">
//         <div className="flex flex-col gap-8">
//           {/* Task Progress Dashboard */}
//           <TaskProgressDashboard />

//           {/* Roles and Leaderboard */}
//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* Main content area with RolesBoard */}
//             <div className="flex-1">
//               <RolesBoard />
//             </div>

//             {/* Right sidebar with Leaderboard */}
//             <aside className="w-full lg:w-[300px]">
//               <Card className="minecraft-panel">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Trophy className="w-5 h-5 text-[#FFD700] float" />
//                     Top Performers
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {[
//                       { name: "Alice Smith", points: 1200, role: "UI/UX Intern" },
//                       {
//                         name: "Bob Johnson",
//                         points: 980,
//                         role: "Frontend Intern",
//                       },
//                       {
//                         name: "Carol White",
//                         points: 850,
//                         role: "Full Stack Intern",
//                       },
//                     ].map((user, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-2 rounded-lg bg-muted/50 minecraft-panel"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
//                             <Medal className="w-4 h-4 text-[#FFD700] glow" />
//                           </div>
//                           <div>
//                             <p className="font-medium heading-text">{user.name}</p>
//                             <p className="text-sm body-text">
//                               {user.role}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="font-semibold text-[#FFD700]">
//                           {user.points} XP
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </aside>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Task;
import React from "react";

// UI + Layout
import DashboardHeader from "./dashboard/DashboardHeader";
import Sidebar from "./dashboard/Sidebar";

// Dashboard Features
import TaskProgressDashboard from "./dashboard/TaskProgressDashboard";
import RolesBoard from "./dashboard/RolesBoard";
import BulletinBoard from "./dashboard/BulletinBoard";
import GameBoard from "./dashboard/GameBoard";
import AIManagerChat from "./dashboard/AIManagerChat";

// Other components? (e.g., AuthButtons, if needed)
// import { AuthButtons } from "./dashboard/AuthButtons";

function Home() {
  // You might pass user info, avatar URL, and so on, as props or from a context/store
  const userName = "John Doe";
  const level = 5;
  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John";
  const notifications = 3;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      <DashboardHeader
        userName={userName}
        level={level}
        avatarUrl={avatarUrl}
        notifications={notifications}
      />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar
          userName={userName}
          userAvatar={avatarUrl}
          level={level}
        />

        {/* Main section (scrollable content) */}
        <main className="flex-1 p-6 max-w-[1400px] mx-auto space-y-6">
          {/* Example: Task Progress at top */}
          <TaskProgressDashboard />

          {/* Example: Boards in one row */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Roles Board or other large center content */}
            <div className="flex-1">
              <RolesBoard />
            </div>

            {/* Optional: Another column with bulletins or anything else */}
            <div className="w-full lg:w-[400px] space-y-6">
              <BulletinBoard />
              <GameBoard />
            </div>
          </div>

          {/* AI Chat Manager (could be a floating or pinned panel instead) */}

        </main>
      </div>
    </div>
  );
}

export default Home;
