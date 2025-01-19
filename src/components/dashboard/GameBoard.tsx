import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trophy, Star } from "lucide-react";
import GameTaskDetails from "./GameTaskDetails";
import ProfilePage from "./Profile";

export interface Role {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companyDescription: string;
  rewards: number;
  timeEstimate: string;
  tasks: {
    id: string;
    description: string;
    completed: boolean;
  }[];
}

const backendUrl = "http://127.0.0.1:8000";

const GameBoard = () => {
  const [games, setGames] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openGameId, setOpenGameId] = useState<string | null>(null);
  const [gameProgress, setGameProgress] = useState<Record<string, boolean[]>>({});

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${backendUrl}/roles`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} - ${response.statusText}`
          );
        }
        const data = await response.json();
        setGames(data.data);
      } catch (err: any) {
        console.error("Error fetching games:", err);
        setError(err.message || "Unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    // Initialize task progress for all games
    const initialProgress = games.reduce((acc, game) => {
      acc[game.id] = game.tasks?.map((task) => task.completed) ?? [];
      return acc;
    }, {} as Record<string, boolean[]>);
    setGameProgress(initialProgress);
  }, [games]);

  const handlePlayClick = (gameId: string) => {
    setOpenGameId(gameId);
  };

  const handleTaskToggle = (gameId: string, taskIndex: number) => {
    setGameProgress((prev) => ({
      ...prev,
      [gameId]: prev[gameId].map((completed, i) =>
        i === taskIndex ? !completed : completed
      ),
    }));
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-white">
        <p>Loading games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="minecraft-panel card-hover p-6 rounded-lg text-pure-white space-y-6 pixel-cursor">
      <h1 className="game-title text-2xl mb-6">Available Games</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card
            key={game.id}
            className="glass-effect shadow-md card-hover p-4 rounded-md text-pure-white transform transition-all duration-200 hover:scale-105 group"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 gold-shine rounded-md pointer-events-none" />
            <CardHeader className="pb-2 relative">
              <CardTitle className="heading-text text-lg font-bold uppercase tracking-wider group-hover:text-sunny-yellow transition-colors">
                {game.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="body-text mb-4 text-gray-200">{game.description}</p>
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="flex items-center">
                  <Trophy className="w-4 h-4 text-sunny-yellow mr-1" />
                  <span className="text-sunny-yellow">{game.rewards} XP</span>
                </span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 text-sunny-yellow mr-1" />
                  <span
                    className={`${game.difficulty === "Easy"
                      ? "text-green-400"
                      : game.difficulty === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                      }`}
                  >
                    {game.difficulty}
                  </span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="body-text text-sm text-gray-300">
                  {game.timeEstimate}
                </span>
                <Button
                  className="minecraft-btn bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 group-hover:scale-110"
                  onClick={() => handlePlayClick(game.id)}
                >
                  Play Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {openGameId && (
        <GameTaskDetails
          game={games.find((g) => g.id === openGameId)!}
          open={!!openGameId}
          onOpenChange={(open) => !open && setOpenGameId(null)}
          taskProgress={gameProgress[openGameId] ?? []}
          onTaskToggle={(taskIndex) => handleTaskToggle(openGameId, taskIndex)}
        />
      )}

      <ProfilePage />
    </div>
  );
};

export default GameBoard;
