"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/store";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
export default function HomePage() {
  const { connected, publicKey } = useWallet();
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogin = async () => {
    if (!connected || !publicKey) {
      alert("Please Connect Your wallet");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: publicKey.toBase58() }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("sessionToken", data.user.sessionToken);
      router.push("/member/");
    }
  };

  return (
    <div>
      <div className="flex justify-end pt-4 px-4">
        <WalletMultiButton
          onClick={() => console.log("Yes")}
          style={{
            width: "12rem",
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <button
          onClick={handleLogin}
          className="mt-4 w-48 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login with Wallet
        </button>
      </div>
    </div>
  );
}
