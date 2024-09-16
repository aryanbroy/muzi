import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteStreamSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user?.email ?? "",
      },
    });
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const data = UpvoteStreamSchema.parse(await req.json());

    await prismaClient.upvote.delete({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });
    return NextResponse.json(
      { message: "Downvoted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while downvoting" },
      { status: 411 }
    );
  }
}
