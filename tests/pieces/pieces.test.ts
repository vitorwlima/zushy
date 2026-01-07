import { describe, expect, it } from "bun:test";
import { initialPosition } from "../../game/position";
import { makeMove } from "../../game/state/make-move";
import { getIsCheckmate } from "../../game/state/checkmate";

describe("pieces", () => {
  it("should not move inexistent piece", () => {
    expect(() =>
      makeMove(
        { position: initialPosition, moveHistory: [] },
        { from: "a3", to: "a4" }
      )
    ).toThrowError("no-piece-in-from-square");
  });

  it("should play out this game", () => {
    const gameState = {
      position: initialPosition,
      moveHistory: [],
    };

    const move1 = makeMove(gameState, { from: "e2", to: "e4" });
    expect(move1.position.e4).toEqual({ color: "white", piece: "pawn" });
    expect(move1.position.e2).toBeNull();

    const move2 = makeMove(move1, { from: "e7", to: "e5" });
    expect(move2.position.e5).toEqual({ color: "black", piece: "pawn" });
    expect(move2.position.e7).toBeNull();

    const move3 = makeMove(move2, { from: "d1", to: "h5" });
    expect(move3.position.h5).toEqual({ color: "white", piece: "queen" });
    expect(move3.position.d1).toBeNull();

    const move4 = makeMove(move3, { from: "a7", to: "a6" });
    expect(move4.position.a6).toEqual({ color: "black", piece: "pawn" });
    expect(move4.position.a7).toBeNull();

    const move5 = makeMove(move4, { from: "f1", to: "c4" });
    expect(move5.position.c4).toEqual({ color: "white", piece: "bishop" });
    expect(move5.position.f1).toBeNull();

    const move6 = makeMove(move5, { from: "b8", to: "c6" });
    expect(move6.position.c6).toEqual({ color: "black", piece: "knight" });
    expect(move6.position.b8).toBeNull();

    const move7 = makeMove(move6, { from: "h5", to: "f7" });
    expect(move7.position.f7).toEqual({ color: "white", piece: "queen" });
    expect(move7.position.h5).toBeNull();

    const checkmateResult = getIsCheckmate(move7);
    expect(checkmateResult).toEqual("white");
  });
});
