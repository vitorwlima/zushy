import { boardDisplay } from "@/lib/board-display";
import { cn } from "@/lib/utilts";
import { Position, SquareKey } from "game/position";
import Image from "next/image";

export const ChessBoard = ({
  position,
  onSquareClick,
  highlightedSquares,
}: {
  position: Position;
  onSquareClick: (code: SquareKey) => void;
  highlightedSquares: SquareKey[];
}) => {
  return (
    <div className="grid grid-cols-8 grid-rows-8 place-items-center border border-cyan-900 select-none">
      {boardDisplay.map(({ code, color }) => {
        const piece = position[code];

        return (
          <div
            key={code}
            className={cn(
              "size-20 flex items-center justify-center",
              color === "white" ? "bg-gray-100" : "bg-cyan-900",
              highlightedSquares.includes(code) ? "bg-cyan-500" : ""
            )}
            onClick={() => onSquareClick(code)}
          >
            {!!piece && (
              <Image
                src={`/${piece.color}_${piece.piece}.svg`}
                alt={code}
                height={72}
                width={72}
                draggable={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
