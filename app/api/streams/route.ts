import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//@ts-expect-error doesn't have types include
import youtubesearchapi from 'youtube-search-api'
import { YT_REGEX } from "@/lib/utils";


const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url);

    if (!isYt) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 411 });
    }

    const extractedId = data.url.split("?v=")[1];

    const videoDetails = await youtubesearchapi.GetVideoDetails(extractedId);
    const title = videoDetails.title;
    const thumbnails = videoDetails.thumbnail.thumbnails;
    thumbnails.sort(
      (a: { width: number }, b: { width: number }) => a.width - b.width
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: title ?? "Title not found",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 2].url) ??
          "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        id: stream.id,
        title: stream.title,
        smallImg: stream.smallImg,
        bigImg: stream.bigImg,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while adding a stream" },
      { status: 411 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const creatorId = req.nextUrl.searchParams.get("creatorId");

    if (!creatorId) {
      return NextResponse.json(
        { message: "Error, no creator id found" },
        { status: 400 }
      );
    }

    const getStreamsOfCreator = () => {
      const streams = prismaClient.stream.findMany({
        where: {
          userId: creatorId ?? "",
          played: false,
        },
        include: {
          _count: {
            select: {
              upvotes: true,
            },
          },
          upvotes: {
            select: {
              userId: true,
            },
          },
        },
      });
      return streams;
    };

    const getCurrentStream = () => {
      const activeStream = prismaClient.currentStream.findFirst({
        where: {
          userId: creatorId,
        },
      });
      return activeStream;
    };

    const [streams, activeStream] = await Promise.all([
      getStreamsOfCreator(),
      getCurrentStream(),
    ]);

    return NextResponse.json(
      {
        streams: streams.map(({ _count, upvotes, ...rest }) => ({
          ...rest,
          upvoteCount: _count.upvotes,
          upvotes: upvotes.map((upvote) => upvote.userId),
        })),
        activeStream,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while fetching streams" },
      { status: 411 }
    );
  }
}