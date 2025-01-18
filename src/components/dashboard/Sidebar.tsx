import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Trophy,
  Medal,
  LayoutDashboard,
  GamepadIcon,
  MessageSquare,
  Bot,
  MessageCircle,
  Github,
  Linkedin,
  Instagram,
  ChevronLeft,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface SidebarProps {
  userName?: string;
  userAvatar?: string;
  level?: number;
  trophies?: number;
  badges?: { id: string; name: string; color: string }[];
}

const Sidebar = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  level = 5,
  trophies = 3,
  badges = [
    { id: "1", name: "Quick Learner", color: "bg-blue-500" },
    { id: "2", name: "Team Player", color: "bg-green-500" },
    { id: "3", name: "Problem Solver", color: "bg-purple-500" },
  ],
}: SidebarProps) => {
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
    <div className="h-full flex flex-col">
      {/* Game Title */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">1DayIntern</h1>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">{userName}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10">
                Level {level}
              </Badge>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">{trophies}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge
                key={badge.id}
                variant="secondary"
                className={`${badge.color} text-white`}
              >
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="p-6 border-t">
        <div className="flex justify-center gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed left-4 top-4 z-50"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 border-r h-screen sticky top-0">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
