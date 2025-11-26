"use client";

import { Button } from "@/components/ui/button";

export default function ArrowButtons({
  onMove,
}: {
  onMove: (dx: number, dy: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={() => onMove(0, -1)} size="lg">
        ↑
      </Button>
      <div className="flex gap-2">
        <Button onClick={() => onMove(-1, 0)} size="lg">
          ←
        </Button>
        <Button onClick={() => onMove(1, 0)} size="lg">
          →
        </Button>
      </div>
      <Button onClick={() => onMove(0, 1)} size="lg">
        ↓
      </Button>
    </div>
  );
}
