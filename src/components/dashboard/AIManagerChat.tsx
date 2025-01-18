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
        card-hover 
        glass-effect 
        flex 
        flex-col 
        w-[350px] 
        h-[600px] 
        rounded-lg 
        text-pure-white
      "
    >
      {/* Header */}
      <CardHeader className="p-4 border-b border-white/20">
        <CardTitle className="flex items-center gap-2 font-silkscreen">
          <Bot className="w-5 h-5 text-sunny-yellow" />
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
                className={`
                  flex gap-3
                  ${message.sender === "user" ? "flex-row-reverse" : ""}
                `}
              >
                {/* Avatar */}
                <Avatar
                  className="
                    w-8 
                    h-8 
                    bg-transparent
                    border border-white/30
                    text-pure-white
                  "
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-5 h-5 text-sunny-yellow" />
                  ) : (
                    <User className="w-5 h-5 text-sunny-yellow" />
                  )}
                </Avatar>

                {/* Message Bubble */}
                <div
                  className={`
                    rounded-lg
                    px-3 py-2
                    max-w-[75%]
                    text-sm
                    ${message.sender === "user"
                      ? "bg-[#6c8459] text-white"
                      : "bg-white/10 text-white"
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
              bg-white/10 
              border 
              border-white/20 
              text-white
              placeholder:text-white/50
              focus:ring-0
              focus:border-sunny-yellow
              flex-1
            "
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="
              minecraft-btn
              disabled:opacity-50
              flex 
              items-center 
              justify-center
            "
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIManagerChat;
