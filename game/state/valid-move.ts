import type { Pattern, Vec } from "../pieces";
import { PIECES } from "../pieces/all";
import { initialPosition } from "../position";
import type { Move, SquareKey, GameState, Position } from "../types";
import { getIsBlackInCheck, getIsWhiteInCheck } from "./check";
import { getIsWhiteTurn } from "./get-is-white-turn";

type ValidMoveResult =
  | "success"
  | "no-piece-in-from-square"
  | "invalid-piece"
  | "invalid-vector"
  | "piece-in-the-way"
  | "capturing-self"
  | "not-color-turn"
  | "in-check";

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

export const isValidMove = (
  { position, moveHistory }: GameState,
  move: Move
): ValidMoveResult => {
  const fromSquare = position[move.from];
  const toSquare = position[move.to];
  if (!fromSquare) return "no-piece-in-from-square";

  const isWhiteTurn = getIsWhiteTurn({ position, moveHistory });
  const isColorTurn = fromSquare?.color === (isWhiteTurn ? "white" : "black");
  if (!isColorTurn) return "not-color-turn";

  const piece = PIECES.find((p) => p.name === fromSquare.piece);
  if (!piece) return "invalid-piece";

  const isCapturingSelf = fromSquare.color === toSquare?.color;
  if (isCapturingSelf) return "capturing-self";

  const isCapturing = toSquare !== null;

  const vector = getVector(move.from, move.to);
  const xFactor = Math.abs(vector.dx);
  const yFactor = Math.abs(vector.dy);
  const factoredVector = {
    dx: vector.dx / xFactor || 0,
    dy: vector.dy / yFactor || 0,
  };

  const pattern =
    isCapturing && piece.capturePattern !== "same as move pattern"
      ? piece.capturePattern
      : piece.movePattern;

  const colorAwarePattern = pattern.map((pattern) => {
    return {
      ...pattern,
      vec: {
        ...pattern.vec,
        dy:
          piece.vectorPerspective === "relativeToColor" &&
          fromSquare.color === "black"
            ? pattern.vec.dy * -1
            : pattern.vec.dy,
      },
    };
  }) satisfies Pattern[];

  const isVectorValid = colorAwarePattern.some((pattern) => {
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

    if (xFactor !== yFactor && xFactor !== 0 && yFactor !== 0) return false;

    return (
      factoredVector.dx === pattern.vec.dx &&
      factoredVector.dy === pattern.vec.dy
    );
  });
  if (!isVectorValid) return "invalid-vector";

  const futurePosition = {
    ...position,
    [move.from]: null,
    [move.to]: { ...fromSquare },
  } satisfies Position;

  const wouldWhiteBeInCheck = getIsWhiteInCheck({
    position: futurePosition,
    moveHistory: [...moveHistory, { ...move, notation: "tbd" }],
  });
  const wouldBlackBeInCheck = getIsBlackInCheck({
    position: futurePosition,
    moveHistory: [...moveHistory, { ...move, notation: "tbd" }],
  });

  if (wouldWhiteBeInCheck && isWhiteTurn) return "in-check";
  if (wouldBlackBeInCheck && !isWhiteTurn) return "in-check";

  const squaresBetween = piece.canMoveThroughOtherPieces
    ? []
    : getSquaresBetween(move.from, move.to, factoredVector);
  const hasOtherPiecesBetween = squaresBetween.some(
    (square) => position[square]
  );
  if (hasOtherPiecesBetween) return "piece-in-the-way";

  return "success";
};
