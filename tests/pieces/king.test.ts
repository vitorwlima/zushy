import { describe, expect, it } from "bun:test";
import { emptyPosition, initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/make-move";

describe("king", () => {
  it("should move successfully", () => {
    const { position: newPosition } = makeMove(
      {
        position: {
          ...emptyPosition,
          h6: { color: "white", piece: "king" },
          h8: { color: "black", piece: "king" },
        },
        moveHistory: [],
        positionAfterMoveHistory: [],
        threefoldRepetitionHistory: [],
      },
      { from: "h6", to: "h5" }
    );

    expect(newPosition.h5).toEqual({ color: "white", piece: "king" });
    expect(newPosition.h6).toBeNull();
  });

  it("should capture successfully", () => {
    const { position: newPosition } = makeMove(
      {
        position: {
          ...emptyPosition,
          e8: { color: "black", piece: "king" },
          e1: { color: "white", piece: "king" },
          e2: { color: "black", piece: "rook" },
        },
        moveHistory: [],
        positionAfterMoveHistory: [],
        threefoldRepetitionHistory: [],
      },
      { from: "e1", to: "e2" }
    );

    expect(newPosition.e2).toEqual({ color: "white", piece: "king" });
    expect(newPosition.e1).toBeNull();
  });

  it("should not move successfully (capturing self)", () => {
    expect(() =>
      makeMove(
        {
          position: initialPosition,
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "e1", to: "e1" }
      )
    ).toThrowError("capturing-self");
  });

  it("should not move successfully (knight move)", () => {
    expect(() =>
      makeMove(
        {
          position: {
            ...emptyPosition,
            h8: { color: "black", piece: "king" },
            h6: { color: "white", piece: "king" },
          },
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "h6", to: "f5" }
      )
    ).toThrowError("invalid-vector");
  });

  it("should not move successfully (rook move)", () => {
    expect(() =>
      makeMove(
        {
          position: {
            ...emptyPosition,
            e1: { color: "white", piece: "king" },
            e8: { color: "black", piece: "king" },
          },
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "e1", to: "h1" }
      )
    ).toThrowError("invalid-vector");
  });
});
