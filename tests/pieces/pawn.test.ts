import { describe, expect, it } from "bun:test";
import { emptyPosition, initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/make-move";
import { mockMove } from "../mockMove";

describe("pawn", () => {
  describe("white", () => {
    it("should move successfully", () => {
      const { position: newPosition } = makeMove(
        { position: initialPosition, moveHistory: [] },
        { from: "a2", to: "a3" }
      );

      expect(newPosition.a3).toEqual({ color: "white", piece: "pawn" });
      expect(newPosition.a2).toBeNull();
    });

    it("should move successfully", () => {
      const { position: newPosition } = makeMove(
        { position: initialPosition, moveHistory: [] },
        { from: "a2", to: "a4" }
      );

      expect(newPosition.a4).toEqual({ color: "white", piece: "pawn" });
      expect(newPosition.a2).toBeNull();
    });

    it("should move successfully", () => {
      const { position: pawnForwardPosition } = makeMove(
        { position: initialPosition, moveHistory: [] },
        {
          from: "a2",
          to: "a3",
        }
      );

      const { position: newPosition } = makeMove(
        { position: pawnForwardPosition, moveHistory: [] },
        {
          from: "a3",
          to: "a4",
        }
      );

      expect(newPosition.a4).toEqual({ color: "white", piece: "pawn" });
      expect(newPosition.a2).toBeNull();
    });

    it("should not move successfully (invalid vector)", () => {
      const { position: pawnForwardPosition } = makeMove(
        { position: initialPosition, moveHistory: [] },
        {
          from: "a2",
          to: "a3",
        }
      );

      expect(() =>
        makeMove(
          { position: pawnForwardPosition, moveHistory: [] },
          { from: "a3", to: "a5" }
        )
      ).toThrowError("invalid-vector");
    });

    it("should capture successfully", () => {
      const { position: newPosition } = makeMove(
        {
          position: {
            ...emptyPosition,
            c4: { color: "white", piece: "pawn" },
            h8: { color: "black", piece: "king" },
            h6: { color: "white", piece: "king" },
            d5: { color: "black", piece: "pawn" },
          },
          moveHistory: [],
        },
        { from: "c4", to: "d5" }
      );

      expect(newPosition.d5).toEqual({ color: "white", piece: "pawn" });
      expect(newPosition.c4).toBeNull();
    });
  });

  describe("black", () => {
    it("should move successfully", () => {
      const { position: newPosition } = makeMove(
        { position: initialPosition, moveHistory: [mockMove] },
        { from: "e7", to: "e6" }
      );

      expect(newPosition.e6).toEqual({ color: "black", piece: "pawn" });
      expect(newPosition.e7).toBeNull();
    });

    it("should move successfully", () => {
      const { position: newPosition } = makeMove(
        { position: initialPosition, moveHistory: [mockMove] },
        { from: "a7", to: "a5" }
      );

      expect(newPosition.a5).toEqual({ color: "black", piece: "pawn" });
      expect(newPosition.a7).toBeNull();
    });

    it("should move successfully", () => {
      const { position: pawnForwardPosition } = makeMove(
        { position: initialPosition, moveHistory: [mockMove] },
        {
          from: "a7",
          to: "a6",
        }
      );

      const { position: newPosition } = makeMove(
        { position: pawnForwardPosition, moveHistory: [mockMove] },
        {
          from: "a6",
          to: "a5",
        }
      );

      expect(newPosition.a5).toEqual({ color: "black", piece: "pawn" });
      expect(newPosition.a6).toBeNull();
      expect(newPosition.a7).toBeNull();
    });

    it("should not move successfully (invalid vector)", () => {
      const { position: pawnForwardPosition } = makeMove(
        { position: initialPosition, moveHistory: [mockMove] },
        {
          from: "a7",
          to: "a6",
        }
      );

      expect(() =>
        makeMove(
          { position: pawnForwardPosition, moveHistory: [mockMove] },
          { from: "a6", to: "a4" }
        )
      ).toThrowError("invalid-vector");
    });

    it("should capture successfully", () => {
      const { position: newPosition } = makeMove(
        {
          position: {
            ...emptyPosition,
            c4: { color: "white", piece: "pawn" },
            h8: { color: "black", piece: "king" },
            h6: { color: "white", piece: "king" },
            d5: { color: "black", piece: "pawn" },
          },
          moveHistory: [mockMove],
        },
        { from: "d5", to: "c4" }
      );

      expect(newPosition.d5).toBeNull();
      expect(newPosition.c4).toEqual({ color: "black", piece: "pawn" });
    });
  });

  describe("promotion", () => {
    it("should throw error if promotion is not provided", () => {
      expect(() =>
        makeMove(
          {
            position: {
              ...emptyPosition,
              e1: { color: "white", piece: "king" },
              e8: { color: "black", piece: "king" },
              a7: { color: "white", piece: "pawn" },
            },
            moveHistory: [],
          },
          { from: "a7", to: "a8" }
        )
      ).toThrowError("invalid-promotion");
    });

    it("should promote successfully to a queen", () => {
      const { position: newPosition } = makeMove(
        {
          position: {
            ...emptyPosition,
            e1: { color: "white", piece: "king" },
            e8: { color: "black", piece: "king" },
            a7: { color: "white", piece: "pawn" },
          },
          moveHistory: [],
        },
        { from: "a7", to: "a8", promotion: "queen" }
      );

      expect(newPosition.a8).toEqual({ color: "white", piece: "queen" });
      expect(newPosition.a7).toBeNull();
    });

    it("should promote successfully to a rook", () => {
      const { position: newPosition } = makeMove(
        {
          position: {
            ...emptyPosition,
            e1: { color: "white", piece: "king" },
            e8: { color: "black", piece: "king" },
            a7: { color: "white", piece: "pawn" },
          },
          moveHistory: [],
        },
        { from: "a7", to: "a8", promotion: "rook" }
      );

      expect(newPosition.a8).toEqual({ color: "white", piece: "rook" });
      expect(newPosition.a7).toBeNull();
    });

    it("should promote successfully to a bishop", () => {
      const { position: newPosition } = makeMove(
        {
          position: {
            ...emptyPosition,
            e1: { color: "white", piece: "king" },
            e8: { color: "black", piece: "king" },
            a7: { color: "white", piece: "pawn" },
          },
          moveHistory: [],
        },
        { from: "a7", to: "a8", promotion: "bishop" }
      );

      expect(newPosition.a8).toEqual({ color: "white", piece: "bishop" });
      expect(newPosition.a7).toBeNull();
    });

    it("should promote successfully to a knight", () => {
      const { position: newPosition } = makeMove(
        {
          position: {
            ...emptyPosition,
            e1: { color: "white", piece: "king" },
            e8: { color: "black", piece: "king" },
            a7: { color: "white", piece: "pawn" },
          },
          moveHistory: [],
        },
        { from: "a7", to: "a8", promotion: "knight" }
      );

      expect(newPosition.a8).toEqual({ color: "white", piece: "knight" });
      expect(newPosition.a7).toBeNull();
    });
  });
});
