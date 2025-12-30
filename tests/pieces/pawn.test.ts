import { describe, expect, it } from "bun:test";
import { initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/moves";

describe("pawn", () => {
  it("should move successfully", () => {
    const newPosition = makeMove(initialPosition, { from: "a2", to: "a3" });

    expect(newPosition.a3).toEqual({ color: "white", piece: "pawn" });
    expect(newPosition.a2).toBeNull();
  });

  it("should move successfully", () => {
    const newPosition = makeMove(initialPosition, { from: "a2", to: "a4" });

    expect(newPosition.a4).toEqual({ color: "white", piece: "pawn" });
    expect(newPosition.a2).toBeNull();
  });

  it("should move successfully", () => {
    const pawnForwardPosition = makeMove(initialPosition, {
      from: "a2",
      to: "a3",
    });

    const newPosition = makeMove(pawnForwardPosition, { from: "a3", to: "a4" });

    expect(newPosition.a4).toEqual({ color: "white", piece: "pawn" });
    expect(newPosition.a2).toBeNull();
  });

  it("should not move successfully (invalid vector)", () => {
    const pawnForwardPosition = makeMove(initialPosition, {
      from: "a2",
      to: "a3",
    });

    expect(() =>
      makeMove(pawnForwardPosition, { from: "a3", to: "a5" })
    ).toThrowError("invalid-vector");
  });
});
