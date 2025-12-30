import type { Piece } from ".";

export const bishop: Piece = {
  name: "bishop",
  notation: "B",
  vectorPerspective: "absolute",
  capturePattern: "same as move pattern",
  canMoveThroughOtherPieces: false,
  movePattern: [
    {
      kind: "ray",
      vec: { dx: 1, dy: 1 },
    },
    {
      kind: "ray",
      vec: { dx: 1, dy: -1 },
    },
    {
      kind: "ray",
      vec: { dx: -1, dy: 1 },
    },
    {
      kind: "ray",
      vec: { dx: -1, dy: -1 },
    },
  ],
};
