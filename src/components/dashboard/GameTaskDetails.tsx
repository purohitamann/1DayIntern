import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import Confetti from "react-confetti";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";
import { Clock, Trophy, Star } from "lucide-react";

interface GameTaskDetailsProps {
  game: {
    id: string;
    title: string;
    description: string;
    companyDescription: string;
    tasks: {
      id: string;
      description: string;
      completed: boolean;
    }[];
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskProgress: boolean[];
  onTaskToggle: (taskIndex: number) => void;
}

const GameTaskDetails = ({ 
  game, 
  open, 
  onOpenChange,
  taskProgress,
  onTaskToggle
}: GameTaskDetailsProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  // Set timer for 8 hours from now
  const expiryTimestamp = new Date();
  expiryTimestamp.setHours(expiryTimestamp.getHours() + 8);

  const {
    seconds,
    minutes,
    hours,
  } = useTimer({ 
    expiryTimestamp,
    onExpire: () => console.warn("Time's up!")
  });

  const handleComplete = async () => {
    setShowConfetti(true);
    setCompleted(true);
    toast({
      title: "Congratulations! 🎉",
      description: "You've completed the task successfully!",
      className: "glass-effect text-white",
    });
    setTimeout(() => {
      onOpenChange(false);
    }, 1000);
  };

  const allTasksCompleted = taskProgress.every(completed => completed);

  return (
    <>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] glass-effect border-none bg-opacity-90 text-white overflow-y-auto">
          <DialogHeader className="space-y-2 sticky top-0 bg-gray-900/90 backdrop-blur-sm z-10 pb-2">
            <DialogTitle className="text-xl font-bold tracking-wider text-center">
              {game.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Company Description */}
            <div className="glass-effect p-3 rounded-lg shadow-lg">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Star className="w-5 h-5 mr-2 text-sunny-yellow" />
                About the Company
              </h3>
              <p className="text-gray-200">{game.companyDescription}</p>
            </div>

            {/* Timer */}
            <div className="glass-effect p-3 rounded-lg text-center shadow-lg">
              <h3 className="text-sm font-semibold mb-2 flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2 text-sunny-yellow" />
                Time Remaining
              </h3>
              <div className="text-2xl font-mono text-sunny-yellow">
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
              </div>
            </div>

            {/* Task Description */}
            <div className="glass-effect p-3 rounded-lg shadow-lg">
              <h3 className="text-sm font-semibold mb-2">Task Description</h3>
              <p className="text-gray-200">{game.description}</p>
            </div>

            {/* Task Checklist */}
            <div className="glass-effect p-3 rounded-lg shadow-lg">
              <h3 className="text-sm font-semibold mb-3">Task Checklist</h3>
              <div className="space-y-2">
                {game.tasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-200 ${
                      taskProgress[index] ? 'bg-green-900/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <Checkbox
                      id={task.id}
                      checked={taskProgress[index]}
                      onCheckedChange={() => onTaskToggle(index)}
                      className="border-sunny-yellow data-[state=checked]:bg-sunny-yellow data-[state=checked]:text-black"
                    />
                    <label 
                      htmlFor={task.id}
                      className={`flex-1 cursor-pointer ${
                        taskProgress[index] ? 'line-through text-gray-400' : 'text-gray-200'
                      }`}
                    >
                      {task.description}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-2 sticky bottom-0 bg-gray-900/90 backdrop-blur-sm z-10 pb-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="glass-effect border-white/20 hover:bg-white/10 text-white"
              >
                Close
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!allTasksCompleted || completed}
                className={`glass-effect flex items-center space-x-2 ${
                  !allTasksCompleted || completed
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-sunny-yellow/20'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span>Complete & Claim Trophy</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameTaskDetails;
