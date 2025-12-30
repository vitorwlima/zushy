import type { Piece } from ".";

export const queen: Piece = {
  name: "queen",
  notation: "Q",
  vectorPerspective: "absolute",
  canMoveThroughOtherPieces: false,
  capturePattern: "same as move pattern",
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
    {
      kind: "ray",
      vec: { dx: 1, dy: 0 },
    },
    {
      kind: "ray",
      vec: { dx: -1, dy: 0 },
    },
    {
      kind: "ray",
      vec: { dx: 0, dy: 1 },
    },
    {
      kind: "ray",
      vec: { dx: 0, dy: -1 },
    },
  ],
};
