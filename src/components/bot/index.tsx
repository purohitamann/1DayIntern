import React from "react";
import AIManagerChat from "../dashboard/AIManagerChat";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "../ui/calendar";
import DatePickerWithRange from "../ui/date-picker-with-range"
import { Badge } from "../ui/badge";
import { CalendarIcon, Bot } from "lucide-react";

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
}

const Dashboard = () => {
  const [tasks] = React.useState<Task[]>([
    {
      id: "1",
      title: "Complete Frontend Task",
      dueDate: new Date(),
      status: "pending",
      priority: "high"
    },
    {
      id: "2",
      title: "Review Code",
      dueDate: new Date(Date.now() + 86400000),
      status: "pending",
      priority: "medium"
    }
  ]);

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* AI Chat Section */}
      <div className="w-full">
        <AIManagerChat />
      </div>

      {/* Calendar and Tasks Section */}
      <div className="space-y-6">
        {/* Calendar Card */}
        <Card className="
          minecraft-panel 
          card-hover 
          glass-effect 
          rounded-lg 
          text-pure-white
        ">
          <CardHeader className="p-4 border-b border-white/20">
            <CardTitle className="flex items-center gap-2 font-silkscreen">
              <CalendarIcon className="w-5 h-5 text-sunny-yellow" />
              Task Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <DatePickerWithRange className="w-full" />
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card className="
          minecraft-panel 
          card-hover 
          glass-effect 
          rounded-lg 
          text-pure-white
        ">
          <CardHeader className="p-4 border-b border-white/20">
            <CardTitle className="flex items-center gap-2 font-silkscreen">
              <Bot className="w-5 h-5 text-sunny-yellow" />
              AI Assigned Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="
                    flex 
                    flex-col
                    gap-2
                    p-4
                    pixel-border
                    bg-[#4b694e]
                    hover:bg-[#5c743c]
                    transition-all
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="font-silkscreen text-lg">{task.title}</span>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className={`
                          ${task.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}
                          pixel-border
                        `}
                      >
                        {task.status}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`
                          ${getPriorityColor(task.priority)}
                          pixel-border
                        `}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm opacity-75 font-silkscreen">
                    Due: {task.dueDate.toLocaleDateString()}
                  </div>
                  <div className="w-full bg-[#3d4a2e] h-2 pixel-border">
                    <div
                      className="bg-sunny-yellow h-full"
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
