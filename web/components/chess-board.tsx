import { boardDisplay } from "@/lib/board-display";
import { cn } from "@/lib/utilts";
import { Piece } from "game/pieces";
import { getIsWhiteTurn } from "game/state/get-is-white-turn";
import type { GameState, SquareKey } from "game/types";
import Image from "next/image";
import { GameStatusResult, getGameStatus } from "game/state/game-status";

const pieceAbreviation: Record<Piece["name"], string> = {
  pawn: "p",
  knight: "n",
  bishop: "b",
  rook: "r",
  queen: "q",
  king: "k",
};

const gameStatusMessages: Record<GameStatusResult, string> = {
  "white-to-play": "White to play",
  "black-to-play": "Black to play",
  "white-wins-by-checkmate": "White wins by checkmate",
  "black-wins-by-checkmate": "Black wins by checkmate",
  stalemate: "Draw by stalemate",
};

export const ChessBoard = ({
  gameState,
  onSquareClick,
  highlightedSquares,
  isPromotingOnSquare,
  onPromotion,
}: {
  gameState: GameState;
  onSquareClick: (code: SquareKey) => void;
  highlightedSquares: SquareKey[];
  isPromotingOnSquare: SquareKey | null;
  onPromotion: (promotion: "queen" | "rook" | "bishop" | "knight") => void;
}) => {
  const isWhiteTurn = getIsWhiteTurn(gameState);
  const gameStatus = getGameStatus(gameState);
  const isGameOver = !["white-to-play", "black-to-play"].includes(gameStatus);

  return (
    <div className="grid relative grid-cols-8 grid-rows-8 place-items-center select-none">
      {boardDisplay.map(({ code, color }) => {
        const piece = gameState.position[code];
        const isDisabledByTurn =
          highlightedSquares.length === 0 &&
          (piece === null ||
            (piece?.color === "white" && !isWhiteTurn) ||
            (piece?.color === "black" && isWhiteTurn));
        const isDisabled = isDisabledByTurn || isGameOver;
        const isPromoting = isPromotingOnSquare === code;
        const promotionColor = gameState.position[highlightedSquares[0]]?.color;

        return (
          <div
            key={code}
            className={cn(
              "size-20 flex relative items-center justify-center overflow-visible transition-colors duration-150",
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
                src={`/pieces/cardinal/${piece.color.slice(0, 1)}${
                  pieceAbreviation[piece.piece]
                }.svg`}
                alt={code}
                height={80}
                width={80}
                draggable={false}
              />
            )}

            {isPromoting && promotionColor && (
              <div
                className={
                  "absolute top-0 right-0 bg-gray-500 w-20 h-80 z-10 transition-opacity duration-150"
                }
              >
                {(["queen", "rook", "bishop", "knight"] as const).map(
                  (promotingPiece) => (
                    <div
                      className="size-20 flex items-center justify-center"
                      key={promotingPiece}
                      onClick={() => {
                        if (isDisabled) return;
                        onPromotion(promotingPiece);
                      }}
                    >
                      <Image
                        src={`/pieces/cardinal/${promotionColor.slice(0, 1)}${
                          pieceAbreviation[promotingPiece]
                        }.svg`}
                        alt={code}
                        height={80}
                        width={80}
                        draggable={false}
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        );
      })}
      {isGameOver && (
        <p className="text-gray-100 font-semibold absolute -bottom-8 capitalize">
          {gameStatusMessages[gameStatus]}
        </p>
      )}
    </div>
  );
};
