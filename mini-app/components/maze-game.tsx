"use client";

import { useState, useEffect } from "react";
import ArrowButtons from "./arrow-buttons";
import { Button } from "@/components/ui/button";

const GRID_SIZE = 10;
const CELL_SIZE = 40; // px

type Position = { x: number; y: number };

const getRandomObstacles = (): Position[] => {
  const obstacles: Position[] = [];
  const count = Math.floor(GRID_SIZE * GRID_SIZE * 0.15); // 15% obstacles
  while (obstacles.length < count) {
    const pos = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
    // avoid start, cheese, cat start
    if (
      (pos.x === 0 && pos.y === 0) ||
      (pos.x === GRID_SIZE - 1 && pos.y === GRID_SIZE - 1) ||
      (pos.x === GRID_SIZE - 1 && pos.y === 0)
    ) continue;
    if (!obstacles.some(o => o.x === pos.x && o.y === pos.y)) obstacles.push(pos);
  }
  return obstacles;
};

export default function MazeGame() {
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [catPos, setCatPos] = useState<Position>({ x: GRID_SIZE - 1, y: 0 });
  const [obstacles, setObstacles] = useState<Position[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<"mouse" | "cat" | null>(null);

  useEffect(() => {
    setObstacles(getRandomObstacles());
  }, []);

  const isObstacle = (pos: Position) => obstacles.some(o => o.x === pos.x && o.y === pos.y);

  const moveMouse = (dx: number, dy: number) => {
    if (gameOver) return;
    const newPos = { x: mousePos.x + dx, y: mousePos.y + dy };
    if (newPos.x < 0 || newPos.x >= GRID_SIZE || newPos.y < 0 || newPos.y >= GRID_SIZE) return;
    if (isObstacle(newPos)) return;
    setMousePos(newPos);
    const newMoves = moves + 1;
    setMoves(newMoves);
    // check win
    if (newPos.x === GRID_SIZE - 1 && newPos.y === GRID_SIZE - 1) {
      setGameOver(true);
      setWinner("mouse");
      return;
    }
    // cat chase after two moves
    if (newMoves >= 2) {
      moveCat();
    }
  };

  const moveCat = () => {
    if (gameOver) return;
    const dx = mousePos.x > catPos.x ? 1 : mousePos.x < catPos.x ? -1 : 0;
    const dy = mousePos.y > catPos.y ? 1 : mousePos.y < catPos.y ? -1 : 0;
    const newPos = { x: catPos.x + dx, y: catPos.y + dy };
    if (newPos.x < 0 || newPos.x >= GRID_SIZE || newPos.y < 0 || newPos.y >= GRID_SIZE) return;
    if (isObstacle(newPos)) return;
    setCatPos(newPos);
    // check catch
    if (newPos.x === mousePos.x && newPos.y === mousePos.y) {
      setGameOver(true);
      setWinner("cat");
    }
  };

  const resetGame = () => {
    setMousePos({ x: 0, y: 0 });
    setCatPos({ x: GRID_SIZE - 1, y: 0 });
    setObstacles(getRandomObstacles());
    setMoves(0);
    setGameOver(false);
    setWinner(null);
  };

  const renderCell = (x: number, y: number) => {
    const isMouse = mousePos.x === x && mousePos.y === y;
    const isCat = catPos.x === x && catPos.y === y;
    const isCheese = x === GRID_SIZE - 1 && y === GRID_SIZE - 1;
    const isObs = isObstacle({ x, y });
    let content = "";
    if (isMouse) content = "🐭";
    else if (isCat) content = "🐱";
    else if (isCheese) content = "🧀";
    else if (isObs) content = "🟫";
    return (
      <div
        key={`${x}-${y}`}
        className="w-10 h-10 flex items-center justify-center border border-black bg-green-500"
      >
        {content}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-10 gap-0">
        {Array.from({ length: GRID_SIZE }).flatMap((_, y) =>
          Array.from({ length: GRID_SIZE }).map((_, x) => renderCell(x, y))
        )}
      </div>
      <ArrowButtons onMove={moveMouse} />
      <Button onClick={resetGame} variant="outline">
        Try Again
      </Button>
      {gameOver && (
        <div className="text-xl mt-4">
          {winner === "mouse" ? "You win!" : "Cat caught you!"}
        </div>
      )}
    </div>
  );
}
