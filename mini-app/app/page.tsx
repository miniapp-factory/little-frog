"use client";
import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import MazeGame from "@/components/maze-game";
import StartScreen from "@/components/start-screen";
import { useState } from "react";

export { generateMetadata };

export default function Home() {
  // NEVER write anything here, only use this page to import components
  const [started, setStarted] = useState(false);
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      {started ? <MazeGame /> : <StartScreen onStart={() => setStarted(true)} />}
    </main>
  );
}
