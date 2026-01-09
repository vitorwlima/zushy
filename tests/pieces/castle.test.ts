import { describe, expect, it } from "bun:test";
import { initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/make-move";

describe("castle", () => {
  it("both sides should castle short-side successfully", () => {
    const gameState = {
      position: initialPosition,
      moveHistory: [],
    };

    const move1 = makeMove(gameState, { from: "e2", to: "e4" });
    const move2 = makeMove(move1, { from: "e7", to: "e5" });
    const move3 = makeMove(move2, { from: "g1", to: "f3" });
    const move4 = makeMove(move3, { from: "g8", to: "f6" });
    const move5 = makeMove(move4, { from: "f1", to: "c4" });
    const move6 = makeMove(move5, { from: "f8", to: "e7" });
    const whiteCastleMove = makeMove(move6, { from: "e1", to: "g1" });
    const blackCastleMove = makeMove(whiteCastleMove, { from: "e8", to: "g8" });

    expect(whiteCastleMove.position.g1).toEqual({
      color: "white",
      piece: "king",
    });
    expect(whiteCastleMove.position.f1).toEqual({
      color: "white",
      piece: "rook",
    });
    expect(whiteCastleMove.position.e1).toBeNull();
    expect(whiteCastleMove.position.h1).toBeNull();

    expect(blackCastleMove.position.g8).toEqual({
      color: "black",
      piece: "king",
    });
    expect(blackCastleMove.position.f8).toEqual({
      color: "black",
      piece: "rook",
    });
    expect(blackCastleMove.position.e8).toBeNull();
    expect(blackCastleMove.position.h8).toBeNull();
  });

  it("both sides should castle long-side successfully", () => {
    const gameState = {
      position: initialPosition,
      moveHistory: [],
    };

    const move1 = makeMove(gameState, { from: "d2", to: "d4" });
    const move2 = makeMove(move1, { from: "d7", to: "d5" });
    const move3 = makeMove(move2, { from: "c1", to: "f4" });
    const move4 = makeMove(move3, { from: "c8", to: "f5" });
    const move5 = makeMove(move4, { from: "b1", to: "c3" });
    const move6 = makeMove(move5, { from: "b8", to: "c6" });
    const move7 = makeMove(move6, { from: "d1", to: "d2" });
    const move8 = makeMove(move7, { from: "d8", to: "d7" });
    const whiteCastleMove = makeMove(move8, { from: "e1", to: "c1" });
    const blackCastleMove = makeMove(whiteCastleMove, { from: "e8", to: "c8" });

    expect(whiteCastleMove.position.c1).toEqual({
      color: "white",
      piece: "king",
    });
    expect(whiteCastleMove.position.d1).toEqual({
      color: "white",
      piece: "rook",
    });
    expect(whiteCastleMove.position.e1).toBeNull();
    expect(whiteCastleMove.position.a1).toBeNull();

    expect(blackCastleMove.position.c8).toEqual({
      color: "black",
      piece: "king",
    });
    expect(blackCastleMove.position.d8).toEqual({
      color: "black",
      piece: "rook",
    });
    expect(blackCastleMove.position.e8).toBeNull();
    expect(blackCastleMove.position.a8).toBeNull();
  });

  it("white should not castle short-side through check", () => {
    const gameState = {
      position: initialPosition,
      moveHistory: [],
    };

    const move1 = makeMove(gameState, { from: "e2", to: "e4" });
    const move2 = makeMove(move1, { from: "e7", to: "e5" });
    const move3 = makeMove(move2, { from: "g1", to: "f3" });
    const move4 = makeMove(move3, { from: "b8", to: "c6" });
    const move5 = makeMove(move4, { from: "a2", to: "a3" });
    const move6 = makeMove(move5, { from: "b7", to: "b6" });
    const move7 = makeMove(move6, { from: "f1", to: "a6" });
    const move8 = makeMove(move7, { from: "c8", to: "a6" });
    expect(() => makeMove(move8, { from: "e1", to: "g1" })).toThrowError(
      "invalid-castling"
    );
  });

  it("white should not castle short-side through piece", () => {
    const gameState = {
      position: initialPosition,
      moveHistory: [],
    };

    const move1 = makeMove(gameState, { from: "e2", to: "e4" });
    const move2 = makeMove(move1, { from: "e7", to: "e5" });
    const move3 = makeMove(move2, { from: "g1", to: "f3" });
    const move4 = makeMove(move3, { from: "b8", to: "c6" });
    expect(() => makeMove(move4, { from: "e1", to: "g1" })).toThrowError(
      "invalid-castling"
    );
  });

  it("white should not castle long-side through piece", () => {
    const gameState = {
      position: initialPosition,
      moveHistory: [],
    };

    const move1 = makeMove(gameState, { from: "e2", to: "e4" });
    const move2 = makeMove(move1, { from: "e7", to: "e5" });
    const move3 = makeMove(move2, { from: "d2", to: "d3" });
    const move4 = makeMove(move3, { from: "b8", to: "c6" });
    const move5 = makeMove(move4, { from: "d1", to: "e2" });
    const move6 = makeMove(move5, { from: "f8", to: "e7" });
    const move7 = makeMove(move6, { from: "c1", to: "d2" });
    const move8 = makeMove(move7, { from: "a7", to: "a6" });
    expect(() => makeMove(move8, { from: "e1", to: "c1" })).toThrowError(
      "invalid-castling"
    );
  });
});
