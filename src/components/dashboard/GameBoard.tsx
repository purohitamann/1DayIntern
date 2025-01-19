import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trophy, Star } from "lucide-react";
import GameTaskDetails from "./GameTaskDetails";
import { defaultGames, type Game } from "@/data/gameData";

const GameBoard = () => {
  const [openGameId, setOpenGameId] = useState<string | null>(null);
  const [gameProgress, setGameProgress] = useState<Record<string, boolean[]>>({});

  const handlePlayClick = (gameId: string) => {
    setOpenGameId(gameId);
  };

  const handleTaskToggle = (gameId: string, taskIndex: number) => {
    setGameProgress(prev => ({
      ...prev,
      [gameId]: prev[gameId]?.map((completed, i) =>
        i === taskIndex ? !completed : completed
      ) || defaultGames.find(g => g.id === gameId)?.tasks.map((_, i) =>
        i === taskIndex ? true : false
      ) || []
    }));
  };

  return (
    <div className="minecraft-panel card-hover p-6 rounded-lg text-pure-white space-y-6">
      <h1 className="game-title text-2xl mb-6">Available Games</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {defaultGames.map((game) => (
          <Card
            key={game.id}
            className="glass-effect shadow-md card-hover p-4 rounded-md text-pure-white transform transition-all duration-200 hover:scale-105"
          >
            <CardHeader className="pb-2">
              <CardTitle className="heading-text text-lg font-bold uppercase tracking-wider">
                {game.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="body-text mb-4 text-gray-200">{game.description}</p>

              {/* Rewards & Difficulty */}
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="flex items-center">
                  <Trophy className="w-4 h-4 text-sunny-yellow mr-1" />
                  <span className="text-sunny-yellow">{game.rewards} XP</span>
                </span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 text-sunny-yellow mr-1" />
                  <span className={`
                    ${game.difficulty === 'Easy' ? 'text-green-400' : ''}
                    ${game.difficulty === 'Medium' ? 'text-yellow-400' : ''}
                    ${game.difficulty === 'Hard' ? 'text-red-400' : ''}
                  `}>
                    {game.difficulty}
                  </span>
                </span>
              </div>

              {/* Time Estimate & Action */}
              <div className="flex justify-between items-center">
                <span className="body-text text-sm text-gray-300">{game.timeEstimate}</span>
                <Button
                  className="minecraft-btn bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
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
          game={defaultGames.find(g => g.id === openGameId)!}
          open={!!openGameId}
          onOpenChange={(open) => !open && setOpenGameId(null)}
          taskProgress={gameProgress[openGameId] || []}
          onTaskToggle={(taskIndex) => handleTaskToggle(openGameId, taskIndex)}
        />
      )}
    </div>
  );
};

export default GameBoard;
