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
    <Card className="w-full bg-white hover:shadow-lg transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{title}</h3>
              <div className="flex items-center text-muted-foreground">
                <Building2 className="w-4 h-4 mr-1" />
                <span>{company}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {points} XP
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                {trophies}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2">
        <Button
          className="flex-1 bg-primary hover:bg-primary/90"
          onClick={onApply}
        >
          Apply Now
        </Button>
        <Button variant="outline" className="flex-1" onClick={onLearnMore}>
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoleCard;
