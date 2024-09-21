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
        played: false,
      },
      orderBy: {
        upvotes: {
          _count: "desc",
        },
      },
    });

    await Promise.all([
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
      }),
      await prismaClient.stream.update({
        where: {
          id: mostUpvotedStream?.id,
        },
        data: {
          played: true,
          playedTs: new Date(),
        },
      }),
    ]);

    return NextResponse.json(mostUpvotedStream, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while getting next stream" },
      { status: 411 }
    );
  }
}
