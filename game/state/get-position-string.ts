import { initialPosition } from "../position";
import type { Position, SquareKey } from "../types";

export const getPositionString = (position: Position): string => {
  const sortedSquares = Object.keys(initialPosition).toSorted();
  const pieces = sortedSquares.map((square) => {
    const piece = position[square as SquareKey];
    if (!piece) return `${square}-empty`;
    return `${square}-${piece.color}-${piece.piece}`;
  });
  return pieces.join(",");
};
