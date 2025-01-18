import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MessageSquare, ThumbsUp, MessageCircle } from "lucide-react";

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const defaultPosts: Post[] = [
  {
    id: "1",
    author: "Alice Smith",
    title: "Tips for First Day as Intern",
    content: "Here are some helpful tips for your first day as an intern...",
    likes: 24,
    comments: 12,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    author: "Bob Johnson",
    title: "Weekly Challenge: Code Review",
    content: "This week's challenge is all about code review practices...",
    likes: 15,
    comments: 8,
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    author: "Carol White",
    title: "Learning Resources Thread",
    content: "Sharing some great resources I've found for learning...",
    likes: 32,
    comments: 18,
    timestamp: "1 day ago",
  },
];

const BulletinBoard = () => {
  return (
    <div
      className="
        minecraft-panel 
        card-hover
        p-6
        rounded-lg
        text-pure-white
        space-y-6
      "
    >
      {/* Header with 'New Post' Button */}
      <div className="flex justify-between items-center">
        <h1 className="game-title text-2xl">Bulletin Board</h1>
        <Button className="minecraft-btn flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          New Post
        </Button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {defaultPosts.map((post) => (
          <Card
            key={post.id}
            className="
              glass-effect
              shadow-md
              card-hover
              p-4
              rounded-md
              text-pure-white
              space-y-3
            "
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle
                  className="
                    heading-text
                    text-lg
                    font-bold
                    uppercase
                    tracking-wider
                  "
                >
                  {post.title}
                </CardTitle>
                <span className="text-xs body-text opacity-80">
                  {post.timestamp}
                </span>
              </div>
              <p className="text-xs body-text opacity-80">
                Posted by {post.author}
              </p>
            </CardHeader>

            <CardContent>
              <p className="body-text mb-4">{post.content}</p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="
                    minecraft-btn
                    flex items-center gap-1
                    px-2 py-1
                    hover:bg-pure-white/10
                    text-sm
                  "
                >
                  <ThumbsUp className="w-4 h-4" />
                  {post.likes}
                </Button>
                <Button
                  variant="ghost"
                  className="
                    minecraft-btn
                    flex items-center gap-1
                    px-2 py-1
                    hover:bg-pure-white/10
                    text-sm
                  "
                >
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BulletinBoard;
