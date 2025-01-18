import React, { useState } from "react";
import RoleCard from "./RoleCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

interface Role {
  id: string;
  title: string;
  company: string;
  points: number;
  trophies: number;
}

const defaultRoles: Role[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Google",
    points: 500,
    trophies: 3,
  },
  {
    id: "2",
    title: "UI/UX Design Intern",
    company: "Apple",
    points: 450,
    trophies: 2,
  },
  {
    id: "3",
    title: "Full Stack Developer Intern",
    company: "Microsoft",
    points: 600,
    trophies: 4,
  },
];

interface RolesBoardProps {
  roles?: Role[];
}

const RolesBoard = ({ roles = defaultRoles }: RolesBoardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  return (
    <div className="w-full space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="points">Points (High to Low)</SelectItem>
              <SelectItem value="trophies">Trophies (High to Low)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            title={role.title}
            company={role.company}
            points={role.points}
            trophies={role.trophies}
          />
        ))}
      </div>
    </div>
  );
};

export default RolesBoard;
