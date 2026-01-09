import type { GameState, Move, SquareKey } from "../../types";

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

  const latestMovePiece = gameState.position[latestMove.to];
  if (latestMovePiece?.piece !== "pawn") return false;

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

export const getEnPassantAvailabilitySquare = (
  gameState: GameState
): SquareKey | null => {
  const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];
  if (!lastMove) return null;

  const movedPiece = gameState.position[lastMove.to];
  if (movedPiece?.piece !== "pawn") return null;

  const fromRank = parseInt(lastMove.from[1]!);
  const toRank = parseInt(lastMove.to[1]!);
  if (Math.abs(toRank - fromRank) !== 2) return null;

  const file = lastMove.to[0]!;
  const targetRank = (fromRank + toRank) / 2;
  const targetSquare = `${file}${targetRank}` as SquareKey;

  const adjacentFiles = [
    String.fromCharCode(file.charCodeAt(0) - 1),
    String.fromCharCode(file.charCodeAt(0) + 1),
  ].filter((f) => f >= "a" && f <= "h");

  const adjacentPawnSquares = adjacentFiles.map(
    (adjFile) =>
      `${adjFile}${
        movedPiece.color === "white"
          ? BLACK_EN_PASSANT_RANK
          : WHITE_EN_PASSANT_RANK
      }` as SquareKey
  );

  const isEnPassantAvailable = adjacentPawnSquares.some((square) => {
    return getIsEnPassant(gameState, { from: square, to: targetSquare });
  });

  return isEnPassantAvailable ? targetSquare : null;
};
