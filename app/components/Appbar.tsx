"use client";

import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Appbar() {
  const session = useSession();
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-gray-950 p-10 border-b border-gray-600">
      <Link className="flex items-center justify-center" href="#">
        <Music className="h-6 w-6 text-purple-500" />
        <span className="ml-2 text-2xl font-bold text-purple-500">Muzi</span>
      </Link>
      {session.data?.user ? (
        <Button className="ml-4 bg-purple-600" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button className="ml-4 bg-purple-600" onClick={() => signIn()}>
          Sign In
        </Button>
      )}
    </header>
    // <div className="flex justify-between">
    //   <div>Muzi</div>
    //   <div>
    //     {session.data?.user ? (
    //       <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>
    //         Logout
    //       </button>
    //     ) : (
    //       <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>
    //         Sign In
    //       </button>
    //     )}
    //   </div>
    // </div>
  );
}
