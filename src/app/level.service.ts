import { Injectable } from '@angular/core';
import { Level } from './types';
import levelData from './levels.json'; // Import your JSON data

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private levels: { [gameType: string]: Level[] } = levelData.games;
  public score: number = 0;
  public hintCost1: number = 2;
  public hintCost2: number = 5;

  constructor() {
    // Initialize usedLetterIndices
    for (const gameType in this.levels) {
      this.levels[gameType].forEach(level => {
        if (!level.usedLetterIndices) {
          level.usedLetterIndices = [];
        }
      });
    }
  }

  // --- Level Data Access ---

  getLevels(gameType: string): Level[] | undefined {
    return this.levels[gameType];
  }

  getLevel(gameType: string, levelNumber: number): Level | undefined {
    const gameLevels = this.levels[gameType];
    if (gameLevels && levelNumber > 0 && levelNumber <= gameLevels.length) {
      return { ...gameLevels[levelNumber - 1] }; // Return a copy
    }
    return undefined;
  }

  // --- Update Methods ---

  updateScore(newScore: number): void {
    this.score = newScore;
  }

  updateGuessedLetters(gameType: string, levelNumber: number, guessedLetters: string[]): void {
    const gameLevels = this.levels[gameType];
    if (gameLevels && levelNumber > 0 && levelNumber <= gameLevels.length) {
      gameLevels[levelNumber - 1].guessedLetters = guessedLetters;
    }
  }

  updateLevelStatus(gameType: string, levelNumber: number, done: boolean): void {
    const gameLevels = this.levels[gameType];
    if (gameLevels && levelNumber > 0 && levelNumber <= gameLevels.length) {
      gameLevels[levelNumber - 1].Done = done;
    }
  }

  updateUsedLetterIndices(gameType: string, levelNumber: number, usedIndices: number[]): void {
    const gameLevels = this.levels[gameType];
    if (gameLevels && levelNumber > 0 && levelNumber <= gameLevels.length) {
      gameLevels[levelNumber - 1].usedLetterIndices = usedIndices;
    }
  }

  // --- Progress Tracking (per gamemode) ---

  markLevelCompleted(mode: string, levelNumber: number): void {
    const completed = this.getCompletedLevels(mode);
    const stars = this.getUserStars(mode);
    const unlocked = this.getUnlockedLevels(mode);

    if (!completed.has(levelNumber)) {
      completed.add(levelNumber);
      const newStars = stars + 1;
      const newUnlocked = (newStars % 5 === 0)
        ? Math.min(unlocked + 5, 20)
        : unlocked;

      this.saveProgress(mode, newStars, newUnlocked, completed);
    }
  }

  getCompletedLevels(mode: string): Set<number> {
    const raw = localStorage.getItem(`${mode}_completedLevels`);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set<number>(parsed.map((n: any) => +n));
  }

  getUserStars(mode: string): number {
    const raw = localStorage.getItem(`${mode}_userStars`);
    return raw ? +raw : 0;
  }

  getUnlockedLevels(mode: string): number {
    const raw = localStorage.getItem(`${mode}_unlockedLevels`);
    return raw ? +raw : 5;
  }

  private saveProgress(mode: string, stars: number, unlocked: number, completed: Set<number>): void {
    localStorage.setItem(`${mode}_userStars`, stars.toString());
    localStorage.setItem(`${mode}_unlockedLevels`, unlocked.toString());
    localStorage.setItem(`${mode}_completedLevels`, JSON.stringify(Array.from(completed)));
  }
}
