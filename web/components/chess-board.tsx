import { boardDisplay } from "@/lib/board-display";
import { cn } from "@/lib/utilts";
import { Piece } from "game/pieces";
import { Position, SquareKey } from "game/position";
import Image from "next/image";

const pieceAbreviation: Record<Piece["name"], string> = {
  pawn: "p",
  knight: "n",
  bishop: "b",
  rook: "r",
  queen: "q",
  king: "k",
};

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
    <div className="grid grid-cols-8 grid-rows-8 place-items-center select-none">
      {boardDisplay.map(({ code, color }) => {
        const piece = position[code];

        return (
          <div
            key={code}
            className={cn(
              "size-20 flex items-center justify-center transition-colors duration-150",
              color === "white" ? "bg-cyan-100/50" : "bg-cyan-700/80",
              highlightedSquares.includes(code) ? "bg-amber-400" : ""
            )}
            onClick={() => onSquareClick(code)}
          >
            {!!piece && (
              // california, cardinal, cburnett, fresca, gioco
              <Image
                src={`/pieces/gioco/${piece.color.slice(0, 1)}${
                  pieceAbreviation[piece.piece]
                }.svg`}
                alt={code}
                height={80}
                width={80}
                draggable={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
