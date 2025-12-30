import type { Vec } from "../pieces";
import { PIECES } from "../pieces/all";
import { type Position, type SquareKey } from "../position";

export type Move = {
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

const getSquaresBetween = (from: SquareKey, to: SquareKey): SquareKey[] => {
  const vector = getVector(from, to);
  const squares: SquareKey[] = [];
  const [startFile, startRank] = from.split("");
  const [endFile, endRank] = to.split("");

  let currentX = FILE_VALUES[startFile! as keyof typeof FILE_VALUES];
  let currentY = parseInt(startRank!);

  while (
    currentX !== FILE_VALUES[endFile! as keyof typeof FILE_VALUES] &&
    currentY !== parseInt(endRank!)
  ) {
    currentX += vector.dx;
    currentY += vector.dy;
    const fileName = Object.keys(FILE_VALUES).find(
      (key) => FILE_VALUES[key as keyof typeof FILE_VALUES] === currentX
    )!;
    squares.push(`${fileName}${currentY}` as SquareKey);
  }

  return squares;
};

const isValidMove = (position: Position, move: Move): boolean => {
  const fromSquare = position[move.from];
  if (!fromSquare) return false;

  const piece = PIECES.find((p) => p.name === fromSquare.piece)!;
  if (!piece) return false;

  const vector = getVector(move.from, move.to);
  const isVectorValid = piece.movePattern.some((pattern) => {
    if (pattern.kind === "step") {
      return pattern.vec.dx === vector.dx && pattern.vec.dy === vector.dy;
    }

    const xFactor = Math.abs(pattern.vec.dx);
    const yFactor = Math.abs(pattern.vec.dy);

    if (xFactor !== yFactor) return false;

    const factoredVector = {
      dx: pattern.vec.dx / xFactor,
      dy: pattern.vec.dy / yFactor,
    };

    return factoredVector.dx === vector.dx && factoredVector.dy === vector.dy;
  });
  if (!isVectorValid) return false;

  if (piece.canMoveThroughOtherPieces) return true;

  const squaresBetween = getSquaresBetween(move.from, move.to);
  const hasOtherPiecesBetween = squaresBetween.some(
    (square) => position[square]
  );
  if (hasOtherPiecesBetween) return false;

  return true;
};

const makeMove = (position: Position, move: Move) => {
  if (!isValidMove(position, move)) throw new Error("Invalid move");

  const newPosition = {
    ...position,
    [move.from]: null,
    [move.to]: { ...position[move.from]! },
  };

  return newPosition;
};
