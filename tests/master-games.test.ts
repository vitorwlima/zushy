import { describe, expect, it } from "bun:test";
import { initialPosition } from "../game/position";
import { getGameStatus } from "../game/state/game-status";
import { makeMove } from "../game/state/make-move";
import type { GameState, Move } from "../game/types";

const getFinalGameStateByMoves = (moves: Move[]): GameState => {
  const initialGameState: GameState = {
    position: initialPosition,
    moveHistory: [],
    positionAfterMoveHistory: [],
    threefoldRepetitionHistory: [],
  };

  return moves.reduce((state, move) => makeMove(state, move), initialGameState);
};

describe("master games", () => {
  it("should end in threefold repetition (Carlsen tactic repetition)", () => {
    const initialGameState: GameState = {
      position: initialPosition,
      moveHistory: [],
      positionAfterMoveHistory: [],
      threefoldRepetitionHistory: [],
    };

    // Moves encoded as { from, to } (castling = king move; en passant is handled by engine)
    const moves: Move[] = [
      // 1. d4 Nf6
      { from: "d2", to: "d4" },
      { from: "g8", to: "f6" },
      // 2. c4 g6
      { from: "c2", to: "c4" },
      { from: "g7", to: "g6" },
      // 3. f3 d6
      { from: "f2", to: "f3" },
      { from: "d7", to: "d6" },
      // 4. e4 e5
      { from: "e2", to: "e4" },
      { from: "e7", to: "e5" },
      // 5. d5 Nh5
      { from: "d4", to: "d5" },
      { from: "f6", to: "h5" },
      // 6. Be3 Bg7
      { from: "c1", to: "e3" },
      { from: "f8", to: "g7" },
      // 7. Nc3 O-O
      { from: "b1", to: "c3" },
      { from: "e8", to: "g8" },
      // 8. Qd2 f5
      { from: "d1", to: "d2" },
      { from: "f7", to: "f5" },
      // 9. O-O-O f4
      { from: "e1", to: "c1" },
      { from: "f5", to: "f4" },
      // 10. Bf2 Bf6
      { from: "e3", to: "f2" },
      { from: "g7", to: "f6" },
      // 11. Qe1 Nd7
      { from: "d2", to: "e1" },
      { from: "b8", to: "d7" },
      // 12. Kb1 Be7
      { from: "c1", to: "b1" },
      { from: "f6", to: "e7" },
      // 13. g3 c5
      { from: "g2", to: "g3" },
      { from: "c7", to: "c5" },
      // 14. dxc6 bxc6 (en passant capture)
      { from: "d5", to: "c6" },
      { from: "b7", to: "c6" },
      // 15. c5 dxc5
      { from: "c4", to: "c5" },
      { from: "d6", to: "c5" },
      // 16. Na4 Qc7
      { from: "c3", to: "a4" },
      { from: "d8", to: "c7" },
      // 17. Qc3 Rb8
      { from: "e1", to: "c3" },
      { from: "a8", to: "b8" },
      // 18. Bh3 Nb6
      { from: "f1", to: "h3" },
      { from: "d7", to: "b6" },
      // 19. Nxc5 Rf7
      { from: "a4", to: "c5" },
      { from: "f8", to: "f7" },
      // 20. b3 fxg3
      { from: "b2", to: "b3" },
      { from: "f4", to: "g3" },
      // 21. hxg3 Bxc5
      { from: "h2", to: "g3" },
      { from: "e7", to: "c5" },
      // 22. Qxc5 Ng7
      { from: "c3", to: "c5" },
      { from: "h5", to: "g7" },
      // 23. Rc1 Be6
      { from: "d1", to: "c1" },
      { from: "c8", to: "e6" },
      // 24. Qxc6 Qe7
      { from: "c5", to: "c6" },
      { from: "c7", to: "e7" },
      // 25. Qc5 Qf6
      { from: "c6", to: "c5" },
      { from: "e7", to: "f6" },
      // 26. Bg2 Rfb7
      { from: "h3", to: "g2" },
      { from: "f7", to: "b7" },
      // 27. Ka1 Nd7
      { from: "b1", to: "a1" },
      { from: "b6", to: "d7" },
      // 28. Qd6 Ne8
      { from: "c5", to: "d6" },
      { from: "g7", to: "e8" },
      // 29. Qa6 Bxb3
      { from: "d6", to: "a6" },
      { from: "e6", to: "b3" },
      // 30. Qxf6 Nexf6
      { from: "a6", to: "f6" },
      { from: "e8", to: "f6" },
      // 31. axb3 Rxb3
      { from: "a2", to: "b3" },
      { from: "b7", to: "b3" },
      // 32. Rc2 Rb1+
      { from: "c1", to: "c2" },
      { from: "b3", to: "b1" },
      // 33. Ka2 R1b4
      { from: "a1", to: "a2" },
      { from: "b1", to: "b4" },
      // 34. Ka1 Rb1+
      { from: "a2", to: "a1" },
      { from: "b4", to: "b1" },
      // 35. Ka2 R1b4
      { from: "a1", to: "a2" },
      { from: "b1", to: "b4" },
      // 36. Ka1 Rb1+ (third occurrence of this position => threefold repetition)
      { from: "a2", to: "a1" },
      { from: "b4", to: "b1" },
    ];

    const finalState = getFinalGameStateByMoves(moves);
    expect(getGameStatus(finalState)).toEqual("threefold-repetition");
  });

  it("should not end in threefold repetition (Carlsen vs Nakamura meme bongcloud - 1 less move)", () => {
    const moves: Move[] = [
      // 1. e4 e5
      { from: "e2", to: "e4" },
      { from: "e7", to: "e5" },
      // 2. Ke2 Ke7
      { from: "e1", to: "e2" },
      { from: "e8", to: "e7" },
      // 3. Ke1 Ke8
      { from: "e2", to: "e1" },
      { from: "e7", to: "e8" },
      // 4. Ke2 Ke7
      { from: "e1", to: "e2" },
      { from: "e8", to: "e7" },
      // 5. Ke1 Ke8
      { from: "e2", to: "e1" },
      { from: "e7", to: "e8" },
    ];

    const finalState = getFinalGameStateByMoves(moves);
    expect(getGameStatus(finalState)).toEqual("white-to-play");
  });

  it("should end in threefold repetition (Carlsen vs Nakamura meme bongcloud)", () => {
    const moves: Move[] = [
      // 1. e4 e5
      { from: "e2", to: "e4" },
      { from: "e7", to: "e5" },
      // 2. Ke2 Ke7
      { from: "e1", to: "e2" },
      { from: "e8", to: "e7" },
      // 3. Ke1 Ke8
      { from: "e2", to: "e1" },
      { from: "e7", to: "e8" },
      // 4. Ke2 Ke7
      { from: "e1", to: "e2" },
      { from: "e8", to: "e7" },
      // 5. Ke1 Ke8
      { from: "e2", to: "e1" },
      { from: "e7", to: "e8" },
      // 6. Ke2 Ke7
      { from: "e1", to: "e2" },
      { from: "e8", to: "e7" },
    ];

    const finalState = getFinalGameStateByMoves(moves);
    expect(getGameStatus(finalState)).toEqual("threefold-repetition");
  });
});
