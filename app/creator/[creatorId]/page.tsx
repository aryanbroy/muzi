"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
  Share2,
  Facebook,
  Twitter,
  Link,
} from "lucide-react";

// const fetchVideoDetails = async (url: string) => {
//   // In a real application, this would make an API call to get video details
//   return {
//     title: "Sample Video Title",
//     thumbnail: "/placeholder.svg?height=90&width=120",
//   };
// };

// Placeholder function for submitting a song
const submitSong = async (url: string) => {
  // In a real application, this would make an API call to submit the song
  console.log("Submitting song:", url);
};

const vote = async (id: number, type: "up" | "down") => {
  //  const res = await axios.post("/api/streams/upvote", {streamId : id} )
  //  const data = res.data;
  //  console.log(data)
  console.log(`Voting ${type} for song ${id}`);
};

// Placeholder function for sharing
const share = (platform: string) => {
  // In a real application, this would open a share dialog or copy a link
  console.log(`Sharing via ${platform}`);
};

const REFRESH_INTERVAL_MS = 10 * 1000;
const refreshStreams = async () => {
  const res = await axios.get("/api/streams/my");
  console.log(res);
};

export default function Dashboard({
  params: { creatorId },
}: {
  params: { creatorId: string };
}) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState<{
    title: string;
    thumbnail: string;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchStreams = async () => {
    try {
      const res = await axios.get(`/api/streams?creatorId=${creatorId ?? ""}`);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStreams();
    // const fetchStreams = async () => {
    //     try {
    //       const res = await axios.get(`/api/streams?creatorId=${creatorId ?? ""}`);
    //       const data = res.data;
    //       console.log(data);
    //     } catch (error) {
    //      console.log(error)
    //     }
    //   };
  }, [creatorId]);

  // useEffect(() => {
  //   refreshStreams();
  //   const interval = setInterval(() => {
  //     refreshStreams();
  //   }, REFRESH_INTERVAL_MS);
  //   // fetchStreams();

  //   return () => clearInterval(interval);
  // }, []);

  // const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const url = e.target.value;
  //   setVideoUrl(url);
  //   if (url) {
  //     const details = await fetchVideoDetails(url);
  //     setVideoDetails(details);
  //   } else {
  //     setVideoDetails(null);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl) {
      await submitSong(videoUrl);
      setVideoUrl("");
      setVideoDetails(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Song Voting</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem
                onClick={() => share("facebook")}
                className="hover:bg-gray-700"
              >
                <Facebook className="mr-2 h-4 w-4" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => share("twitter")}
                className="hover:bg-gray-700"
              >
                <Twitter className="mr-2 h-4 w-4" />
                <span>Twitter</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => share("copyLink")}
                className="hover:bg-gray-700"
              >
                <Link className="mr-2 h-4 w-4" />
                <span>Copy Link</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Now Playing</h2>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              {/* This would be replaced with an actual YouTube embed */}
              <p className="text-gray-400">YouTube Player Placeholder</p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Current Song Title</h3>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Submit a Song</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="video-url" className="text-sm font-medium">
                  YouTube Video URL
                </label>
                <Input
                  id="video-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              {videoDetails && (
                <div className="flex items-center space-x-4 bg-gray-800 p-2 rounded-lg">
                  <img
                    src={videoDetails.thumbnail}
                    alt="Video thumbnail"
                    className="w-20 h-15 object-cover rounded"
                  />
                  <p className="flex-1 text-sm">{videoDetails.title}</p>
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Submit Song
              </Button>
            </form>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Upcoming Songs</h2>
          <ScrollArea className="h-[400px] rounded-md border border-gray-700">
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map((song) => (
                <div
                  key={song}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/placeholder.svg?height=60&width=80&text=Song${song}`}
                      alt={`Song ${song} thumbnail`}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">Song Title {song}</h3>
                      <p className="text-sm text-gray-400">Artist Name</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => vote(song, "up")}
                      className="hover:text-green-500"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{50 - song * 5}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => vote(song, "down")}
                      className="hover:text-red-500"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </section>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t border-gray-800">
        <p className="text-center text-sm text-gray-400">
          © 2023 MusicStreamChoice. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
