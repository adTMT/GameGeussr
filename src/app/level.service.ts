import { Injectable } from '@angular/core';
import { Level } from './types';
import levelData from './levels.json'; // Importeer je JSON data

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private levels: { [gameType: string]: Level[] } = levelData.games;
  public score: number = 0; // Algemene score, kan je aanpassen
  public hintCost1: number = 2;
  public hintCost2: number = 5;

  constructor() {
    // Initialiseer usedLetterIndices als deze nog niet bestaan bij het laden
    for (const gameType in this.levels) {
      this.levels[gameType].forEach(level => {
        if (!level.usedLetterIndices) {
          level.usedLetterIndices = [];
        }
      });
    }
  }

  getLevels(gameType: string): Level[] | undefined {
    return this.levels[gameType];
  }

  getLevel(gameType: string, levelNumber: number): Level | undefined {
    const gameLevels = this.levels[gameType];
    if (gameLevels && levelNumber > 0 && levelNumber <= gameLevels.length) {
      return { ...gameLevels[levelNumber - 1] }; // Return een kopie om onbedoelde wijzigingen te voorkomen
    }
    return undefined;
  }

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
}