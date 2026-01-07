import { describe, expect, it } from "bun:test";
import { emptyPosition, initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/moves";

describe("rook", () => {
  it("should move successfully", () => {
    const { position: newPosition } = makeMove(
      {
        position: { ...emptyPosition, c1: { color: "white", piece: "rook" } },
        moveHistory: [],
      },
      { from: "c1", to: "c2" }
    );

    expect(newPosition.c2).toEqual({ color: "white", piece: "rook" });
    expect(newPosition.c1).toBeNull();
  });

  it("should capture successfully", () => {
    const { position: newPosition } = makeMove(
      {
        position: {
          ...emptyPosition,
          c1: { color: "white", piece: "rook" },
          f1: { color: "black", piece: "queen" },
        },
        moveHistory: [],
      },
      { from: "c1", to: "f1" }
    );

    expect(newPosition.f1).toEqual({ color: "white", piece: "rook" });
    expect(newPosition.c1).toBeNull();
  });

  it("should not move successfully (capturing self)", () => {
    expect(() =>
      makeMove(
        { position: initialPosition, moveHistory: [] },
        { from: "a1", to: "b1" }
      )
    ).toThrowError("capturing-self");
  });

  it("should not move successfully (piece in the way)", () => {
    expect(() =>
      makeMove(
        { position: initialPosition, moveHistory: [] },
        { from: "a1", to: "a5" }
      )
    ).toThrowError("piece-in-the-way");
  });

  it("should not move successfully (knight move)", () => {
    expect(() =>
      makeMove(
        {
          position: { ...emptyPosition, e5: { color: "white", piece: "rook" } },
          moveHistory: [],
        },
        { from: "e5", to: "d3" }
      )
    ).toThrowError("invalid-vector");
  });

  it("should not move successfully (bishop move)", () => {
    expect(() =>
      makeMove(
        {
          position: { ...emptyPosition, e5: { color: "white", piece: "rook" } },
          moveHistory: [],
        },
        { from: "e5", to: "f6" }
      )
    ).toThrowError("invalid-vector");
  });
});
