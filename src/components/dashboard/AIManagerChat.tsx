import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
    <Card className="w-[350px] h-[600px] bg-white flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8">
                  {message.sender === "bot" ? (
                    <Bot className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIManagerChat;
