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

// Building up the Interface
interface Role {
  id: string;
  title: string;
  company: string;
  points: number;
  trophies: number;
}

// Function to fetch the data from the User
async function fetchDataFromAPI(tableName: string): Promise<Role[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8080/data/${tableName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data as Role[];
  } catch (error) {
    console.error("Error fetching data:", error);
    // Fallback to default roles if fetching fails
    return defaultRoles;
  }
}

// Example usage
fetchDataFromAPI("roles").then((roles) => {
  console.log("Fetched Roles:", roles);
});

interface RolesBoardProps {
  roles?: Role[];
}

const RolesBoard = ({ roles = defaultRoles }: RolesBoardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  return (
    <div
      className="
        minecraft-panel    /* Glassy gradient container */
        card-hover
        w-full
        p-6
        space-y-6
        text-pure-white
      "
    >
      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-pure-white/70" />
          <Input
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              bg-transparent
              border
              border-white
              text-white
              placeholder:text-white/50
              pl-9
              hover:border-sunny-yellow
              focus:border-sunny-yellow
              focus:ring-0
            "
          />
        </div>

        {/* Sort By & Filter Button */}
        <div className="flex gap-2 justify-end">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              className="
                minecraft-btn
                w-[160px]
                text-sm
                bg-transparent
                text-white
                border
                border-white
                hover:border-sunny-yellow
              "
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="points">Points (High to Low)</SelectItem>
              <SelectItem value="trophies">Trophies (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="
              minecraft-btn
              bg-transparent
              border
              border-white
              text-white
              p-2
              hover:border-sunny-yellow
            "
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
