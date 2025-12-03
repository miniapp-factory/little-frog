import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import MazeGameClient from "./page.client";

export { generateMetadata };

export default function Home() {
  return <MazeGameClient />;
}
