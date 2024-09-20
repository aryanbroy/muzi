"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Share2, ArrowBigUp } from "lucide-react";
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
import { MyStream } from "../creator/[creatorId]/page";
import Image from "next/image";

type CurrentVideoType = {
  id: string;
  type: ["Youtube", "Spotify"];
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  active: boolean;
  userId: string;
};
const fetchVideoDetails = async (url: string) => {
  console.log(url);
  return {
    title: "Sample Video Title",
    thumbnail: "/placeholder.svg?height=90&width=120",
  };
};

const submitSong = async (url: string) => {
  console.log("Submitting song:", url);
};

// const REFRESH_INTERVAL_MS = 10 * 1000;
// const refreshStreams = async () => {
//   const res = await axios.get("/api/streams/my");
//   console.log(res);
// };

export default function Dashboard() {
  const [videoUrl, setVideoUrl] = useState("");
  const [creatorUrl, setCreatorUrl] = useState("");
  const [streams, setStreams] = useState<MyStream[]>([]);
  const [currentVideo, setCurrentVideo] = useState<CurrentVideoType | null>(
    null
  );
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

  const fetchMyStreams = async () => {
    try {
      const res = await axios.get("/api/streams/my");
      const data = res.data;
      setStreams(data.streams);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyStreams();
  }, []);

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    if (url) {
      const details = await fetchVideoDetails(url);
      console.log(details);
    } else {
      console.log("do nothing");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl) {
      await submitSong(videoUrl);
      setVideoUrl("");
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(creatorUrl);
    toast({
      title: "Text copied to clipboard!",
    });
  };

  const playNext = async () => {
    try {
      const res = await axios.get("/api/streams/next");
      const data = res.data;
      setCurrentVideo(data);
    } catch (error) {
      console.log(error);
    }
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
              <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${currentVideo?.extractedId}?autoplay=1`}
                allow="autoplay"
                title="Embedded youtube"
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Current Song Title</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={playNext}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Play className="h-4 w-4 mr-2" /> Play Next
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
              {streams.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={song.smallImg || song.bigImg}
                      alt={song.title}
                      className="w-20 h-15 object-cover rounded"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="font-semibold">{song.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowBigUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{song.upvotes}</span>
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
