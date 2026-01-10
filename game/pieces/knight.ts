import type { Piece } from ".";

export const knight: Piece = {
  value: 3,
  name: "knight",
  notation: "N",
  vectorPerspective: "absolute",
  canMoveThroughOtherPieces: true,
  capturePattern: "same as move pattern",
  movePattern: [
    {
      kind: "step",
      vec: { dx: 2, dy: 1 },
    },
    {
      kind: "step",
      vec: { dx: 2, dy: -1 },
    },
    {
      kind: "step",
      vec: { dx: -2, dy: 1 },
    },
    {
      kind: "step",
      vec: { dx: -2, dy: -1 },
    },
    {
      kind: "step",
      vec: { dx: 1, dy: 2 },
    },
    {
      kind: "step",
      vec: { dx: 1, dy: -2 },
    },
    {
      kind: "step",
      vec: { dx: -1, dy: 2 },
    },
    {
      kind: "step",
      vec: { dx: -1, dy: -2 },
    },
  ],
};
