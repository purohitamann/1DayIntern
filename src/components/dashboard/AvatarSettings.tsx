import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

const AVATAR_OPTIONS = [
  {
    id: 1,
    name: "Pixel Warrior",
    src: "/assets/avatars/pixel1.png",
    alt: "Pixel Warrior Avatar"
  },
  {
    id: 2,
    name: "Pixel Mage",
    src: "/assets/avatars/pixel2.png",
    alt: "Pixel Mage Avatar"
  },
  {
    id: 3,
    name: "Pixel Archer",
    src: "/assets/avatars/pixel3.png",
    alt: "Pixel Archer Avatar"
  }
];

interface AvatarSettingsProps {
  currentAvatar: string;
  onAvatarChange: (avatarSrc: string) => void;
}

const AvatarSettings = ({ currentAvatar, onAvatarChange }: AvatarSettingsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="
            absolute
            bottom-0
            right-0
            p-1
            bg-[#3d4a2e]
            hover:bg-[#4b694e]
            text-[#f0e6d2]
            pixel-border
            rounded-full
          "
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="
        glass-effect
      
        bg-[#5c743c]
        text-[#f0e6d2]
       
     
      ">
        <DialogHeader>
          <DialogTitle className="heading-text text-lg text-center mb-4">
            Choose Your Avatar
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          {AVATAR_OPTIONS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => onAvatarChange(avatar.src)}
              className={`
                relative
                p-2
                pixel-border
                transition-all
                ${currentAvatar === avatar.src
                  ? 'bg-[#3d4a2e] ring-2 ring-sunny-yellow'
                  : 'bg-[#4b694e] hover:bg-[#3d4a2e]'
                }
              `}
            >
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="w-full h-auto pixelated"
              />
              <span className="
                mt-2
                text-xs
                font-silkscreen
                block
                text-center
                truncate
              ">
                {avatar.name}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarSettings;
