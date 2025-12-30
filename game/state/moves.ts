import type { Vec } from "../pieces";
import { PIECES } from "../pieces/all";
import { initialPosition, type Position, type SquareKey } from "../position";

type ValidMoveResult =
  | "success"
  | "no-piece-in-from-square"
  | "invalid-piece"
  | "invalid-vector"
  | "piece-in-the-way"
  | "capturing-self";

type Move = {
  from: SquareKey;
  to: SquareKey;
};

const FILE_VALUES = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
};

const getVector = (from: SquareKey, to: SquareKey): Vec => {
  const [startFile, startRank] = from.split("");
  const [endFile, endRank] = to.split("");
  const deltaX =
    FILE_VALUES[endFile! as keyof typeof FILE_VALUES] -
    FILE_VALUES[startFile! as keyof typeof FILE_VALUES];
  const deltaY = parseInt(endRank!) - parseInt(startRank!);

  return { dx: deltaX, dy: deltaY };
};

const getSquaresBetween = (
  from: SquareKey,
  to: SquareKey,
  factoredVector: Vec
): SquareKey[] => {
  const squares: SquareKey[] = [];
  const [startFile, startRank] = from.split("");
  const [endFile, endRank] = to.split("");

  let currentX = FILE_VALUES[startFile! as keyof typeof FILE_VALUES];
  let currentY = parseInt(startRank!);

  while (true) {
    currentX += factoredVector.dx;
    currentY += factoredVector.dy;
    const fileName = Object.keys(FILE_VALUES).find(
      (key) => FILE_VALUES[key as keyof typeof FILE_VALUES] === currentX
    )!;

    if (fileName === endFile && currentY === parseInt(endRank!)) break;

    squares.push(`${fileName}${currentY}` as SquareKey);
  }

  return squares;
};

const isValidMove = (position: Position, move: Move): ValidMoveResult => {
  const fromSquare = position[move.from];
  if (!fromSquare) return "no-piece-in-from-square";

  const piece = PIECES.find((p) => p.name === fromSquare.piece);
  if (!piece) return "invalid-piece";

  const isCapturingSelf = fromSquare.color === position[move.to]?.color;
  if (isCapturingSelf) return "capturing-self";

  const vector = getVector(move.from, move.to);
  const xFactor = Math.abs(vector.dx);
  const yFactor = Math.abs(vector.dy);
  const factoredVector = {
    dx: vector.dx / xFactor || 0,
    dy: vector.dy / yFactor || 0,
  };

  const isVectorValid = piece.movePattern.some((pattern) => {
    if (pattern.kind === "step") {
      if (pattern.condition === "first move") {
        const initialPositionSquare = initialPosition[move.from];
        const currentPositionSquare = position[move.from];
        const isFirstMove =
          initialPositionSquare?.color === currentPositionSquare?.color &&
          initialPositionSquare?.piece === currentPositionSquare?.piece;
        if (!isFirstMove) return false;
      }

      return pattern.vec.dx === vector.dx && pattern.vec.dy === vector.dy;
    }

    if (xFactor !== yFactor) return false;

    return (
      factoredVector.dx === pattern.vec.dx &&
      factoredVector.dy === pattern.vec.dy
    );
  });
  if (!isVectorValid) return "invalid-vector";

  if (piece.canMoveThroughOtherPieces) return "success";

  const squaresBetween = getSquaresBetween(move.from, move.to, factoredVector);
  const hasOtherPiecesBetween = squaresBetween.some(
    (square) => position[square]
  );
  if (hasOtherPiecesBetween) return "piece-in-the-way";

  return "success";
};

export const makeMove = (position: Position, move: Move) => {
  const result = isValidMove(position, move);
  if (result !== "success") throw new Error(result);

  const newPosition = {
    ...position,
    [move.from]: null,
    [move.to]: { ...position[move.from]! },
  };

  return newPosition;
};
