import type { GameState, Move, SquareKey } from "../../types";
import { getIsSquareAttackedByColor, getIsWhiteInCheck } from "../check";

type CastleMove = Move & {
  rookFrom: SquareKey;
  rookTo: SquareKey;
  type:
    | "white-short-side"
    | "white-long-side"
    | "black-short-side"
    | "black-long-side";
};

export const POSSIBLE_CASTLE_MOVES: CastleMove[] = [
  {
    from: "e1",
    to: "g1",
    rookFrom: "h1",
    rookTo: "f1",
    type: "white-short-side",
  },
  {
    from: "e1",
    to: "c1",
    rookFrom: "a1",
    rookTo: "d1",
    type: "white-long-side",
  },
  {
    from: "e8",
    to: "g8",
    rookFrom: "h8",
    rookTo: "f8",
    type: "black-short-side",
  },
  {
    from: "e8",
    to: "c8",
    rookFrom: "a8",
    rookTo: "d8",
    type: "black-long-side",
  },
];

export const getIsCastlingValid = (
  gameState: GameState,
  move: Move
): boolean => {
  const castleMove = POSSIBLE_CASTLE_MOVES.find(
    (castleMove) => castleMove.from === move.from && castleMove.to === move.to
  );
  if (!castleMove) return false;

  if (castleMove.type === "white-short-side") {
    return canWhiteCastleShortSide(gameState);
  }

  return false;
};

export const canWhiteCastleShortSide = (gameState: GameState) => {
  const squaresBetween = ["f1", "g1"] as const;

  const hasWhiteKingOrRookMoved = gameState.moveHistory.some((move) => {
    return move.from === "e1" || move.from === "h1";
  });
  if (hasWhiteKingOrRookMoved) return false;

  const hasPiecesInBetween = squaresBetween.some(
    (square) => gameState.position[square] !== null
  );
  if (hasPiecesInBetween) return false;

  const isInCheck = getIsWhiteInCheck(gameState);
  if (isInCheck) return false;

  const isSomeOfTheSquaresBetweenAttacked = squaresBetween.some((square) =>
    getIsSquareAttackedByColor({
      gameState,
      square,
      color: "black",
    })
  );
  if (isSomeOfTheSquaresBetweenAttacked) return false;

  return true;
};
