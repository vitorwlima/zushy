import { describe, expect, it } from "bun:test";
import { emptyPosition, initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/make-move";
import type { GameState } from "../../game/types";
import { getGameStatus } from "../../game/state/game-status";

describe("pieces", () => {
  it("should not move inexistent piece", () => {
    expect(() =>
      makeMove(
        {
          position: initialPosition,
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "a3", to: "a4" }
      )
    ).toThrowError("no-piece-in-from-square");
  });

  it("should be stalemate", () => {
    const gameState = {
      position: {
        ...emptyPosition,
        e1: { color: "white", piece: "king" },
        h8: { color: "black", piece: "king" },
        f4: { color: "white", piece: "queen" },
      },
      moveHistory: [],
      positionAfterMoveHistory: [],
      threefoldRepetitionHistory: [],
    } satisfies GameState;

    const blunderStalemate = makeMove(gameState, { from: "f4", to: "f7" });
    const gameStatus = getGameStatus(blunderStalemate);
    expect(gameStatus).toEqual("stalemate");
  });
});
