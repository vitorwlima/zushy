import type { Piece } from ".";

export const pawn: Piece = {
  value: 1,
  name: "pawn",
  notation: "",
  vectorPerspective: "relativeToColor",
  canMoveThroughOtherPieces: false,
  movePattern: [
    {
      kind: "step",
      vec: { dx: 0, dy: 1 },
    },
    {
      kind: "step",
      vec: { dx: 0, dy: 2 },
      condition: "first move",
    },
  ],
  capturePattern: [
    {
      kind: "step",
      vec: { dx: 1, dy: 1 },
    },
    {
      kind: "step",
      vec: { dx: -1, dy: 1 },
    },
  ],
};
