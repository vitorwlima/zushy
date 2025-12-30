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

export const initialPosition: Position = {
  a1: { color: "white", piece: "rook" },
  a2: { color: "white", piece: "pawn" },
  a3: null,
  a4: null,
  a5: null,
  a6: null,
  a7: { color: "black", piece: "pawn" },
  a8: { color: "black", piece: "rook" },
  b1: { color: "white", piece: "knight" },
  b2: { color: "white", piece: "pawn" },
  b3: null,
  b4: null,
  b5: null,
  b6: null,
  b7: { color: "black", piece: "pawn" },
  b8: { color: "black", piece: "knight" },
  c1: { color: "white", piece: "bishop" },
  c2: { color: "white", piece: "pawn" },
  c3: null,
  c4: null,
  c5: null,
  c6: null,
  c7: { color: "black", piece: "pawn" },
  c8: { color: "black", piece: "bishop" },
  d1: { color: "white", piece: "queen" },
  d2: { color: "white", piece: "pawn" },
  d3: null,
  d4: null,
  d5: null,
  d6: null,
  d7: { color: "black", piece: "pawn" },
  d8: { color: "black", piece: "queen" },
  e1: { color: "white", piece: "king" },
  e2: { color: "white", piece: "pawn" },
  e3: null,
  e4: null,
  e5: null,
  e6: null,
  e7: { color: "black", piece: "pawn" },
  e8: { color: "black", piece: "king" },
  f1: { color: "white", piece: "bishop" },
  f2: { color: "white", piece: "pawn" },
  f3: null,
  f4: null,
  f5: null,
  f6: null,
  f7: { color: "black", piece: "pawn" },
  f8: { color: "black", piece: "bishop" },
  g1: { color: "white", piece: "knight" },
  g2: { color: "white", piece: "pawn" },
  g3: null,
  g4: null,
  g5: null,
  g6: null,
  g7: { color: "black", piece: "pawn" },
  g8: { color: "black", piece: "knight" },
  h1: { color: "white", piece: "rook" },
  h2: { color: "white", piece: "pawn" },
  h3: null,
  h4: null,
  h5: null,
  h6: null,
  h7: { color: "black", piece: "pawn" },
  h8: { color: "black", piece: "rook" },
};
