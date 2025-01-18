import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
    <div
      className="
        minecraft-panel
        card-hover
        w-[280px]
        p-4
        rounded-lg
        space-y-4
        text-pure-white
        font-silkscreen
      "
    >
      {/* Stats Section */}
      <Card
        className="
          glass-effect
          rounded-md
          shadow-md
          p-4
          space-y-4
          text-white
        "
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold uppercase tracking-wider">
            Your Progress
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Level & XP */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-sunny-yellow" />
              <span className="text-sm font-medium">Level {stats.level}</span>
            </div>

            <Badge
              variant="secondary"
              className="bg-transparent border border-purple-300 text-purple-300"
            >
              {stats.totalPoints} XP
            </Badge>
          </div>

          {/* Tasks & Streak */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-blue" />
              <span>{stats.tasksCompleted} Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-sunset-orange" />
              <span>{stats.currentStreak} Day Streak</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card
        className="
          glass-effect
          rounded-md
          shadow-md
          p-4
          space-y-4
          text-white
        "
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold uppercase tracking-wider">
            Achievements
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {achievements.map((achievement, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="space-y-2">
                    {/* Title & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award
                          className={`w-5 h-5 ${achievement.completed
                              ? "text-sunny-yellow"
                              : "text-gray-400"
                            }`}
                        />
                        <span className="text-sm font-medium">
                          {achievement.title}
                        </span>
                      </div>
                      {achievement.completed && (
                        <Badge
                          className="
                            bg-transparent
                            border border-green-300
                            text-green-300
                            text-xs
                          "
                        >
                          COMPLETE
                        </Badge>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <Progress
                      value={achievement.progress}
                      className="h-2 bg-pure-white/20"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-silkscreen text-sm text-center">
                    {achievement.description}
                  </p>
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
