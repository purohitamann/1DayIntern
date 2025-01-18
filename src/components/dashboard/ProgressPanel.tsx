import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Trophy, Star, Target, Award, Zap } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Achievement {
  title: string;
  description: string;
  progress: number;
  completed: boolean;
}

interface Stats {
  level: number;
  totalPoints: number;
  tasksCompleted: number;
  currentStreak: number;
}

interface ProgressPanelProps {
  achievements?: Achievement[];
  stats?: Stats;
}

const ProgressPanel = ({
  achievements = [
    {
      title: "Task Master",
      description: "Complete 10 tasks",
      progress: 60,
      completed: false,
    },
    {
      title: "Quick Learner",
      description: "Complete 5 tasks in a week",
      progress: 100,
      completed: true,
    },
    {
      title: "Consistency King",
      description: "Maintain a 5-day streak",
      progress: 40,
      completed: false,
    },
  ],
  stats = {
    level: 5,
    totalPoints: 1250,
    tasksCompleted: 15,
    currentStreak: 3,
  },
}: ProgressPanelProps) => {
  return (
    <div className="w-[280px] space-y-4 bg-gray-50 p-4 rounded-lg">
      {/* Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Level {stats.level}</span>
            </div>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700"
            >
              {stats.totalPoints} XP
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{stats.tasksCompleted} Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm">{stats.currentStreak} Day Streak</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award
                          className={`w-5 h-5 ${
                            achievement.completed
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {achievement.title}
                        </span>
                      </div>
                      {achievement.completed && (
                        <Badge className="bg-green-100 text-green-700">
                          Complete
                        </Badge>
                      )}
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{achievement.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPanel;
