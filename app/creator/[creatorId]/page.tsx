"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator"
import {
  ThumbsUp,
  // ThumbsDown,
  Play,
  Pause,
  Share2,
} from "lucide-react";
import Image from "next/image";

type Stream = {
  id: string;
  type: ["Youtube", "Spotify"];
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  active: boolean;
  userId: string;
  upvoteCount: number;
  haveUpvoted: boolean;
};

type MyStream = {
  active: boolean;
  bigImg: string;
  extractedId: string;
  haveUpvoted: boolean;
  id: string;
  smallImg: string;
  title: string;
  type: ["Youtube", "Spotify"];
  upvotes: number;
  url: string;
  userId: string;
};

// type UpvoteCount = {
//   id: string;
//   upvotes: number;
// };

const submitSong = async (url: string) => {
  console.log("Submitting song:", url);
};

// const REFRESH_INTERVAL_MS = 10 * 1000;
const refreshStreams = async () => {
  await axios.get("/api/streams/my");
  // console.log(res);
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
  const [streams, setStreams] = useState<Stream[]>([]);
  const [upvoteCount, setUpvoteCount] = useState<Record<string, number>>({});
  // console.log(streams);
  // console.log("Upvotes count: ", upvoteCount);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const res = await axios.get(
          `/api/streams?creatorId=${creatorId ?? ""}`
        );
        const upcomingSongs: Stream[] = res.data.streams;
        const myStreamRes = await axios.get("/api/streams/my");
        const myStreamData: MyStream[] = myStreamRes.data.streams;
        upcomingSongs.map((song) => {
          song.haveUpvoted = myStreamData.some((stream) => {
            if (stream.id === song.id && stream.haveUpvoted === true) {
              return true;
            }
          });
        });
        // const upvoteCounts = upcomingSongs.map((song) => {
        //   return { id: song.id, upvotes: song.upvoteCount };
        // });
        const upvoteCounts = upcomingSongs.reduce((acc, song) => {
          acc[song.id] = song.upvoteCount;
          return acc;
        }, {} as Record<string, number>);
        setUpvoteCount(upvoteCounts);
        setStreams(upcomingSongs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStreams();
  }, [creatorId]);

  useEffect(() => {
    refreshStreams();
  }, []);

  // work on this
  const handleVote = async (streamId: string, currentUpvoteCount: number) => {
    setUpvoteCount((prev) => ({
      ...prev,
      [streamId]: currentUpvoteCount + 1,
    }));
  };

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
          <Button
            variant="outline"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
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
                  readOnly
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              {videoDetails && (
                <div className="flex items-center space-x-4 bg-gray-800 p-2 rounded-lg">
                  <Image
                    src={videoDetails.thumbnail}
                    alt="Video thumbnail"
                    className="w-20 h-15 object-cover rounded"
                    width={40}
                    height={40}
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
              {streams.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={song.smallImg}
                      alt={`Song ${song.title}`}
                      className="w-20 h-15 object-cover rounded"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="font-semibold">{song.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleVote(song.id, song.upvoteCount)}
                      className="hover:text-green-500"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      {upvoteCount[song.id]}
                    </span>
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => vote(song., "down")}
                      className="hover:text-red-500"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button> */}
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
