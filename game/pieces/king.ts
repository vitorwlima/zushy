import type { Piece } from ".";

export const king: Piece = {
  name: "king",
  notation: "K",
  vectorPerspective: "absolute",
  canMoveThroughOtherPieces: false,
  capturePattern: "same as move pattern",
  movePattern: [
    {
      kind: "step",
      vec: { dx: 1, dy: 1 },
    },
    {
      kind: "step",
      vec: { dx: 1, dy: -1 },
    },
    {
      kind: "step",
      vec: { dx: -1, dy: 1 },
    },
    {
      kind: "step",
      vec: { dx: -1, dy: -1 },
    },
    {
      kind: "step",
      vec: { dx: 1, dy: 0 },
    },
    {
      kind: "step",
      vec: { dx: -1, dy: 0 },
    },
    {
      kind: "step",
      vec: { dx: 0, dy: 1 },
    },
    {
      kind: "step",
      vec: { dx: 0, dy: -1 },
    },
  ],
};
