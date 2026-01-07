export type Color = "black" | "white";

export type Square = {
  piece: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";
  color: Color;
} | null;

export type Position = {
  a1: Square;
  a2: Square;
  a3: Square;
  a4: Square;
  a5: Square;
  a6: Square;
  a7: Square;
  a8: Square;
  b1: Square;
  b2: Square;
  b3: Square;
  b4: Square;
  b5: Square;
  b6: Square;
  b7: Square;
  b8: Square;
  c1: Square;
  c2: Square;
  c3: Square;
  c4: Square;
  c5: Square;
  c6: Square;
  c7: Square;
  c8: Square;
  d1: Square;
  d2: Square;
  d3: Square;
  d4: Square;
  d5: Square;
  d6: Square;
  d7: Square;
  d8: Square;
  e1: Square;
  e2: Square;
  e3: Square;
  e4: Square;
  e5: Square;
  e6: Square;
  e7: Square;
  e8: Square;
  f1: Square;
  f2: Square;
  f3: Square;
  f4: Square;
  f5: Square;
  f6: Square;
  f7: Square;
  f8: Square;
  g1: Square;
  g2: Square;
  g3: Square;
  g4: Square;
  g5: Square;
  g6: Square;
  g7: Square;
  g8: Square;
  h1: Square;
  h2: Square;
  h3: Square;
  h4: Square;
  h5: Square;
  h6: Square;
  h7: Square;
  h8: Square;
};

export type SquareKey = keyof Position;

export type Move = {
  from: SquareKey;
  to: SquareKey;
};

export type RecordedMove = Move & {
  notation: string;
};

export type GameState = {
  position: Position;
  moveHistory: RecordedMove[];
};
