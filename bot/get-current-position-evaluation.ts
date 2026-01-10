import { PIECES } from "../game/pieces/all";
import type { GameState } from "../game/types";

export const getCurrentPositionEvaluation = (gameState: GameState): number => {
  const whitePieceSquares = Object.values(gameState.position).filter(
    (piece) => piece?.color === "white"
  );
  const blackPieceSquares = Object.values(gameState.position).filter(
    (piece) => piece?.color === "black"
  );

  const whitePiecesValue = whitePieceSquares.reduce((acc, square) => {
    const piece = PIECES.find((p) => p.name === square?.piece)!;
    return acc + piece.value;
  }, 0);
  const blackPiecesValue = blackPieceSquares.reduce((acc, square) => {
    const piece = PIECES.find((p) => p.name === square?.piece)!;
    return acc + piece.value;
  }, 0);

  return whitePiecesValue - blackPiecesValue;
};
