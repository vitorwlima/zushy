import { describe, expect, it } from "bun:test";
import { emptyPosition } from "../game/position";
import { getGameStatus } from "../game/state/game-status";
import { getThreefoldStatus } from "../game/state/get-threefold-status";
import { makeMove } from "../game/state/make-move";
import { isValidMove } from "../game/state/valid-move";
import type { GameState, Move, SquareKey } from "../game/types";

const ALL_SQUARES = Object.keys(emptyPosition) as SquareKey[];

const getThreefoldKey = (state: GameState): string => {
  const status = getThreefoldStatus(state);
  // Ensure stable equality across array ordering.
  const castling = [...status.castlingRights].sort().join(",");
  return [
    status.turn,
    status.positionString,
    status.enPassantSquare ?? "-",
    castling,
  ].join("|");
};

const getLegalQuietMoves = (state: GameState): Move[] => {
  const isWhiteTurn = state.moveHistory.length % 2 === 0;
  const color = isWhiteTurn ? "white" : "black";

  const fromSquares = ALL_SQUARES.filter(
    (sq) => state.position[sq]?.color === color
  );

  const moves: Move[] = [];
  for (const from of fromSquares) {
    const fromSquare = state.position[from];
    if (!fromSquare) continue;
    if (fromSquare.piece === "pawn") continue;

    for (const to of ALL_SQUARES) {
      if (from === to) continue;
      // Avoid captures entirely for this test (50-move rule needs "quiet" moves).
      if (state.position[to] !== null) continue;

      const result = isValidMove(state, { from, to });
      if (result === "success") moves.push({ from, to });
    }
  }

  return moves;
};

describe("fifty-move rule", () => {
  it("should be a draw after 50 full moves without pawn moves or captures", () => {
    // Minimal high-mobility position, no pawns => every move is a candidate for the 50-move clock.
    // We also avoid 3-fold repetition so the draw reason is unambiguous.
    let state: GameState = {
      position: {
        ...emptyPosition,
        a1: { color: "white", piece: "king" },
        h8: { color: "black", piece: "king" },
        b1: { color: "white", piece: "knight" },
        g1: { color: "white", piece: "knight" },
        b8: { color: "black", piece: "knight" },
        g8: { color: "black", piece: "knight" },
      },
      moveHistory: [],
      positionAfterMoveHistory: [],
      threefoldRepetitionHistory: [],
    };

    const maxPlies = 100; // 50 full moves
    for (let ply = 0; ply < maxPlies; ply++) {
      const candidates = getLegalQuietMoves(state);
      if (candidates.length === 0) {
        throw new Error(`no-legal-quiet-moves at ply=${ply}`);
      }

      // Deterministically pick the first move that does NOT create a 3-fold repetition.
      // This keeps the test stable and ensures we test the 50-move-rule outcome specifically.
      let nextState: GameState | null = null;
      for (const move of candidates) {
        const prospective = makeMove(state, move);
        const key = getThreefoldKey(prospective);
        const occurrences = prospective.threefoldRepetitionHistory.filter(
          (s) =>
            [
              s.turn,
              s.positionString,
              s.enPassantSquare ?? "-",
              [...s.castlingRights].sort().join(","),
            ].join("|") === key
        ).length;

        if (occurrences >= 3) continue;
        nextState = prospective;
        break;
      }

      if (!nextState) {
        throw new Error(`could-not-avoid-threefold at ply=${ply}`);
      }

      state = nextState;
      expect(getGameStatus(state)).not.toEqual("threefold-repetition");
    }

    // Not implemented yet: this assertion should fail until the fifty-move rule is added.
    expect(getGameStatus(state)).toEqual("fifty-move-rule");
  });
});

