import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
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

    const streams = await prismaClient.stream.findMany({
      where: {
        userId: user.id ?? "",
      },
      include: {
        _count: {
          select: {
            upvotes: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        streams: streams.map(({ _count, ...rest }) => ({
          ...rest,
          upvotes: _count.upvotes,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}
