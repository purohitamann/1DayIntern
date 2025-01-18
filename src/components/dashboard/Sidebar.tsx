import React from "react";
import { AuthButtons } from "./AuthButtons";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AvatarSettings from "./AvatarSettings";
import { Button } from "../ui/button";
import {
  Trophy,
  LayoutDashboard,
  GamepadIcon,
  MessageSquare,
  Bot,
  Github,
  Linkedin,
  Instagram,
  ChevronLeft,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Badge } from "../ui/badge";

interface SidebarProps {
  userName?: string;
  userAvatar?: string;
  level?: number;
  trophies?: number;
  badges?: { id: string; name: string; color: string }[];
}

const Sidebar = ({
  userName = "John Doe",
  userAvatar = "/assets/avatars/pixel3.png",
  level = 5,
  trophies = 3,
  badges = [
    { id: "1", name: "Quick Learner", color: "bg-green-600" },
    { id: "2", name: "Team Player", color: "bg-green-700" },
    { id: "3", name: "Problem Solver", color: "bg-green-800" },
  ],
}: SidebarProps) => {
  const location = useLocation();
  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: GamepadIcon, label: "Games", path: "/games" },
    { icon: MessageSquare, label: "Bulletin", path: "/bulletin" },
    { icon: Bot, label: "Chat with Bot", path: "/bot" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  ];

  const SidebarContent = () => (
    <div
      className="
        flex
        flex-col
        h-full
        w-full
        bg-[#5c743c]
        text-[#f0e6d2]
        font-silkscreen
        pixel-border
      "
    >
      {/* Game Title */}
      <div
        className="
          p-6
          text-2xl
          font-bold
          text-center
          tracking-widest
          bg-[#3d4a2e]
          game-title
          border-b-4
          border-[#2c2c2c]
        "
      >
        1DayIntern
      </div>

      {/* User Profile */}
      <div className="p-6 space-y-4 bg-[#4b694e] border-b-4 border-[#2c2c2c]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 pixel-border">
              <AvatarImage
                src={userAvatar}
                alt={userName}
                className="pixelated"
              />
              <AvatarFallback className="bg-[#3d4a2e] text-[#f0e6d2]">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <AvatarSettings
              currentAvatar={userAvatar}
              onAvatarChange={(newAvatar) => {
                // Here you would typically update the avatar in your state management system
                console.log("Avatar changed to:", newAvatar);
              }}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold heading-text">
              {userName}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <Badge
                variant="secondary"
                className="
                  px-2 py-1
                  text-[#f0e6d2]
                  bg-[#3d4a2e]
                  pixel-border
                "
              >
                Level {level}
              </Badge>
              <div className="flex items-center gap-1 pixel-border bg-[#3d4a2e] p-1">
                <Trophy className="w-4 h-4 text-sunny-yellow" />
                <span className="text-sm">{trophies}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h3 className="text-sm font-bold mb-2 uppercase tracking-wide heading-text">
            Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge
                key={badge.id}
                variant="secondary"
                className={`
                  px-2 py-1
                  text-[#f0e6d2]
                  pixel-border
                  ${badge.color}
                `}
              >
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    className={`
                      w-full
                      justify-start
                      gap-2
                      p-3
                      font-silkscreen
                      text-[#f0e6d2]
                      pixel-border
                      transition-all
                      ${isActive
                        ? 'bg-[#3d4a2e] hover:bg-[#4b694e]'
                        : 'bg-[#6c8459] hover:bg-[#7a9364]'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Auth Buttons */}
      <div className="p-4 bg-[#3d4a2e] border-t-4 border-[#2c2c2c]">
        <AuthButtons
          buttonClassName="
            w-full
            p-2
            mb-2
            font-silkscreen
            text-[#f0e6d2]
            pixel-border
            bg-[#6c8459]
            hover:bg-[#7a9364]
            transition-all
          "
        />
      </div>

      {/* Social Links */}
      <div className="px-4 py-3 flex justify-center gap-3 bg-[#3d4a2e]">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              p-2
              pixel-border
              bg-[#6c8459]
              hover:bg-[#7a9364]
              transition-all
            "
          >
            <social.icon className="w-5 h-5 text-[#f0e6d2]" />
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar (Drawer) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="
              lg:hidden
              fixed left-4 top-4 z-50
              p-2
              pixel-border
              bg-[#6c8459]
              text-[#f0e6d2]
              hover:bg-[#7a9364]
            "
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-80 p-0 bg-transparent"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 h-screen sticky top-0">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
