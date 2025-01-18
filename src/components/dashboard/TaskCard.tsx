import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Trophy, Star, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface TaskCardProps {
  title?: string;
  description?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  rewards?: number;
  progress?: number;
  timeEstimate?: string;
}

const TaskCard = ({
  title = "Build a Portfolio Website",
  description = "Create a professional portfolio website to showcase your projects and skills",
  difficulty = "Medium",
  rewards = 100,
  progress = 0,
  timeEstimate = "2-3 hours",
}: TaskCardProps) => {
  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  };

  return (
    <Card className="w-[280px] h-[180px] bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold truncate">{title}</CardTitle>
          <Badge
            variant="secondary"
            className={`${difficultyColors[difficulty]} text-white`}
          >
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="text-sm line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-between items-center text-sm text-gray-600">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{timeEstimate}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Estimated time to complete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>{rewards}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Points reward</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
