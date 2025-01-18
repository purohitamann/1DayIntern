import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Bell, Menu, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

interface DashboardHeaderProps {
  userName?: string;
  level?: number;
  avatarUrl?: string;
  notifications?: number;
}

const DashboardHeader = ({
  userName = "John Doe",
  level = 5,
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notifications = 3,
}: DashboardHeaderProps) => {
  return (
    <header
      className="
        minecraft-panel
        glass-effect
        card-hover
        w-full
        h-20
        px-4
        flex
        items-center
        justify-between
        text-pure-white
        rounded-lg
        font-silkscreen
      "
    >
      {/* Left Section: Menu + Avatar + User Info */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="
            block
            lg:hidden
            bg-transparent
            border
            border-white
            hover:border-sunny-yellow
            transition-colors
          "
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Avatar and User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-transparent border border-white">
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="hidden sm:block leading-tight">
            <h3 className="font-bold text-sm">{userName}</h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="
                  bg-transparent
                  border border-sunny-yellow
                  text-sunny-yellow
                  px-2
                  py-0.5
                  text-xs
                "
              >
                Level {level}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Notifications + Settings */}
      <div className="flex items-center gap-2">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="
                relative
                bg-transparent
                border
                border-white
                hover:border-sunny-yellow
                transition-colors
              "
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    h-4
                    w-4
                    rounded-full
                    bg-red-500
                    text-white
                    text-xs
                    flex
                    items-center
                    justify-center
                  "
                >
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-[#1a3750]/80 backdrop-blur-sm">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New task available</DropdownMenuItem>
            <DropdownMenuItem>Level up reward ready</DropdownMenuItem>
            <DropdownMenuItem>Task feedback received</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="
                bg-transparent
                border
                border-white
                hover:border-sunny-yellow
                transition-colors
              "
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-[#1a3750]/80 backdrop-blur-sm">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
