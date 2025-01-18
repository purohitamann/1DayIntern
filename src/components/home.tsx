import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import TaskBoard from "./dashboard/TaskBoard";
import AIManagerChat from "./dashboard/AIManagerChat";
import ProgressPanel from "./dashboard/ProgressPanel";
import { Button } from "./ui/button";
import { PlusCircle, LineChart, MessageSquare } from "lucide-react";

interface HomeProps {
  userName?: string;
  level?: number;
  avatarUrl?: string;
  notifications?: number;
}

const Home = ({
  userName = "John Doe",
  level = 5,
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notifications = 3,
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        userName={userName}
        level={level}
        avatarUrl={avatarUrl}
        notifications={notifications}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Quick Actions */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Start New Task
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            Check Progress
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Connect with Manager
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area with TaskBoard */}
          <div className="flex-1">
            <TaskBoard />
          </div>

          {/* Right sidebar with AI Manager and Progress Panel */}
          <aside className="w-full lg:w-auto space-y-6">
            <AIManagerChat />
            <ProgressPanel />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Home;
