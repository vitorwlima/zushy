import { blackBoardDisplay, whiteBoardDisplay } from "@/lib/board-display";
import { cn } from "@/lib/utilts";
import { Piece } from "game/pieces";
import { getIsWhiteTurn } from "game/state/get-is-white-turn";
import type { Color, GameState, SquareKey } from "game/types";
import Image from "next/image";
import { GameStatusResult, getGameStatus } from "game/state/game-status";
import { RotateCcwSquareIcon } from "lucide-react";
import { useState } from "react";

const PIECE_SET = "maestro";

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
  "threefold-repetition": "Draw by threefold repetition",
  "fifty-move-rule": "Draw by fifty-move rule",
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
  const [boardPerspective, setBoardPerspective] = useState<Color>("white");
  const isWhiteTurn = getIsWhiteTurn(gameState);
  const gameStatus = getGameStatus(gameState);
  const isGameOver = !["white-to-play", "black-to-play"].includes(gameStatus);
  const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];

  const boardDisplay =
    boardPerspective === "white" ? whiteBoardDisplay : blackBoardDisplay;

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
        const isLastMoveFrom = lastMove?.from === code;
        const isLastMoveTo = lastMove?.to === code;

        return (
          <div
            key={code}
            className={cn(
              "size-20 flex relative items-center justify-center overflow-visible transition-colors",
              color === "white" ? "bg-[#CDB382]" : "bg-[#835A37]"
            )}
            aria-disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              onSquareClick(code);
            }}
          >
            {!!piece && (
              <Image
                src={`/pieces/${PIECE_SET}/${piece.color.slice(0, 1)}${
                  pieceAbreviation[piece.piece]
                }.svg`}
                className="z-10"
                alt={code}
                height={80}
                width={80}
                draggable={false}
              />
            )}

            <div
              className={cn(
                "absolute inset-0 bg-[#A7762C]/90 transition-opacity opacity-0 duration-150",
                isLastMoveFrom && "opacity-100"
              )}
            />

            <div
              className={cn(
                "absolute inset-0 opacity-0 bg-[#C99E4A]/90 transition-opacity duration-150",
                (highlightedSquares.includes(code) || isLastMoveTo) &&
                  "opacity-100"
              )}
            />

            {isPromoting && promotionColor && (
              <div
                className={
                  "absolute top-0 right-0 bg-neutral-400 w-20 h-80 z-20 transition-opacity duration-150"
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
                        src={`/pieces/${PIECE_SET}/${promotionColor.slice(
                          0,
                          1
                        )}${pieceAbreviation[promotingPiece]}.svg`}
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
      <RotateCcwSquareIcon
        className="absolute -top-1 -right-7 hover:opacity-80 rounded-full cursor-pointer size-5"
        onClick={() => {
          setBoardPerspective(boardPerspective === "white" ? "black" : "white");
        }}
      />
      {isGameOver && (
        <p className="text-neutral-100 font-semibold absolute -bottom-8 capitalize">
          {gameStatusMessages[gameStatus]}
        </p>
      )}
    </div>
  );
};
