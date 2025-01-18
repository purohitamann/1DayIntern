import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Trophy, Star, Building2 } from "lucide-react";

interface RoleCardProps {
  title?: string;
  company?: string;
  points?: number;
  trophies?: number;
  onApply?: () => void;
  onLearnMore?: () => void;
}

const RoleCard = ({
  title = "Frontend Developer Intern",
  company = "Google",
  points = 500,
  trophies = 3,
  onApply = () => console.log("Applied"),
  onLearnMore = () => console.log("Learn More"),
}: RoleCardProps) => {
  return (
    <Card
      className="
        minecraft-panel        /* Custom class for a glassy, gradient panel */
        card-hover            /* Smooth lift on hover */
        w-full
        p-4
        text-pure-white
        mb-4
      "
    >
      <CardContent className="pb-4">
        {/* Title & Company */}
        <div className="space-y-1 font-silkscreen">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center text-sm opacity-90">
            <Building2 className="w-4 h-4 mr-1" />
            <span>{company}</span>
          </div>
        </div>

        {/* XP & Trophies */}
        <div className="flex gap-2 mt-4">
          <Badge
            variant="secondary"
            className="
              bg-transparent
              border
              border-white
              flex items-center gap-1
              text-sm
            "
          >
            <Star className="w-4 h-4 text-sunny-yellow" />
            {points} XP
          </Badge>
          <Badge
            variant="secondary"
            className="
              bg-transparent
              border
              border-white
              flex items-center gap-1
              text-sm
            "
          >
            <Trophy className="w-4 h-4 text-sunny-yellow" />
            {trophies}
          </Badge>
        </div>
      </CardContent>

      {/* Footer: Buttons */}
      <CardFooter className="flex gap-2 pt-2">
        <Button
          className="
            minecraft-btn
            w-full
            font-silkscreen
          "
          onClick={onApply}
        >
          Apply Now
        </Button>
        <Button
          variant="outline"
          className="
            minecraft-btn
            w-full
            bg-transparent
            border
            border-white
            font-silkscreen
            hover:bg-pure-white
            hover:text-deep-black
          "
          onClick={onLearnMore}
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoleCard;
