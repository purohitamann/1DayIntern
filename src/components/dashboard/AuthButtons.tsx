import React from "react";
import { Button } from "../ui/button";
import { LogIn, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const AuthButtons = () => {
  return (
    <div className="space-y-4 p-4 text-pure-white">
      {/* Login Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full minecraft-btn flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Login
          </Button>
        </DialogTrigger>
        <DialogContent
          className="
            glass-effect
         
            bg-[#5c743c]
            text-white
          
          "
          style={{
            backgroundImage: `url("/assets/stone_texture.png")`,
            backgroundRepeat: "repeat",
            backgroundSize: "20px 20px",
          }}
        >
          <DialogHeader>
            <DialogTitle className="heading-text text-lg text-center">
              Login to 1DayIntern
            </DialogTitle>
            <DialogDescription className="body-text text-sm text-center">
              Enter your credentials to continue your journey.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label className="heading-text text-sm">Email</Label>
              <Input
                type="email"
                placeholder="steve@minecraft.com"
                className="
                  bg-[#4b694e]
                  border
                  border-[#3d4a2e]
                  text-white
                  placeholder:text-gray-300
                  focus:border-yellow-500
                  focus:ring-0
                  transition-all
                "
              />
            </div>
            {/* Password Field */}
            <div className="space-y-2">
              <Label className="heading-text text-sm">Password</Label>
              <Input
                type="password"
                className="
                  bg-[#4b694e]
                  border
                  border-[#3d4a2e]
                  text-white
                  placeholder:text-gray-300
                  focus:border-yellow-500
                  focus:ring-0
                  transition-all
                "
              />
            </div>

            {/* Login Button */}
            <Button
              className="
                w-full
                minecraft-btn
                bg-yellow-500
                text-black
                font-bold
                hover:bg-yellow-400
                transition-all
                mt-4
              "
            >
              Start Adventure
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="
              w-full
              minecraft-btn
              flex items-center gap-2
              bg-[#4b694e]
              hover:bg-[#5c8459]
              transition-all
            "
            variant="outline"
          >
            <UserPlus className="w-4 h-4" />
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent
          className="
            glass-effect
            max-w-[400px]
            w-full
            bg-[#5c743c]
            text-white
         
          "
          style={{
            backgroundImage: `url("/assets/stone_texture.png")`,
            backgroundRepeat: "repeat",
            backgroundSize: "20px 20px",
          }}
        >
          <DialogHeader>
            <DialogTitle className="heading-text text-lg text-center">
              Create New Account
            </DialogTitle>
            <DialogDescription className="body-text text-sm text-center">
              Join the adventure and start your internship journey!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            {/* Username */}
            <div className="space-y-2">
              <Label className="heading-text text-sm">Username</Label>
              <Input
                placeholder="Steve"
                className="
                  bg-[#4b694e]
                  border
                  border-[#3d4a2e]
                  text-white
                  placeholder:text-gray-300
                  focus:border-yellow-500
                  focus:ring-0
                  transition-all
                "
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label className="heading-text text-sm">Email</Label>
              <Input
                type="email"
                placeholder="steve@minecraft.com"
                className="
                  bg-[#4b694e]
                  border
                  border-[#3d4a2e]
                  text-white
                  placeholder:text-gray-300
                  focus:border-yellow-500
                  focus:ring-0
                  transition-all
                "
              />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <Label className="heading-text text-sm">Password</Label>
              <Input
                type="password"
                className="
                  bg-[#4b694e]
                  border
                  border-[#3d4a2e]
                  text-white
                  placeholder:text-gray-300
                  focus:border-yellow-500
                  focus:ring-0
                  transition-all
                "
              />
            </div>
            {/* Confirm Password */}
            <div className="space-y-2">
              <Label className="heading-text text-sm">Confirm Password</Label>
              <Input
                type="password"
                className="
                  bg-[#4b694e]
                  border
                  border-[#3d4a2e]
                  text-white
                  placeholder:text-gray-300
                  focus:border-yellow-500
                  focus:ring-0
                  transition-all
                "
              />
            </div>

            {/* Sign Up Button */}
            <Button
              className="
                w-full
                minecraft-btn
                bg-yellow-500
                text-black
                font-bold
                hover:bg-yellow-400
                transition-all
                mt-4
              "
            >
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
