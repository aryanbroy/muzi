import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    // if(!session) {
    //     return NextResponse.json({message: "User is not authorized!"}, {status: 401});
    // }

    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user.email ?? "",
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User is not authorized!" },
        { status: 401 }
      );
    }

    const currentStream = await prismaClient.currentStream.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        stream: true,
      },
    });

    return NextResponse.json(currentStream, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error occured while fetching current stream" },
      { status: 404 }
    );
  }
}
