import { PIECES } from "../pieces/all";
import type { GameState, Move, SquareKey } from "../types";
import { buildNewPosition } from "./build-new-position";
import { getIsBlackInCheck, getIsWhiteInCheck } from "./check";
import { getGameStatus } from "./game-status";
import { POSSIBLE_CASTLE_MOVES } from "./special-moves/castle";
import { getIsEnPassant } from "./special-moves/en-passant";
import { isValidMove } from "./valid-move";

export const getMoveNotation = (gameState: GameState, move: Move): string => {
  const fromSquare = gameState.position[move.from];
  if (!fromSquare) throw new Error("no-piece-in-from-square");

  const piece = fromSquare.piece;
  const pieceNotation = PIECES.find((p) => p.name === piece)!.notation;

  const castleMove = POSSIBLE_CASTLE_MOVES.find(
    (castleMove) => castleMove.from === move.from && castleMove.to === move.to
  );
  if (castleMove) {
    if (castleMove.type.includes("short-side")) {
      return `0-0`;
    }
    return `0-0-0`;
  }

  const otherPieceThatCouldCapture = Object.keys(gameState.position).find(
    (square) => {
      if (piece === "pawn") return false;

      const otherPiece = gameState.position[square as SquareKey];
      if (
        otherPiece?.color === fromSquare.color &&
        otherPiece.piece === piece &&
        square !== move.from &&
        isValidMove(gameState, { from: square as SquareKey, to: move.to }) ===
          "success"
      )
        return true;

      return false;
    }
  ) as SquareKey | undefined;
  let differentiatingFactor = "";

  if (otherPieceThatCouldCapture) {
    const file = otherPieceThatCouldCapture[0]!;
    const rank = otherPieceThatCouldCapture[1]!;

    if (file === move.to[0]) {
      differentiatingFactor = rank;
    } else {
      differentiatingFactor = file;
    }
  }

  const isCapturing =
    gameState.position[move.to] !== null || getIsEnPassant(gameState, move);

  const newPosition = buildNewPosition(gameState, move);
  const newGameState = {
    position: newPosition,
    moveHistory: [...gameState.moveHistory, { ...move, notation: "" }],
  } satisfies GameState;
  const gameStatus = getGameStatus(newGameState);
  const isCheck =
    gameStatus === "white-to-play"
      ? getIsWhiteInCheck(newGameState)
      : getIsBlackInCheck(newGameState);
  const isMate =
    gameStatus === "white-wins-by-checkmate" ||
    gameStatus === "black-wins-by-checkmate";

  const pieceNotationSuffix =
    pieceNotation === "" && isCapturing ? move.from[0] : "";
  const statusSuffix = isMate ? "#" : isCheck ? "+" : "";

  const notation = `${pieceNotation}${pieceNotationSuffix}${differentiatingFactor}${
    isCapturing ? "x" : ""
  }${move.to}${statusSuffix}`;

  return notation;
};
