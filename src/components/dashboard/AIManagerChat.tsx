import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

interface AIManagerChatProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const AIManagerChat = ({
  messages: initialMessages = [
    {
      id: 1,
      text: "Hello! I'm your AI Manager. How can I help you with your tasks today?",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "I'd like to know more about the portfolio website task.",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "The portfolio website task involves creating a professional website to showcase your work. Would you like me to break down the steps for you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ],
  onSendMessage = (message: string) => console.log("Message sent:", message),
}: AIManagerChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user" as const,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card
      className="
        minecraft-panel 
        glass-effect 
        flex 
        flex-col 
        w-[95%] 
        max-w-[400px] 
        h-[600px] 
        mx-auto 
        rounded-lg 
        text-pure-white
        shadow-lg
        border border-[#3d4a2e]
      "
      style={{
        backgroundImage: `url("/assets/minecraft_grass_tile.png")`,
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
      <CardHeader className="p-4 border-b border-white/20 bg-[#4b694e]">
        <CardTitle className="flex items-center gap-2 font-silkscreen text-lg">
          <Bot className="w-5 h-5 text-yellow-400" />
          AI Manager
        </CardTitle>
      </CardHeader>

      {/* Messages & Input */}
      <CardContent className="p-4 flex-1 flex flex-col">
        <ScrollArea className="flex-1 mb-4 pr-2">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
              >
                {/* Avatar */}
                <Avatar
                  className="
                    w-10 
                    h-10 
                    bg-[#6c8459] 
                    border border-[#3d4a2e] 
                    rounded-full 
                    shadow-md
                  "
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <User className="w-6 h-6 text-yellow-400" />
                  )}
                </Avatar>

                {/* Message Bubble */}
                <div
                  className={`
                    rounded-lg
                    px-4 py-3
                    max-w-[75%]
                    text-sm
                    font-minecraft
                    shadow-md
                    ${message.sender === "user"
                      ? "bg-[#7a9364] text-white"
                      : "bg-white/20 text-white"
                    }
                  `}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input + Send */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="
              bg-[#4b694e] 
              border 
              border-[#3d4a2e] 
              text-white
              placeholder:text-gray-300
              focus:ring-0
              focus:border-yellow-500
              flex-1
              shadow-inner
            "
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="
              bg-yellow-400
              text-black
              font-bold
              hover:bg-yellow-300
              disabled:opacity-50
              flex 
              items-center 
              justify-center
              shadow-lg
              transition-all
            "
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIManagerChat;
