"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, ThumbsDown, Play, Pause, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
// import NextLink from "next/link";

// Placeholder function for fetching video details

const fetchVideoDetails = async (url: string) => {
  // In a real application, this would make an API call to get video details
  return {
    title: "Sample Video Title",
    thumbnail: "/placeholder.svg?height=90&width=120",
  };
};

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
// const share = (platform: string) => {
//   // In a real application, this would open a share dialog or copy a link
//   console.log(`Sharing via ${platform}`);
// };

// const REFRESH_INTERVAL_MS = 10 * 1000;
// const refreshStreams = async () => {
//   const res = await axios.get("/api/streams/my");
//   console.log(res);
// };

export default function Dashboard() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState<{
    title: string;
    thumbnail: string;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [creatorUrl, setCreatorUrl] = useState("");
  const { toast } = useToast();

  const { data: session } = useSession();
  // console.log(session);

  useEffect(() => {
    if (!session || !session.user) return;
    const url = `${window.location.origin}/creator/${session?.user.id}`;
    setCreatorUrl(url);
  }, [session, session?.user]);

  // const fetchStreams = async () => {
  //   const res = await axios.get(
  //     `/api/streams?creatorId=1f37f888-757a-4469-ada5-8086b37dff26`
  //   );
  //   const data = res.data;
  //   console.log(data);
  // };

  // useEffect(() => {
  //   refreshStreams();
  //   const interval = setInterval(() => {
  //     refreshStreams();
  //   }, REFRESH_INTERVAL_MS);
  //   // fetchStreams();

  //   return () => clearInterval(interval);
  // }, []);

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    if (url) {
      const details = await fetchVideoDetails(url);
      setVideoDetails(details);
    } else {
      setVideoDetails(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl) {
      await submitSong(videoUrl);
      setVideoUrl("");
      setVideoDetails(null);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(creatorUrl);
    toast({
      title: "Text copied to clipboard!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Song Voting</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                // onClick={onShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Share the voting link with your friends and fans
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" defaultValue={creatorUrl ?? ""} readOnly />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                  onClick={copyLink}
                >
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                  onChange={handleUrlChange}
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
