import { describe, expect, it } from "bun:test";
import { emptyPosition, initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/make-move";
import { mockMove } from "../mockMove";

describe("pawn", () => {
  describe("white", () => {
    it("should move successfully", () => {
      const { position: newPosition } = makeMove(
        {
          position: initialPosition,
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "a2", to: "a3" }
      );

      expect(newPosition.a3).toEqual({ color: "white", piece: "pawn" });
      expect(newPosition.a2).toBeNull();
    });

    it("should move successfully", () => {
      const { position: newPosition } = makeMove(
        {
          position: initialPosition,
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "a2", to: "a4" }
      );

      expect(newPosition.a4).toEqual({ color: "white", piece: "pawn" });
      expect(newPosition.a2).toBeNull();
    });

    it("should move successfully", () => {
      const { position: pawnForwardPosition } = makeMove(
        {
          position: initialPosition,
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        {
          from: "a2",
          to: "a3",
        }
      );

      const { position: newPosition } = makeMove(
        {
          position: pawnForwardPosition,
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
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
        {
          position: initialPosition,
          moveHistory: [],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        {
          from: "a2",
          to: "a3",
        }
      );

      expect(() =>
        makeMove(
          {
            position: pawnForwardPosition,
            moveHistory: [],
            positionAfterMoveHistory: [],
            threefoldRepetitionHistory: [],
          },
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
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
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
        {
          position: initialPosition,
          moveHistory: [mockMove],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "e7", to: "e6" }
      );

      expect(newPosition.e6).toEqual({ color: "black", piece: "pawn" });
      expect(newPosition.e7).toBeNull();
    });

    it("should move successfully", () => {
      const { position: newPosition } = makeMove(
        {
          position: initialPosition,
          moveHistory: [mockMove],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "a7", to: "a5" }
      );

      expect(newPosition.a5).toEqual({ color: "black", piece: "pawn" });
      expect(newPosition.a7).toBeNull();
    });

    it("should move successfully", () => {
      const { position: pawnForwardPosition } = makeMove(
        {
          position: initialPosition,
          moveHistory: [mockMove],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        {
          from: "a7",
          to: "a6",
        }
      );

      const { position: newPosition } = makeMove(
        {
          position: pawnForwardPosition,
          moveHistory: [mockMove],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
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
        {
          position: initialPosition,
          moveHistory: [mockMove],
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        {
          from: "a7",
          to: "a6",
        }
      );

      expect(() =>
        makeMove(
          {
            position: pawnForwardPosition,
            moveHistory: [mockMove],
            positionAfterMoveHistory: [],
            threefoldRepetitionHistory: [],
          },
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
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
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
            positionAfterMoveHistory: [],
            threefoldRepetitionHistory: [],
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
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
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
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
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
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
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
          positionAfterMoveHistory: [],
          threefoldRepetitionHistory: [],
        },
        { from: "a7", to: "a8", promotion: "knight" }
      );

      expect(newPosition.a8).toEqual({ color: "white", piece: "knight" });
      expect(newPosition.a7).toBeNull();
    });
  });

  describe("en passant", () => {
    it("should capture black pawn successfully", () => {
      const gameState = {
        position: initialPosition,
        moveHistory: [],
        positionAfterMoveHistory: [],
        threefoldRepetitionHistory: [],
      };

      const move1 = makeMove(gameState, { from: "e2", to: "e4" });
      const move2 = makeMove(move1, { from: "a7", to: "a6" });
      const move3 = makeMove(move2, { from: "e4", to: "e5" });
      const move4 = makeMove(move3, { from: "d7", to: "d5" });
      const enPassantMove = makeMove(move4, { from: "e5", to: "d6" });

      expect(enPassantMove.position.d6).toEqual({
        color: "white",
        piece: "pawn",
      });
      expect(enPassantMove.position.d7).toBeNull();
      expect(enPassantMove.position.e5).toBeNull();
      expect(enPassantMove.position.d5).toBeNull();
    });

    it("should capture white pawn successfully (black en passant)", () => {
      const gameState = {
        position: initialPosition,
        moveHistory: [],
        positionAfterMoveHistory: [],
        threefoldRepetitionHistory: [],
      };

      const move1 = makeMove(gameState, { from: "a2", to: "a3" });
      const move2 = makeMove(move1, { from: "e7", to: "e5" });
      const move3 = makeMove(move2, { from: "a3", to: "a4" });
      const move4 = makeMove(move3, { from: "e5", to: "e4" });
      const move5 = makeMove(move4, { from: "d2", to: "d4" });
      const enPassantMove = makeMove(move5, { from: "e4", to: "d3" });

      expect(enPassantMove.position.d3).toEqual({
        color: "black",
        piece: "pawn",
      });
      expect(enPassantMove.position.e4).toBeNull();
      expect(enPassantMove.position.d4).toBeNull();
      expect(enPassantMove.position.d2).toBeNull();
    });

    it("should not capture en passant if the enemy pawn did not move two squares", () => {
      expect(() =>
        makeMove(
          {
            position: {
              ...emptyPosition,
              e1: { color: "white", piece: "king" },
              e8: { color: "black", piece: "king" },
              e5: { color: "white", piece: "pawn" },
              d5: { color: "black", piece: "pawn" },
            },
            moveHistory: [
              { from: "e2", to: "e4", notation: "e4" },
              { from: "d6", to: "d5", notation: "d5" },
            ],
            positionAfterMoveHistory: [],
            threefoldRepetitionHistory: [],
          },
          { from: "e5", to: "d6" }
        )
      ).toThrowError("invalid-vector");
    });

    it("should not capture en passant if the enemy pawn did not move in the last round", () => {
      const gameState = {
        position: initialPosition,
        moveHistory: [],
        positionAfterMoveHistory: [],
        threefoldRepetitionHistory: [],
      };

      const move1 = makeMove(gameState, { from: "e2", to: "e4" });
      const move2 = makeMove(move1, { from: "a7", to: "a6" });
      const move3 = makeMove(move2, { from: "e4", to: "e5" });
      const move4 = makeMove(move3, { from: "d7", to: "d5" });
      const move5 = makeMove(move4, { from: "h2", to: "h3" }); // skip en passant
      const move6 = makeMove(move5, { from: "a6", to: "a5" });

      expect(() => makeMove(move6, { from: "e5", to: "d6" })).toThrowError(
        "invalid-vector"
      );
    });

    it("should not capture en passant when the last moved piece was not a pawn", () => {
      expect(() =>
        makeMove(
          {
            position: {
              ...emptyPosition,
              e1: { color: "white", piece: "king" },
              e8: { color: "black", piece: "king" },
              e5: { color: "white", piece: "pawn" },
              d5: { color: "black", piece: "knight" },
            },
            moveHistory: [
              { from: "e2", to: "e4", notation: "e4" },
              { from: "f6", to: "d5", notation: "Nd5" },
            ],
            positionAfterMoveHistory: [],
            threefoldRepetitionHistory: [],
          },
          { from: "e5", to: "d6" }
        )
      ).toThrowError("invalid-vector");
    });

    it("should not capture en passant when the last moved piece was not a pawn (even if it moved 2 squares)", () => {
      expect(() =>
        makeMove(
          {
            position: {
              ...emptyPosition,
              e6: { color: "white", piece: "king" },
              e8: { color: "black", piece: "king" },
              e5: { color: "white", piece: "pawn" },
              d5: { color: "black", piece: "rook" },
            },
            moveHistory: [
              { from: "h2", to: "h3", notation: "h3" },
              { from: "d7", to: "d5", notation: "Rd5" },
            ],
            positionAfterMoveHistory: [],
            threefoldRepetitionHistory: [],
          },
          { from: "e5", to: "d6" }
        )
      ).toThrowError("invalid-vector");
    });

    it("should not allow en passant if it exposes own king to check (captured pawn removed)", () => {
      expect(() =>
        makeMove(
          {
            position: {
              ...emptyPosition,
              e6: { color: "white", piece: "king" },
              h8: { color: "black", piece: "king" },
              e5: { color: "white", piece: "pawn" },
              d5: { color: "black", piece: "pawn" },
              a2: { color: "black", piece: "bishop" },
            },
            moveHistory: [
              { from: "h2", to: "h3", notation: "h3" },
              { from: "d7", to: "d5", notation: "d5" },
            ],
            positionAfterMoveHistory: [],
            threefoldRepetitionHistory: [],
          },
          { from: "e5", to: "d6" }
        )
      ).toThrowError("in-check");
    });
  });
});
