export type ModerationResult = {
  rating: ModerationRating;
  originalMessage: string;
  cleanMessage: string;
}

export enum ModerationRating {
  Normal = "normal",
  Offensive = "offensive",
  Explicit = "explicit",
}