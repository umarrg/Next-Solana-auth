"use client";

import React from "react";
import { useAtom } from "jotai";
import { counterAtom, userAtom } from "@/lib/store";
import { useRouter } from "next/navigation";
import withAuth from "@/lib/withAuth";

const MemberPage: React.FC = () => {
  const [count, setCount] = useAtom(counterAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    setUser(null);
    localStorage.clear();
    router.push("/");
  };

  return (
    <div>
      <div className="flex justify-end mx-4">
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen ">
        <p className="mt-4 text-xl">Counter: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Increment
        </button>
      </div>
    </div>
  );
};
export default withAuth(MemberPage);
