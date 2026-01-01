import { describe, expect, it } from "bun:test";
import { emptyPosition, initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/moves";

describe("pawn", () => {
  describe("white", () => {
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

      const newPosition = makeMove(pawnForwardPosition, {
        from: "a3",
        to: "a4",
      });

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

    it("should capture successfully", () => {
      const newPosition = makeMove(
        {
          ...emptyPosition,
          c4: { color: "white", piece: "pawn" },
          d5: { color: "black", piece: "pawn" },
        },
        { from: "c4", to: "d5" }
      );

      expect(newPosition.d5).toEqual({ color: "white", piece: "pawn" });
      expect(newPosition.c4).toBeNull();
    });
  });

  describe("black", () => {
    it("should move successfully", () => {
      const newPosition = makeMove(initialPosition, { from: "e7", to: "e6" });

      expect(newPosition.e6).toEqual({ color: "black", piece: "pawn" });
      expect(newPosition.e7).toBeNull();
    });

    it("should move successfully", () => {
      const newPosition = makeMove(initialPosition, { from: "a7", to: "a5" });

      expect(newPosition.a5).toEqual({ color: "black", piece: "pawn" });
      expect(newPosition.a7).toBeNull();
    });

    it("should move successfully", () => {
      const pawnForwardPosition = makeMove(initialPosition, {
        from: "a7",
        to: "a6",
      });

      const newPosition = makeMove(pawnForwardPosition, {
        from: "a6",
        to: "a5",
      });

      expect(newPosition.a5).toEqual({ color: "black", piece: "pawn" });
      expect(newPosition.a6).toBeNull();
      expect(newPosition.a7).toBeNull();
    });

    it("should not move successfully (invalid vector)", () => {
      const pawnForwardPosition = makeMove(initialPosition, {
        from: "a7",
        to: "a6",
      });

      expect(() =>
        makeMove(pawnForwardPosition, { from: "a6", to: "a4" })
      ).toThrowError("invalid-vector");
    });

    it("should capture successfully", () => {
      const newPosition = makeMove(
        {
          ...emptyPosition,
          c4: { color: "white", piece: "pawn" },
          d5: { color: "black", piece: "pawn" },
        },
        { from: "d5", to: "c4" }
      );

      expect(newPosition.d5).toBeNull();
      expect(newPosition.c4).toEqual({ color: "black", piece: "pawn" });
    });
  });
});
