import type { CastleType, GameState, Move, SquareKey } from "../../types";
import {
  getIsBlackInCheck,
  getIsSquareAttackedByColor,
  getIsWhiteInCheck,
} from "../check";

type CastleMove = Move & {
  rookFrom: SquareKey;
  rookTo: SquareKey;
  type: CastleType;
};

type CastleOptions = {
  getRightsOnly?: boolean;
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
  move: Move,
  options?: CastleOptions
): boolean => {
  const castleMove = POSSIBLE_CASTLE_MOVES.find(
    (castleMove) => castleMove.from === move.from && castleMove.to === move.to
  );
  if (!castleMove) return false;

  if (castleMove.type === "white-short-side") {
    return canWhiteCastleShortSide(gameState, options);
  }

  if (castleMove.type === "white-long-side") {
    return canWhiteCastleLongSide(gameState, options);
  }

  if (castleMove.type === "black-short-side") {
    return canBlackCastleShortSide(gameState, options);
  }

  if (castleMove.type === "black-long-side") {
    return canBlackCastleLongSide(gameState, options);
  }

  return false;
};

export const canWhiteCastleShortSide = (
  gameState: GameState,
  options?: CastleOptions
) => {
  const squaresBetween = ["f1", "g1"] as const;
  const kingSquare = "e1" as const;
  const rookSquare = "h1" as const;

  const king = gameState.position[kingSquare];
  const rook = gameState.position[rookSquare];
  if (king?.piece !== "king" || king.color !== "white") return false;
  if (rook?.piece !== "rook" || rook.color !== "white") return false;

  const hasWhiteKingOrRookMoved = gameState.moveHistory.some((move) => {
    return move.from === kingSquare || move.from === rookSquare;
  });
  if (hasWhiteKingOrRookMoved) return false;

  if (options?.getRightsOnly) return true;

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

export const canWhiteCastleLongSide = (
  gameState: GameState,
  options?: CastleOptions
) => {
  const squaresBetween = ["b1", "c1", "d1"] as const;
  const kingSquare = "e1" as const;
  const rookSquare = "a1" as const;

  const king = gameState.position[kingSquare];
  const rook = gameState.position[rookSquare];
  if (king?.piece !== "king" || king.color !== "white") return false;
  if (rook?.piece !== "rook" || rook.color !== "white") return false;

  const hasWhiteKingOrRookMoved = gameState.moveHistory.some((move) => {
    return move.from === kingSquare || move.from === rookSquare;
  });
  if (hasWhiteKingOrRookMoved) return false;

  if (options?.getRightsOnly) return true;

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

export const canBlackCastleShortSide = (
  gameState: GameState,
  options?: CastleOptions
) => {
  const squaresBetween = ["f8", "g8"] as const;
  const kingSquare = "e8" as const;
  const rookSquare = "h8" as const;

  const king = gameState.position[kingSquare];
  const rook = gameState.position[rookSquare];
  if (king?.piece !== "king" || king.color !== "black") return false;
  if (rook?.piece !== "rook" || rook.color !== "black") return false;

  const hasBlackKingOrRookMoved = gameState.moveHistory.some((move) => {
    return move.from === kingSquare || move.from === rookSquare;
  });
  if (hasBlackKingOrRookMoved) return false;

  if (options?.getRightsOnly) return true;

  const hasPiecesInBetween = squaresBetween.some(
    (square) => gameState.position[square] !== null
  );
  if (hasPiecesInBetween) return false;

  const isInCheck = getIsBlackInCheck(gameState);
  if (isInCheck) return false;

  const isSomeOfTheSquaresBetweenAttacked = squaresBetween.some((square) =>
    getIsSquareAttackedByColor({
      gameState,
      square,
      color: "white",
    })
  );
  if (isSomeOfTheSquaresBetweenAttacked) return false;

  return true;
};

export const canBlackCastleLongSide = (
  gameState: GameState,
  options?: CastleOptions
) => {
  const squaresBetween = ["b8", "c8", "d8"] as const;
  const kingSquare = "e8" as const;
  const rookSquare = "a8" as const;

  const king = gameState.position[kingSquare];
  const rook = gameState.position[rookSquare];
  if (king?.piece !== "king" || king.color !== "black") return false;
  if (rook?.piece !== "rook" || rook.color !== "black") return false;

  const hasBlackKingOrRookMoved = gameState.moveHistory.some((move) => {
    return move.from === kingSquare || move.from === rookSquare;
  });
  if (hasBlackKingOrRookMoved) return false;

  if (options?.getRightsOnly) return true;

  const hasPiecesInBetween = squaresBetween.some(
    (square) => gameState.position[square] !== null
  );
  if (hasPiecesInBetween) return false;

  const isInCheck = getIsBlackInCheck(gameState);
  if (isInCheck) return false;

  const isSomeOfTheSquaresBetweenAttacked = squaresBetween.some((square) =>
    getIsSquareAttackedByColor({
      gameState,
      square,
      color: "white",
    })
  );
  if (isSomeOfTheSquaresBetweenAttacked) return false;

  return true;
};

export const getCastlingRights = (gameState: GameState): CastleType[] => {
  return POSSIBLE_CASTLE_MOVES.filter((castleMove) => {
    return getIsCastlingValid(gameState, castleMove, { getRightsOnly: true });
  }).map((castleMove) => castleMove.type);
};
