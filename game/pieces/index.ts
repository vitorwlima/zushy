export type MoveCondition = "first move";

export type Color = "black" | "white";
export type VectorPerspective = "absolute" | "relativeToColor";

export type Vec = {
  dx: number;
  dy: number;
};

export type StepPattern = {
  kind: "step";
  vec: Vec;
  condition?: MoveCondition;
};

export type RayPattern = {
  kind: "ray";
  vec: Vec;
};

export type Pattern = StepPattern | RayPattern;

export type Piece = {
  name: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";
  notation: string;
  movePattern: Pattern[];
  capturePattern: Pattern[] | "same as move pattern";
  canMoveThroughOtherPieces: boolean;
  vectorPerspective: VectorPerspective;
  value: number;
};
