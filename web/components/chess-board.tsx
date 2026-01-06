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
}

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
              "size-20 flex items-center justify-center transition-colors duration-150",
              color === "white" ? "bg-gray-100" : "bg-cyan-900",
              highlightedSquares.includes(code) ? "bg-cyan-500/80" : ""
            )}
            onClick={() => onSquareClick(code)}
          >
            {!!piece && (
              <Image
                src={`/pieces/california/${piece.color.slice(0, 1)}${pieceAbreviation[piece.piece]}.svg`}
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
