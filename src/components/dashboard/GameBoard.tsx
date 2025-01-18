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
    <div
      className="
        minecraft-panel 
        card-hover 
        p-6 
        rounded-lg 
        text-pure-white
        space-y-6
      "
    >
      <h1 className="game-title text-2xl mb-6">Available Games</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {defaultGames.map((game) => (
          <Card
            key={game.id}
            className="
              glass-effect 
              shadow-md 
              card-hover
              p-4 
              rounded-md
              text-pure-white
            "
          >
            <CardHeader className="pb-2">
              <CardTitle
                className="
                  heading-text
                  text-lg
                  font-bold
                  uppercase
                  tracking-wider
                "
              >
                {game.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="body-text mb-4">{game.description}</p>

              {/* Rewards & Difficulty */}
              <div className="flex justify-between items-center mb-4 text-sm">
                <span>
                  <Trophy className="inline-block w-4 h-4 text-sunny-yellow mr-1" />
                  {game.rewards} XP
                </span>
                <span>
                  <Star className="inline-block w-4 h-4 text-sunny-yellow mr-1" />
                  {game.difficulty}
                </span>
              </div>

              {/* Time Estimate & Action */}
              <div className="flex justify-between items-center">
                <span className="body-text text-sm">{game.timeEstimate}</span>
                <Button className="minecraft-btn">
                  Play Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
