import { diffWords } from "diff";

export type DiffChunk = {
  value: string;
  type: "added" | "removed" | "unchanged";
};

export const compareTexts = (text1: string, text2: string): DiffChunk[] => {
  const result = diffWords(text1, text2);

  return result.map((part) => ({
    value: part.value,
    type: part.added ? "added" : part.removed ? "removed" : "unchanged",
  }));
};
