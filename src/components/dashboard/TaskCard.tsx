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
  // Map difficulties to color classes (adjust to your theme as desired)
  const difficultyColors = {
    Easy: "bg-green-600",
    Medium: "bg-yellow-600",
    Hard: "bg-red-600",
  };

  return (
    <Card
      className="
        minecraft-panel
        card-hover
        w-[280px]
        p-4
        text-white
        cursor-pointer
        rounded-md
        font-silkscreen  /* or your preferred pixel font */
        transition-transform
        hover:scale-105
      "
    >
      <CardHeader className="p-0 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base md:text-lg font-bold truncate">
            {title}
          </CardTitle>
          <Badge
            variant="secondary"
            className={`
              ${difficultyColors[difficulty]} 
              text-white
              px-2
              py-1
              rounded-sm
            `}
          >
            {difficulty}
          </Badge>
        </div>
        <CardDescription
          className="
            text-sm
            text-white/80
            mt-1
            line-clamp-2
          "
        >
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 pt-2">
        <Progress
          value={progress}
          className="
            h-2 
            bg-white/20
            rounded-full
            overflow-hidden
            mb-2
          "
        />

        <div className="flex justify-between items-center text-sm text-white/80">
          {/* Time Estimate Tooltip */}
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

          {/* Rewards (Points) Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>{rewards}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Points reward</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
