import { describe, expect, it } from "bun:test";
import { initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/make-move";

describe("castle", () => {
  it("white should castle short-side successfully", () => {
    const gameState = {
      position: initialPosition,
      moveHistory: [],
    };

    const move1 = makeMove(gameState, { from: "e2", to: "e4" });
    const move2 = makeMove(move1, { from: "e7", to: "e5" });
    const move3 = makeMove(move2, { from: "g1", to: "f3" });
    const move4 = makeMove(move3, { from: "b8", to: "c6" });
    const move5 = makeMove(move4, { from: "f1", to: "c4" });
    const move6 = makeMove(move5, { from: "f8", to: "e7" });
    const castleMove = makeMove(move6, { from: "e1", to: "g1" });

    expect(castleMove.position.g1).toEqual({ color: "white", piece: "king" });
    expect(castleMove.position.f1).toEqual({ color: "white", piece: "rook" });
    expect(castleMove.position.e1).toBeNull();
    expect(castleMove.position.h1).toBeNull();
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
});
