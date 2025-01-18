import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rewards: number;
  progress: number;
  timeEstimate: string;
  dueDate?: string;
}

interface TaskProgressDashboardProps {
  tasks?: Task[];
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Build Portfolio Website",
    description: "Create a professional portfolio website to showcase your projects",
    difficulty: "Medium",
    rewards: 100,
    progress: 60,
    timeEstimate: "2-3 hours",
    dueDate: "2024-02-01",
  },
  {
    id: "2",
    title: "Complete JavaScript Course",
    description: "Finish the advanced JavaScript programming course",
    difficulty: "Hard",
    rewards: 150,
    progress: 30,
    timeEstimate: "4-5 hours",
    dueDate: "2024-02-15",
  },
  {
    id: "3",
    title: "Update LinkedIn Profile",
    description: "Refresh your LinkedIn profile with recent achievements",
    difficulty: "Easy",
    rewards: 50,
    progress: 70,
    timeEstimate: "1 hour",
    dueDate: "2024-01-30",
  },
];

const TaskProgressDashboard = ({ tasks = defaultTasks }: TaskProgressDashboardProps) => {
  const getDifficultyColor = (difficulty: Task["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "text-green-600";
    if (progress >= 50) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Progress Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Time Estimate</TableHead>
              <TableHead>Rewards</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {task.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${getDifficultyColor(task.difficulty)} text-white`}
                  >
                    {task.difficulty}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Progress value={task.progress} className="h-2" />
                    <span className={`text-sm ${getProgressColor(task.progress)}`}>
                      {task.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.timeEstimate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-yellow-100">
                    {task.rewards} XP
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TaskProgressDashboard;
