import { describe, expect, it } from "bun:test";
import { emptyPosition, initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/moves";

describe("bishop", () => {
  it("should move successfully", () => {
    const newPosition = makeMove(
      { ...emptyPosition, c1: { color: "white", piece: "bishop" } },
      { from: "c1", to: "d2" }
    );

    expect(newPosition.d2).toEqual({ color: "white", piece: "bishop" });
    expect(newPosition.c1).toBeNull();
  });

  it("should capture successfully", () => {
    const newPosition = makeMove(
      {
        ...emptyPosition,
        c1: { color: "white", piece: "bishop" },
        f4: { color: "black", piece: "queen" },
      },
      { from: "c1", to: "f4" }
    );

    expect(newPosition.f4).toEqual({ color: "white", piece: "bishop" });
    expect(newPosition.c1).toBeNull();
  });

  it("should not move successfully (capturing self)", () => {
    expect(() =>
      makeMove(initialPosition, { from: "c1", to: "b2" })
    ).toThrowError("capturing-self");
  });

  it("should not move successfully (piece in the way)", () => {
    expect(() =>
      makeMove(initialPosition, { from: "c1", to: "a3" })
    ).toThrowError("piece-in-the-way");
  });

  it("should not move successfully (knight move)", () => {
    expect(() =>
      makeMove(
        { ...emptyPosition, e5: { color: "white", piece: "bishop" } },
        { from: "e5", to: "d3" }
      )
    ).toThrowError("invalid-vector");
  });

  it("should not move successfully (rook move)", () => {
    expect(() =>
      makeMove(
        { ...emptyPosition, e5: { color: "white", piece: "bishop" } },
        { from: "e5", to: "e1" }
      )
    ).toThrowError("invalid-vector");
  });
});
