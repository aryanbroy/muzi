"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function Appbar() {
  const session = useSession();
  return (
    <div className="flex justify-between">
      <div>Muzi</div>
      <div>
        {session.data?.user ? (
          <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
