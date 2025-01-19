import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trophy, Star } from "lucide-react";
import { fetchDataFromAPI } from "@/lib/utils";

interface Role {
  id: number;
  title: string;
  company_id: number;
  description: string;
  points: number;
  requied_skills: string;
}

useEffect(() => {
  fetchDataFromAPI("roles").then((roles) => {
    console.log("Fetched Roles:", roles);
  }),
    [];
});

const GameBoard = ({ roles = [] }) => {
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
        {roles.map((game) => (
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
                  {game.points} XP
                </span>
                <span>
                  <Star className="inline-block w-4 h-4 text-sunny-yellow mr-1" />
                  {game.requied_skills}
                </span>
              </div>

              {/* Time Estimate & Action */}
              <div className="flex justify-between items-center">
                <Button className="minecraft-btn">Play Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
const App: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  return <GameBoard roles={roles} />;
};

export default GameBoard;
