import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user.email ?? "",
      },
    });

    if (!user) {
      return NextResponse.json({ message: "No user found!" }, { status: 403 });
    }

    const mostUpvotedStream = await prismaClient.stream.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        upvotes: {
          _count: "desc",
        },
      },
    });

    const updateCurrentStream = () => {
      prismaClient.currentStream.upsert({
        where: {
          userId: user.id,
        },
        update: {
          streamId: mostUpvotedStream?.id,
        },
        create: {
          userId: user.id,
          streamId: mostUpvotedStream?.id ?? "",
        },
      });
    };

    const deleteStreamAddedToCurrentStream = () => {
      prismaClient.stream.delete({
        where: {
          id: mostUpvotedStream?.id,
        },
      });
    };

    await Promise.all([updateCurrentStream, deleteStreamAddedToCurrentStream]);

    return NextResponse.json(mostUpvotedStream, { status: 200 });
  } catch (error) {}
}
