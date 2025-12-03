"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function StartScreen({
  onStart,
}: {
  onStart: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-yellow-500">
      <Image src="/logo.png" alt="App Logo" width={200} height={200} />
      <Button onClick={onStart} size="lg" className="bg-red-500">
        Start Game
      </Button>
    </div>
  );
}
