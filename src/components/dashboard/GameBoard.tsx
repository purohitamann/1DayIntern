import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trophy, Star } from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  rewards: number;
  timeEstimate: string;
}

const defaultGames: Game[] = [
  {
    id: "1",
    title: "Code Breaker",
    description: "Solve coding puzzles to unlock achievements",
    difficulty: "Medium",
    rewards: 100,
    timeEstimate: "15-20 mins",
  },
  {
    id: "2",
    title: "Debug Master",
    description: "Find and fix bugs in the code",
    difficulty: "Hard",
    rewards: 150,
    timeEstimate: "20-30 mins",
  },
  {
    id: "3",
    title: "Algorithm Adventure",
    description: "Learn algorithms through interactive challenges",
    difficulty: "Easy",
    rewards: 80,
    timeEstimate: "10-15 mins",
  },
];

const GameBoard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl game-title mb-6">Available Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {defaultGames.map((game) => (
          <Card key={game.id} className="minecraft-panel">
            <CardHeader>
              <CardTitle className="heading-text">{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-text mb-4">{game.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">
                  <Trophy className="inline-block w-4 h-4 text-[#FFD700] mr-1" />
                  {game.rewards} XP
                </span>
                <span className="text-sm">
                  <Star className="inline-block w-4 h-4 text-[#FFD700] mr-1" />
                  {game.difficulty}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm body-text">{game.timeEstimate}</span>
                <Button className="minecraft-btn">Play Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
