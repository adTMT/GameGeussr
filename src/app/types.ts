export interface Level {
    levelNumber: number;
    score: number;
    letters: string[];
    guessedLetters: string[];
    answer: string[]; // Corrected type to string[]
    Done: boolean | null;
  }