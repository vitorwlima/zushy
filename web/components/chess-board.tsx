import { boardDisplay } from "@/lib/board-display";
import { cn } from "@/lib/utilts";
import { Piece } from "game/pieces";
import { getIsWhiteTurn } from "game/state/get-is-white-turn";
import type { GameState, SquareKey } from "game/types";
import Image from "next/image";
import { getIsCheckmate } from "game/state/checkmate";

const pieceAbreviation: Record<Piece["name"], string> = {
  pawn: "p",
  knight: "n",
  bishop: "b",
  rook: "r",
  queen: "q",
  king: "k",
};

export const ChessBoard = ({
  gameState,
  onSquareClick,
  highlightedSquares,
}: {
  gameState: GameState;
  onSquareClick: (code: SquareKey) => void;
  highlightedSquares: SquareKey[];
}) => {
  const isWhiteTurn = getIsWhiteTurn(gameState);
  const checkmateResult = getIsCheckmate(gameState);

  return (
    <div className="grid relative grid-cols-8 grid-rows-8 place-items-center select-none">
      {boardDisplay.map(({ code, color }) => {
        const piece = gameState.position[code];
        const isDisabledByTurn =
          highlightedSquares.length === 0 &&
          (piece === null ||
            (piece?.color === "white" && !isWhiteTurn) ||
            (piece?.color === "black" && isWhiteTurn));
        const isDisabled = isDisabledByTurn || checkmateResult !== null;

        return (
          <div
            key={code}
            className={cn(
              "size-20 flex items-center justify-center transition-colors duration-150",
              color === "white" ? "bg-cyan-100/50" : "bg-cyan-700/80",
              highlightedSquares.includes(code) ? "bg-amber-400" : ""
            )}
            aria-disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              onSquareClick(code);
            }}
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
      {checkmateResult !== null && (
        <p className="text-gray-800 font-semibold absolute -bottom-8 capitalize">
          {checkmateResult} wins by checkmate.
        </p>
      )}
    </div>
  );
};
