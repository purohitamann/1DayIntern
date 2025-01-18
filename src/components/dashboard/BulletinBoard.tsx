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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl game-title">Bulletin Board</h1>
        <Button className="minecraft-btn">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>
      <div className="space-y-4">
        {defaultPosts.map((post) => (
          <Card key={post.id} className="minecraft-panel">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="heading-text">{post.title}</CardTitle>
                <span className="text-sm body-text">{post.timestamp}</span>
              </div>
              <p className="text-sm body-text">Posted by {post.author}</p>
            </CardHeader>
            <CardContent>
              <p className="body-text mb-4">{post.content}</p>
              <div className="flex gap-4">
                <Button variant="ghost" className="minecraft-btn">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" className="minecraft-btn">
                  <MessageCircle className="w-4 h-4 mr-2" />
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
