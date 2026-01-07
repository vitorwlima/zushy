import { describe, expect, it } from "bun:test";
import { initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/moves";

describe("pieces", () => {
  it("should not move inexistent piece", () => {
    expect(() =>
      makeMove(
        { position: initialPosition, moveHistory: [] },
        { from: "a3", to: "a4" }
      )
    ).toThrowError("no-piece-in-from-square");
  });
});
