import type { GameState, Move } from "../../types";

const WHITE_EN_PASSANT_RANK = "5";
const BLACK_EN_PASSANT_RANK = "4";

export const getIsEnPassant = (gameState: GameState, move: Move) => {
  const fromSquare = gameState.position[move.from];
  if (fromSquare?.piece !== "pawn") return false;

  const toSquare = gameState.position[move.to];
  if (toSquare !== null) return false;

  if (
    fromSquare?.color === "white" &&
    !move.from.endsWith(WHITE_EN_PASSANT_RANK)
  ) {
    return false;
  }

  if (
    fromSquare?.color === "black" &&
    !move.from.endsWith(BLACK_EN_PASSANT_RANK)
  ) {
    return false;
  }

  const latestMove = gameState.moveHistory[gameState.moveHistory.length - 1];
  if (!latestMove) return false;

  const hasMovedPawnJustOnce =
    gameState.moveHistory.filter((move) => move.from === latestMove.from)
      .length === 1;
  if (!hasMovedPawnJustOnce) return false;

  const enemyPawnMoveIfSingleSquareModifier =
    fromSquare?.color === "white" ? 1 : -1;
  const moveRank = parseInt(latestMove.to[1]!);
  const moveIfSingleSquare = `${latestMove.to[0]}${
    moveRank + enemyPawnMoveIfSingleSquareModifier
  }`;
  if (moveIfSingleSquare !== move.to) return false;

  const enemyPawnYDistance = Math.abs(
    parseInt(latestMove.to[1]!) - parseInt(latestMove.from[1]!)
  );
  if (enemyPawnYDistance !== 2) return false;

  return true;
};
