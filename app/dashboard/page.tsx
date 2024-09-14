"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { Search, Users, MoreVertical, ThumbsUp } from "lucide-react";

// Placeholder data for creators
const creators = [
  {
    id: 1,
    name: "DJ Awesome",
    genre: "Electronic",
    followers: 10000,
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100&text=DJ",
  },
  {
    id: 2,
    name: "Rock Star",
    genre: "Rock",
    followers: 8500,
    rating: 4.6,
    image: "/placeholder.svg?height=100&width=100&text=RS",
  },
  {
    id: 3,
    name: "Pop Princess",
    genre: "Pop",
    followers: 15000,
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100&text=PP",
  },
  {
    id: 4,
    name: "Hip Hop Master",
    genre: "Hip Hop",
    followers: 12000,
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=100&text=HH",
  },
  {
    id: 5,
    name: "Jazz Cat",
    genre: "Jazz",
    followers: 6000,
    rating: 4.5,
    image: "/placeholder.svg?height=100&width=100&text=JC",
  },
];

// Placeholder function for following a creator
const followCreator = (creatorId: number) => {
  console.log(`Following creator with id: ${creatorId}`);
};

export default function CreatorsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Discover Creators</h1>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-8 bg-gray-800 border-gray-700"
              placeholder="Search creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <Card
                key={creator.id}
                className="bg-gray-900 border-gray-700 shadow-lg shadow-purple-900/20"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={creator.image} alt={creator.name} />
                    <AvatarFallback>
                      {creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-gray-200">
                      {creator.name}
                    </CardTitle>
                    <CardDescription>{creator.genre}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 border-gray-700">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="hover:bg-gray-700">
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-700">
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-700">
                        Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-400">
                        {creator.followers.toLocaleString()} followers
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => followCreator(creator.id)}
                  >
                    Follow
                  </Button>
                  <Button variant="outline">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Support
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t border-gray-800">
        <p className="text-center text-sm text-gray-400">
          © 2023 MusicStreamChoice. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
