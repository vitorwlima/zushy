import { describe, expect, it } from "bun:test";
import { emptyPosition } from "../game/position";
import { getGameStatus } from "../game/state/game-status";
import { makeMove } from "../game/state/make-move";
import type { GameState } from "../game/types";

describe("threefold repetition (en passant rights)", () => {
  it("should not count positions as equal when en passant availability differs", () => {
    // Construct a position where black can play ...d7-d5 and white has e5xd6 en passant available.
    // Then shuffle both kings out-and-back to recreate the same piece placement, but with no EP right.
    const start: GameState = {
      position: {
        ...emptyPosition,
        g1: { color: "white", piece: "king" },
        h8: { color: "black", piece: "king" },
        e5: { color: "white", piece: "pawn" },
        d7: { color: "black", piece: "pawn" },
      },
      // odd length => black to move; we keep this dummy move harmless (it doesn't need to match the position)
      moveHistory: [{ from: "a1", to: "a1", notation: "blank" }],
      positionAfterMoveHistory: [],
      threefoldRepetitionHistory: [],
    };

    // 1... d5 (double step)
    const s1 = makeMove(start, { from: "d7", to: "d5" });
    expect(
      s1.threefoldRepetitionHistory[s1.threefoldRepetitionHistory.length - 1]!
        .enPassantSquare
    ).toEqual("d6");

    // King shuffle: this returns to the exact same piece placement as s1, but EP is no longer available.
    const s2 = makeMove(s1, { from: "g1", to: "f1" });
    const s3 = makeMove(s2, { from: "h8", to: "g8" });
    const s4 = makeMove(s3, { from: "f1", to: "g1" });
    const s5 = makeMove(s4, { from: "g8", to: "h8" });

    expect(
      s5.threefoldRepetitionHistory[s5.threefoldRepetitionHistory.length - 1]!
        .enPassantSquare
    ).toBeNull();
    expect(getGameStatus(s5)).toEqual("white-to-play");

    // Repeat the king shuffle twice more. If EP rights were ignored, we'd incorrectly hit 3-fold at s9:
    // occurrences by piece placement+turn would be: s1 (EP), s5 (no EP), s9 (no EP).
    const s6 = makeMove(s5, { from: "g1", to: "f1" });
    const s7 = makeMove(s6, { from: "h8", to: "g8" });
    const s8 = makeMove(s7, { from: "f1", to: "g1" });
    const s9 = makeMove(s8, { from: "g8", to: "h8" });
    expect(getGameStatus(s9)).toEqual("white-to-play");

    const s10 = makeMove(s9, { from: "g1", to: "f1" });
    const s11 = makeMove(s10, { from: "h8", to: "g8" });
    const s12 = makeMove(s11, { from: "f1", to: "g1" });
    const s13 = makeMove(s12, { from: "g8", to: "h8" });
    expect(getGameStatus(s13)).toEqual("threefold-repetition");
  });
});
