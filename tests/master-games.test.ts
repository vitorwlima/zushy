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

  // Karpov vs Kasparov, Interpolis 15th, Tilburg 1991
  // https://www.chess.com/terms/50-move-rule-chess#what
  // The last pawn move/capture is 50. Bxd5, after which 64 moves are played without
  // any pawn move or capture, triggering the fifty-move rule draw.
  //
  // NOTE: This test is currently skipped due to an engine bug: moves like e1-c1 (rook)
  // are incorrectly interpreted as castling attempts because the engine checks coordinates
  // before checking the piece type. Move 76 (Rc1 from e1 to c1) triggers this bug.
  // TODO: Fix valid-move.ts to check if the piece is a king before treating a move as castling.
  it("should end in fifty-move rule draw (Karpov vs Kasparov, Tilburg 1991)", () => {
    const moves: Move[] = [
      // 1. d4 Nf6
      { from: "d2", to: "d4" },
      { from: "g8", to: "f6" },
      // 2. c4 g6
      { from: "c2", to: "c4" },
      { from: "g7", to: "g6" },
      // 3. Nc3 Bg7
      { from: "b1", to: "c3" },
      { from: "f8", to: "g7" },
      // 4. e4 d6
      { from: "e2", to: "e4" },
      { from: "d7", to: "d6" },
      // 5. Nf3 O-O
      { from: "g1", to: "f3" },
      { from: "e8", to: "g8" },
      // 6. Be2 e5
      { from: "f1", to: "e2" },
      { from: "e7", to: "e5" },
      // 7. O-O Nc6
      { from: "e1", to: "g1" },
      { from: "b8", to: "c6" },
      // 8. d5 Ne7
      { from: "d4", to: "d5" },
      { from: "c6", to: "e7" },
      // 9. Nd2 a5
      { from: "f3", to: "d2" },
      { from: "a7", to: "a5" },
      // 10. Rb1 Nd7
      { from: "a1", to: "b1" },
      { from: "f6", to: "d7" },
      // 11. a3 f5
      { from: "a2", to: "a3" },
      { from: "f7", to: "f5" },
      // 12. b4 Kh8
      { from: "b2", to: "b4" },
      { from: "g8", to: "h8" },
      // 13. f3 Ng8
      { from: "f2", to: "f3" },
      { from: "e7", to: "g8" },
      // 14. Qc2 Ngf6
      { from: "d1", to: "c2" },
      { from: "g8", to: "f6" },
      // 15. Nb5 axb4
      { from: "c3", to: "b5" },
      { from: "a5", to: "b4" },
      // 16. axb4 Nh5
      { from: "a3", to: "b4" },
      { from: "f6", to: "h5" },
      // 17. g3 Ndf6
      { from: "g2", to: "g3" },
      { from: "d7", to: "f6" },
      // 18. c5 Bd7
      { from: "c4", to: "c5" },
      { from: "c8", to: "d7" },
      // 19. Rb3 Nxg3
      { from: "b1", to: "b3" },
      { from: "h5", to: "g3" },
      // 20. hxg3 Nh5
      { from: "h2", to: "g3" },
      { from: "f6", to: "h5" },
      // 21. f4 exf4
      { from: "f3", to: "f4" },
      { from: "e5", to: "f4" },
      // 22. c6 bxc6
      { from: "c5", to: "c6" },
      { from: "b7", to: "c6" },
      // 23. dxc6 Nxg3
      { from: "d5", to: "c6" },
      { from: "h5", to: "g3" },
      // 24. Rxg3 fxg3
      { from: "b3", to: "g3" },
      { from: "f4", to: "g3" },
      // 25. cxd7 g2
      { from: "c6", to: "d7" },
      { from: "g3", to: "g2" },
      // 26. Rf3 Qxd7
      { from: "f1", to: "f3" },
      { from: "d8", to: "d7" },
      // 27. Bb2 fxe4
      { from: "c1", to: "b2" },
      { from: "f5", to: "e4" },
      // 28. Rxf8+ Rxf8
      { from: "f3", to: "f8" },
      { from: "a8", to: "f8" },
      // 29. Bxg7+ Qxg7
      { from: "b2", to: "g7" },
      { from: "d7", to: "g7" },
      // 30. Qxe4 Qf6
      { from: "c2", to: "e4" },
      { from: "g7", to: "f6" },
      // 31. Nf3 Qf4
      { from: "d2", to: "f3" },
      { from: "f6", to: "f4" },
      // 32. Qe7 Rf7
      { from: "e4", to: "e7" },
      { from: "f8", to: "f7" },
      // 33. Qe6 Rf6
      { from: "e7", to: "e6" },
      { from: "f7", to: "f6" },
      // 34. Qe8+ Rf8
      { from: "e6", to: "e8" },
      { from: "f6", to: "f8" },
      // 35. Qe7 Rf7
      { from: "e8", to: "e7" },
      { from: "f8", to: "f7" },
      // 36. Qe6 Rf6
      { from: "e7", to: "e6" },
      { from: "f7", to: "f6" },
      // 37. Qb3 g5
      { from: "e6", to: "b3" },
      { from: "g6", to: "g5" },
      // 38. Nxc7 g4
      { from: "b5", to: "c7" },
      { from: "g5", to: "g4" },
      // 39. Nd5 Qc1+
      { from: "c7", to: "d5" },
      { from: "f4", to: "c1" },
      // 40. Qd1 Qxd1+
      { from: "b3", to: "d1" },
      { from: "c1", to: "d1" },
      // 41. Bxd1 Rf5
      { from: "e2", to: "d1" },
      { from: "f6", to: "f5" },
      // 42. Ne3 Rf4
      { from: "d5", to: "e3" },
      { from: "f5", to: "f4" },
      // 43. Ne1 Rxb4
      { from: "f3", to: "e1" },
      { from: "f4", to: "b4" },
      // 44. Bxg4 h5
      { from: "d1", to: "g4" },
      { from: "h7", to: "h5" },
      // 45. Bf3 d5
      { from: "g4", to: "f3" },
      { from: "d6", to: "d5" },
      // 46. N3xg2 h4
      { from: "e3", to: "g2" },
      { from: "h5", to: "h4" },
      // 47. Nd3 Ra4
      { from: "e1", to: "d3" },
      { from: "b4", to: "a4" },
      // 48. Ngf4 Kg7
      { from: "g2", to: "f4" },
      { from: "h8", to: "g7" },
      // 49. Kg2 Kf6
      { from: "g1", to: "g2" },
      { from: "g7", to: "f6" },
      // 50. Bxd5 Ra5 (last pawn capture - fifty-move clock resets here)
      { from: "f3", to: "d5" },
      { from: "a4", to: "a5" },
      // 51. Bc6 Ra6
      { from: "d5", to: "c6" },
      { from: "a5", to: "a6" },
      // 52. Bb7 Ra3
      { from: "c6", to: "b7" },
      { from: "a6", to: "a3" },
      // 53. Be4 Ra4
      { from: "b7", to: "e4" },
      { from: "a3", to: "a4" },
      // 54. Bd5 Ra5
      { from: "e4", to: "d5" },
      { from: "a4", to: "a5" },
      // 55. Bc6 Ra6
      { from: "d5", to: "c6" },
      { from: "a5", to: "a6" },
      // 56. Bf3 Kg5
      { from: "c6", to: "f3" },
      { from: "f6", to: "g5" },
      // 57. Bb7 Ra1
      { from: "f3", to: "b7" },
      { from: "a6", to: "a1" },
      // 58. Bc8 Ra4
      { from: "b7", to: "c8" },
      { from: "a1", to: "a4" },
      // 59. Kf3 Rc4
      { from: "g2", to: "f3" },
      { from: "a4", to: "c4" },
      // 60. Bd7 Kf6
      { from: "c8", to: "d7" },
      { from: "g5", to: "f6" },
      // 61. Kg4 Rd4
      { from: "f3", to: "g4" },
      { from: "c4", to: "d4" },
      // 62. Bc6 Rd8
      { from: "d7", to: "c6" },
      { from: "d4", to: "d8" },
      // 63. Kxh4 Rg8
      { from: "g4", to: "h4" },
      { from: "d8", to: "g8" },
      // 64. Be4 Rg1
      { from: "c6", to: "e4" },
      { from: "g8", to: "g1" },
      // 65. Nh5+ Ke6
      { from: "f4", to: "h5" },
      { from: "f6", to: "e6" },
      // 66. Ng3 Kf6
      { from: "h5", to: "g3" },
      { from: "e6", to: "f6" },
      // 67. Kg4 Ra1
      { from: "h4", to: "g4" },
      { from: "g1", to: "a1" },
      // 68. Bd5 Ra5
      { from: "e4", to: "d5" },
      { from: "a1", to: "a5" },
      // 69. Bf3 Ra1
      { from: "d5", to: "f3" },
      { from: "a5", to: "a1" },
      // 70. Kf4 Ke6
      { from: "g4", to: "f4" },
      { from: "f6", to: "e6" },
      // 71. Nc5+ Kd6
      { from: "d3", to: "c5" },
      { from: "e6", to: "d6" },
      // 72. Nge4+ Ke7
      { from: "g3", to: "e4" },
      { from: "d6", to: "e7" },
      // 73. Ke5 Rf1
      { from: "f4", to: "e5" },
      { from: "a1", to: "f1" },
      // 74. Bg4 Rg1
      { from: "f3", to: "g4" },
      { from: "f1", to: "g1" },
      // 75. Be6 Re1
      { from: "g4", to: "e6" },
      { from: "g1", to: "e1" },
      // 76. Bc8 Rc1
      { from: "e6", to: "c8" },
      { from: "e1", to: "c1" },
      // 77. Kd4 Rd1+
      { from: "e5", to: "d4" },
      { from: "c1", to: "d1" },
      // 78. Nd3 Kf7
      { from: "c5", to: "d3" },
      { from: "e7", to: "f7" },
      // 79. Ke3 Ra1
      { from: "d4", to: "e3" },
      { from: "d1", to: "a1" },
      // 80. Kf4 Ke7
      { from: "e3", to: "f4" },
      { from: "f7", to: "e7" },
      // 81. Nb4 Rc1
      { from: "d3", to: "b4" },
      { from: "a1", to: "c1" },
      // 82. Nd5+ Kf7
      { from: "b4", to: "d5" },
      { from: "e7", to: "f7" },
      // 83. Bd7 Rf1+
      { from: "c8", to: "d7" },
      { from: "c1", to: "f1" },
      // 84. Ke5 Ra1
      { from: "f4", to: "e5" },
      { from: "f1", to: "a1" },
      // 85. Ng5+ Kg6
      { from: "e4", to: "g5" },
      { from: "f7", to: "g6" },
      // 86. Nf3 Kg7
      { from: "g5", to: "f3" },
      { from: "g6", to: "g7" },
      // 87. Bg4 Kg6
      { from: "d7", to: "g4" },
      { from: "g7", to: "g6" },
      // 88. Nf4+ Kg7
      { from: "d5", to: "f4" },
      { from: "g6", to: "g7" },
      // 89. Nd4 Re1+
      { from: "f3", to: "d4" },
      { from: "a1", to: "e1" },
      // 90. Kf5 Rc1
      { from: "e5", to: "f5" },
      { from: "e1", to: "c1" },
      // 91. Be2 Re1
      { from: "g4", to: "e2" },
      { from: "c1", to: "e1" },
      // 92. Bh5 Ra1
      { from: "e2", to: "h5" },
      { from: "e1", to: "a1" },
      // 93. Nfe6+ Kh6
      { from: "f4", to: "e6" },
      { from: "g7", to: "h6" },
      // 94. Be8 Ra8
      { from: "h5", to: "e8" },
      { from: "a1", to: "a8" },
      // 95. Bc6 Ra1
      { from: "e8", to: "c6" },
      { from: "a8", to: "a1" },
      // 96. Kf6 Kh7
      { from: "f5", to: "f6" },
      { from: "h6", to: "h7" },
      // 97. Ng5+ Kh8
      { from: "e6", to: "g5" },
      { from: "h7", to: "h8" },
      // 98. Nde6 Ra6
      { from: "d4", to: "e6" },
      { from: "a1", to: "a6" },
      // 99. Be8 Ra8
      { from: "c6", to: "e8" },
      { from: "a6", to: "a8" },
      // 100. Bh5 Ra1 (100th half-move since last pawn move/capture)
      { from: "e8", to: "h5" },
      { from: "a8", to: "a1" },
      // 101. Bg6 Rf1+
      { from: "h5", to: "g6" },
      { from: "a1", to: "f1" },
      // 102. Ke7 Ra1
      { from: "f6", to: "e7" },
      { from: "f1", to: "a1" },
      // 103. Nf7+ Kg8
      { from: "g5", to: "f7" },
      { from: "h8", to: "g8" },
      // 104. Nh6+ Kh8
      { from: "f7", to: "h6" },
      { from: "g8", to: "h8" },
      // 105. Nf5 Ra7+
      { from: "h6", to: "f5" },
      { from: "a1", to: "a7" },
      // 106. Kf6 Ra1
      { from: "e7", to: "f6" },
      { from: "a7", to: "a1" },
      // 107. Ne3 Re1
      { from: "f5", to: "e3" },
      { from: "a1", to: "e1" },
      // 108. Nd5 Rg1
      { from: "e3", to: "d5" },
      { from: "e1", to: "g1" },
      // 109. Bf5 Rf1
      { from: "g6", to: "f5" },
      { from: "g1", to: "f1" },
      // // 110. Ndf4 Ra1
      { from: "d5", to: "f4" },
      { from: "f1", to: "a1" },
      // // 111. Ng6+ Kg8
      { from: "f4", to: "g6" },
      { from: "h8", to: "g8" },
      // // 112. Ne7+ Kh8
      { from: "g6", to: "e7" },
      { from: "g8", to: "h8" },
      // // 113. Ng5 Ra6+
      { from: "e6", to: "g5" },
      { from: "a1", to: "a6" },
      // // 114. Kf7 Rf6+ (draw by fifty-move rule)
      { from: "f6", to: "f7" },
      { from: "a6", to: "f6" },
    ];

    const finalState = getFinalGameStateByMoves(moves);
    // Not implemented yet: this assertion should fail until the fifty-move rule is added.
    expect(getGameStatus(finalState)).toEqual("fifty-move-rule");
  });

  it("should not end in fifty-move rule draw (Karpov vs Kasparov, Tilburg 1991 - 1 move left)", () => {
    const moves: Move[] = [
      // 1. d4 Nf6
      { from: "d2", to: "d4" },
      { from: "g8", to: "f6" },
      // 2. c4 g6
      { from: "c2", to: "c4" },
      { from: "g7", to: "g6" },
      // 3. Nc3 Bg7
      { from: "b1", to: "c3" },
      { from: "f8", to: "g7" },
      // 4. e4 d6
      { from: "e2", to: "e4" },
      { from: "d7", to: "d6" },
      // 5. Nf3 O-O
      { from: "g1", to: "f3" },
      { from: "e8", to: "g8" },
      // 6. Be2 e5
      { from: "f1", to: "e2" },
      { from: "e7", to: "e5" },
      // 7. O-O Nc6
      { from: "e1", to: "g1" },
      { from: "b8", to: "c6" },
      // 8. d5 Ne7
      { from: "d4", to: "d5" },
      { from: "c6", to: "e7" },
      // 9. Nd2 a5
      { from: "f3", to: "d2" },
      { from: "a7", to: "a5" },
      // 10. Rb1 Nd7
      { from: "a1", to: "b1" },
      { from: "f6", to: "d7" },
      // 11. a3 f5
      { from: "a2", to: "a3" },
      { from: "f7", to: "f5" },
      // 12. b4 Kh8
      { from: "b2", to: "b4" },
      { from: "g8", to: "h8" },
      // 13. f3 Ng8
      { from: "f2", to: "f3" },
      { from: "e7", to: "g8" },
      // 14. Qc2 Ngf6
      { from: "d1", to: "c2" },
      { from: "g8", to: "f6" },
      // 15. Nb5 axb4
      { from: "c3", to: "b5" },
      { from: "a5", to: "b4" },
      // 16. axb4 Nh5
      { from: "a3", to: "b4" },
      { from: "f6", to: "h5" },
      // 17. g3 Ndf6
      { from: "g2", to: "g3" },
      { from: "d7", to: "f6" },
      // 18. c5 Bd7
      { from: "c4", to: "c5" },
      { from: "c8", to: "d7" },
      // 19. Rb3 Nxg3
      { from: "b1", to: "b3" },
      { from: "h5", to: "g3" },
      // 20. hxg3 Nh5
      { from: "h2", to: "g3" },
      { from: "f6", to: "h5" },
      // 21. f4 exf4
      { from: "f3", to: "f4" },
      { from: "e5", to: "f4" },
      // 22. c6 bxc6
      { from: "c5", to: "c6" },
      { from: "b7", to: "c6" },
      // 23. dxc6 Nxg3
      { from: "d5", to: "c6" },
      { from: "h5", to: "g3" },
      // 24. Rxg3 fxg3
      { from: "b3", to: "g3" },
      { from: "f4", to: "g3" },
      // 25. cxd7 g2
      { from: "c6", to: "d7" },
      { from: "g3", to: "g2" },
      // 26. Rf3 Qxd7
      { from: "f1", to: "f3" },
      { from: "d8", to: "d7" },
      // 27. Bb2 fxe4
      { from: "c1", to: "b2" },
      { from: "f5", to: "e4" },
      // 28. Rxf8+ Rxf8
      { from: "f3", to: "f8" },
      { from: "a8", to: "f8" },
      // 29. Bxg7+ Qxg7
      { from: "b2", to: "g7" },
      { from: "d7", to: "g7" },
      // 30. Qxe4 Qf6
      { from: "c2", to: "e4" },
      { from: "g7", to: "f6" },
      // 31. Nf3 Qf4
      { from: "d2", to: "f3" },
      { from: "f6", to: "f4" },
      // 32. Qe7 Rf7
      { from: "e4", to: "e7" },
      { from: "f8", to: "f7" },
      // 33. Qe6 Rf6
      { from: "e7", to: "e6" },
      { from: "f7", to: "f6" },
      // 34. Qe8+ Rf8
      { from: "e6", to: "e8" },
      { from: "f6", to: "f8" },
      // 35. Qe7 Rf7
      { from: "e8", to: "e7" },
      { from: "f8", to: "f7" },
      // 36. Qe6 Rf6
      { from: "e7", to: "e6" },
      { from: "f7", to: "f6" },
      // 37. Qb3 g5
      { from: "e6", to: "b3" },
      { from: "g6", to: "g5" },
      // 38. Nxc7 g4
      { from: "b5", to: "c7" },
      { from: "g5", to: "g4" },
      // 39. Nd5 Qc1+
      { from: "c7", to: "d5" },
      { from: "f4", to: "c1" },
      // 40. Qd1 Qxd1+
      { from: "b3", to: "d1" },
      { from: "c1", to: "d1" },
      // 41. Bxd1 Rf5
      { from: "e2", to: "d1" },
      { from: "f6", to: "f5" },
      // 42. Ne3 Rf4
      { from: "d5", to: "e3" },
      { from: "f5", to: "f4" },
      // 43. Ne1 Rxb4
      { from: "f3", to: "e1" },
      { from: "f4", to: "b4" },
      // 44. Bxg4 h5
      { from: "d1", to: "g4" },
      { from: "h7", to: "h5" },
      // 45. Bf3 d5
      { from: "g4", to: "f3" },
      { from: "d6", to: "d5" },
      // 46. N3xg2 h4
      { from: "e3", to: "g2" },
      { from: "h5", to: "h4" },
      // 47. Nd3 Ra4
      { from: "e1", to: "d3" },
      { from: "b4", to: "a4" },
      // 48. Ngf4 Kg7
      { from: "g2", to: "f4" },
      { from: "h8", to: "g7" },
      // 49. Kg2 Kf6
      { from: "g1", to: "g2" },
      { from: "g7", to: "f6" },
      // 50. Bxd5 Ra5 (last pawn capture - fifty-move clock resets here)
      { from: "f3", to: "d5" },
      { from: "a4", to: "a5" },
      // 51. Bc6 Ra6
      { from: "d5", to: "c6" },
      { from: "a5", to: "a6" },
      // 52. Bb7 Ra3
      { from: "c6", to: "b7" },
      { from: "a6", to: "a3" },
      // 53. Be4 Ra4
      { from: "b7", to: "e4" },
      { from: "a3", to: "a4" },
      // 54. Bd5 Ra5
      { from: "e4", to: "d5" },
      { from: "a4", to: "a5" },
      // 55. Bc6 Ra6
      { from: "d5", to: "c6" },
      { from: "a5", to: "a6" },
      // 56. Bf3 Kg5
      { from: "c6", to: "f3" },
      { from: "f6", to: "g5" },
      // 57. Bb7 Ra1
      { from: "f3", to: "b7" },
      { from: "a6", to: "a1" },
      // 58. Bc8 Ra4
      { from: "b7", to: "c8" },
      { from: "a1", to: "a4" },
      // 59. Kf3 Rc4
      { from: "g2", to: "f3" },
      { from: "a4", to: "c4" },
      // 60. Bd7 Kf6
      { from: "c8", to: "d7" },
      { from: "g5", to: "f6" },
      // 61. Kg4 Rd4
      { from: "f3", to: "g4" },
      { from: "c4", to: "d4" },
      // 62. Bc6 Rd8
      { from: "d7", to: "c6" },
      { from: "d4", to: "d8" },
      // 63. Kxh4 Rg8
      { from: "g4", to: "h4" },
      { from: "d8", to: "g8" },
      // 64. Be4 Rg1
      { from: "c6", to: "e4" },
      { from: "g8", to: "g1" },
      // 65. Nh5+ Ke6
      { from: "f4", to: "h5" },
      { from: "f6", to: "e6" },
      // 66. Ng3 Kf6
      { from: "h5", to: "g3" },
      { from: "e6", to: "f6" },
      // 67. Kg4 Ra1
      { from: "h4", to: "g4" },
      { from: "g1", to: "a1" },
      // 68. Bd5 Ra5
      { from: "e4", to: "d5" },
      { from: "a1", to: "a5" },
      // 69. Bf3 Ra1
      { from: "d5", to: "f3" },
      { from: "a5", to: "a1" },
      // 70. Kf4 Ke6
      { from: "g4", to: "f4" },
      { from: "f6", to: "e6" },
      // 71. Nc5+ Kd6
      { from: "d3", to: "c5" },
      { from: "e6", to: "d6" },
      // 72. Nge4+ Ke7
      { from: "g3", to: "e4" },
      { from: "d6", to: "e7" },
      // 73. Ke5 Rf1
      { from: "f4", to: "e5" },
      { from: "a1", to: "f1" },
      // 74. Bg4 Rg1
      { from: "f3", to: "g4" },
      { from: "f1", to: "g1" },
      // 75. Be6 Re1
      { from: "g4", to: "e6" },
      { from: "g1", to: "e1" },
      // 76. Bc8 Rc1
      { from: "e6", to: "c8" },
      { from: "e1", to: "c1" },
      // 77. Kd4 Rd1+
      { from: "e5", to: "d4" },
      { from: "c1", to: "d1" },
      // 78. Nd3 Kf7
      { from: "c5", to: "d3" },
      { from: "e7", to: "f7" },
      // 79. Ke3 Ra1
      { from: "d4", to: "e3" },
      { from: "d1", to: "a1" },
      // 80. Kf4 Ke7
      { from: "e3", to: "f4" },
      { from: "f7", to: "e7" },
      // 81. Nb4 Rc1
      { from: "d3", to: "b4" },
      { from: "a1", to: "c1" },
      // 82. Nd5+ Kf7
      { from: "b4", to: "d5" },
      { from: "e7", to: "f7" },
      // 83. Bd7 Rf1+
      { from: "c8", to: "d7" },
      { from: "c1", to: "f1" },
      // 84. Ke5 Ra1
      { from: "f4", to: "e5" },
      { from: "f1", to: "a1" },
      // 85. Ng5+ Kg6
      { from: "e4", to: "g5" },
      { from: "f7", to: "g6" },
      // 86. Nf3 Kg7
      { from: "g5", to: "f3" },
      { from: "g6", to: "g7" },
      // 87. Bg4 Kg6
      { from: "d7", to: "g4" },
      { from: "g7", to: "g6" },
      // 88. Nf4+ Kg7
      { from: "d5", to: "f4" },
      { from: "g6", to: "g7" },
      // 89. Nd4 Re1+
      { from: "f3", to: "d4" },
      { from: "a1", to: "e1" },
      // 90. Kf5 Rc1
      { from: "e5", to: "f5" },
      { from: "e1", to: "c1" },
      // 91. Be2 Re1
      { from: "g4", to: "e2" },
      { from: "c1", to: "e1" },
      // 92. Bh5 Ra1
      { from: "e2", to: "h5" },
      { from: "e1", to: "a1" },
      // 93. Nfe6+ Kh6
      { from: "f4", to: "e6" },
      { from: "g7", to: "h6" },
      // 94. Be8 Ra8
      { from: "h5", to: "e8" },
      { from: "a1", to: "a8" },
      // 95. Bc6 Ra1
      { from: "e8", to: "c6" },
      { from: "a8", to: "a1" },
      // 96. Kf6 Kh7
      { from: "f5", to: "f6" },
      { from: "h6", to: "h7" },
      // 97. Ng5+ Kh8
      { from: "e6", to: "g5" },
      { from: "h7", to: "h8" },
      // 98. Nde6 Ra6
      { from: "d4", to: "e6" },
      { from: "a1", to: "a6" },
      // 99. Be8 Ra8
      { from: "c6", to: "e8" },
      { from: "a6", to: "a8" },
      // 100. Bh5 Ra1 (100th half-move since last pawn move/capture)
      { from: "e8", to: "h5" },
      { from: "a8", to: "a1" },
      // 101. Bg6 Rf1+
      { from: "h5", to: "g6" },
      { from: "a1", to: "f1" },
      // 102. Ke7 Ra1
      { from: "f6", to: "e7" },
      { from: "f1", to: "a1" },
      // 103. Nf7+ Kg8
      { from: "g5", to: "f7" },
      { from: "h8", to: "g8" },
      // 104. Nh6+ Kh8
      { from: "f7", to: "h6" },
      { from: "g8", to: "h8" },
      // 105. Nf5 Ra7+
      { from: "h6", to: "f5" },
      { from: "a1", to: "a7" },
      // 106. Kf6 Ra1
      { from: "e7", to: "f6" },
      { from: "a7", to: "a1" },
      // 107. Ne3 Re1
      { from: "f5", to: "e3" },
      { from: "a1", to: "e1" },
      // 108. Nd5 Rg1
      { from: "e3", to: "d5" },
      { from: "e1", to: "g1" },
      // 109. Bf5 Rf1
      { from: "g6", to: "f5" },
      { from: "g1", to: "f1" },
      // // 110. Ndf4 Ra1
      { from: "d5", to: "f4" },
      { from: "f1", to: "a1" },
      // // 111. Ng6+ Kg8
      { from: "f4", to: "g6" },
      { from: "h8", to: "g8" },
      // // 112. Ne7+ Kh8
      { from: "g6", to: "e7" },
      { from: "g8", to: "h8" },
      // // 113. Ng5 Ra6+
      { from: "e6", to: "g5" },
      { from: "a1", to: "a6" },
      // // 114. Kf7 Rf6+ (draw by fifty-move rule)
      { from: "f6", to: "f7" },
    ];

    const finalState = getFinalGameStateByMoves(moves);
    expect(getGameStatus(finalState)).toEqual("black-to-play");
  });
});
