import React from "react";
import RolesBoard from "./dashboard/RolesBoard";
import TaskProgressDashboard from "./dashboard/TaskProgressDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trophy, Medal } from "lucide-react";
import Sidebar from "./dashboard/Sidebar";

interface TaskProps {
  userName?: string;
  level?: number;
  avatarUrl?: string;
  notifications?: number;
}

const Task = ({
  userName = "John Doe",
  level = 5,
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notifications = 3,
}: TaskProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        userName={userName}
        userAvatar={avatarUrl}
        level={level}
      />

      <main className="flex-1 px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Task Progress Dashboard */}
          <TaskProgressDashboard />

          {/* Roles and Leaderboard */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main content area with RolesBoard */}
            <div className="flex-1">
              <RolesBoard />
            </div>

            {/* Right sidebar with Leaderboard */}
            <aside className="w-full lg:w-[300px]">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Alice Smith", points: 1200, role: "UI/UX Intern" },
                      {
                        name: "Bob Johnson",
                        points: 980,
                        role: "Frontend Intern",
                      },
                      {
                        name: "Carol White",
                        points: 850,
                        role: "Full Stack Intern",
                      },
                    ].map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <Medal className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.role}
                            </p>
                          </div>
                        </div>
                        <div className="font-semibold text-yellow-600">
                          {user.points} XP
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Task;
