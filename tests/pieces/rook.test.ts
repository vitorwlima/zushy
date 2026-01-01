import { describe, expect, it } from "bun:test";
import { emptyPosition, initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/moves";

describe("rook", () => {
  it("should move successfully", () => {
    const newPosition = makeMove(
      { ...emptyPosition, c1: { color: "white", piece: "rook" } },
      { from: "c1", to: "c2" }
    );

    expect(newPosition.c2).toEqual({ color: "white", piece: "rook" });
    expect(newPosition.c1).toBeNull();
  });

  it("should capture successfully", () => {
    const newPosition = makeMove(
      {
        ...emptyPosition,
        c1: { color: "white", piece: "rook" },
        f1: { color: "black", piece: "queen" },
      },
      { from: "c1", to: "f1" }
    );

    expect(newPosition.f1).toEqual({ color: "white", piece: "rook" });
    expect(newPosition.c1).toBeNull();
  });

  it("should not move successfully (capturing self)", () => {
    expect(() =>
      makeMove(initialPosition, { from: "a1", to: "b1" })
    ).toThrowError("capturing-self");
  });

  it("should not move successfully (piece in the way)", () => {
    expect(() =>
      makeMove(initialPosition, { from: "a1", to: "a5" })
    ).toThrowError("piece-in-the-way");
  });

  it("should not move successfully (knight move)", () => {
    expect(() =>
      makeMove(
        { ...emptyPosition, e5: { color: "white", piece: "rook" } },
        { from: "e5", to: "d3" }
      )
    ).toThrowError("invalid-vector");
  });

  it("should not move successfully (bishop move)", () => {
    expect(() =>
      makeMove(
        { ...emptyPosition, e5: { color: "white", piece: "rook" } },
        { from: "e5", to: "f6" }
      )
    ).toThrowError("invalid-vector");
  });
});
