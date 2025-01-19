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

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface Game {
  id: string;
  title: string;
  description: string;
  companyDescription: string;
  tasks: Task[];
}

interface GameTaskDetailsProps {
  game: Game;
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
  onTaskToggle,
}: GameTaskDetailsProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);

  // NEW: Toggle to display the certificate on screen after completion
  const [showCertificate, setShowCertificate] = useState(false);

  const { toast } = useToast();

  // Set timer for 8 hours from now
  const expiryTimestamp = new Date();
  expiryTimestamp.setHours(expiryTimestamp.getHours() + 8);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("Time's up!"),
  });

  /**
   * (Optional) Generate a PDF certificate
   * If you don't need a PDF download, remove this function and its usage
   */
  const generateCertificate = async () => {
    const certificateContent = document.getElementById("certificate-content");
    if (!certificateContent) return;

    const canvas = await html2canvas(certificateContent);
    const imgData = canvas.toDataURL("image/png");

    // Create a landscape PDF (A4)
    const pdf = new jsPDF("l", "mm", [297, 210]);
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    pdf.save(`${game.title}_certificate.pdf`);
  };

  /**
   * Complete tasks, generate PDF (if desired), close modal, then show certificate on screen
   */
  const handleComplete = async () => {
    setShowConfetti(true);
    setCompleted(true);

    toast({
      title: "Congratulations! 🎉",
      description: "You've completed the task successfully!",
      className: "glass-effect text-white z-60",
    });

    // Wait a bit to show confetti, then proceed
    // Show confetti immediately
    setShowConfetti(true);

    // Show confetti immediately with higher z-index
    setShowConfetti(true);

    // Wait longer to show the celebration
    setTimeout(async () => {
      try {
        // 1) Generate the PDF file
        await generateCertificate();
      } catch (error) {
        console.error('Error generating certificate:', error);
      }

      // 2) Close the modal
      onOpenChange(false);

      // 3) Reveal the certificate on-screen
      setShowCertificate(true);

      // 4) Hide confetti after 10 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 10000); // Increased to 10 seconds
    }, 2000); // Increased initial delay to 2 seconds
  };

  const allTasksCompleted = taskProgress.every((done) => done);

  return (
    <>
      {/* Confetti on completion */}
      {showConfetti && (
        <div className="fixed inset-0 z-[999] pointer-events-none">
          <Confetti numberOfPieces={200} recycle={false} />
        </div>
      )}

      {/* The modal (dialog) for tasks */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] glass-effect border-none bg-opacity-90 text-white overflow-y-auto pixel-cursor">
          <DialogHeader className="space-y-2 sticky top-0 bg-gray-900/90 backdrop-blur-sm z-10 pb-2">
            <DialogTitle className="text-xl font-bold tracking-wider text-center">
              {game.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Company Description */}              <div className="glass-effect p-3 rounded-lg shadow-lg hover:shadow-sunny transition-shadow duration-300">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Star className="w-5 h-5 mr-2 text-sunny-yellow" />
                About the Company
              </h3>
              <p className="text-gray-200">{game.companyDescription}</p>
            </div>

            {/* Timer */}              <div className="glass-effect p-3 rounded-lg text-center shadow-lg hover:shadow-sunny transition-shadow duration-300">
              <h3 className="text-sm font-semibold mb-2 flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2 text-sunny-yellow" />
                Time Remaining
              </h3>
              <div className="text-2xl font-mono text-sunny-yellow">
                {hours.toString().padStart(2, "0")}:
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </div>
            </div>

            {/* Task Description */}              <div className="glass-effect p-3 rounded-lg shadow-lg hover:shadow-sunny transition-shadow duration-300">
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
                    className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-200 ${taskProgress[index] ? "bg-green-900/20" : "hover:bg-white/5"
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
                      className={`flex-1 cursor-pointer ${taskProgress[index]
                        ? "line-through text-gray-400"
                        : "text-gray-200"
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
                className={`glass-effect flex items-center space-x-2 ${!allTasksCompleted || completed
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sunny-yellow/20"
                  }`}
              >
                <Trophy className="w-5 h-5" />
                <span>Complete & Claim Trophy</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificate on-screen AFTER completion */}
      {showCertificate && (
        <div id="certificate">
          <div
            id="certificate-content"
            className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-12 text-center text-white mt-8"
          >
            <div className="border-4 border-sunny-yellow p-8">
              <h1 className="text-4xl font-bold mb-6">Certificate of Achievement</h1>
              <p className="text-xl mb-6">This certifies that you have successfully completed</p>
              <h2 className="text-3xl font-bold mb-6 text-sunny-yellow">
                {game.title}
              </h2>
              <p className="mb-4">Completed on {new Date().toLocaleDateString()}</p>
              <div className="flex justify-center mt-6">
                <Trophy className="w-16 h-16 text-sunny-yellow" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameTaskDetails;
