import { Injectable } from '@angular/core';
import { Level } from './types'; // Zorg ervoor dat dit pad naar je Level interface correct is

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  // Sla de levels op in een object, georganiseerd per speltype
  private games: { [gameType: string]: Level[] } = {
    'raad_het_woord': [
      {
        levelNumber: 1,
        score: 0,
        letters: ['F', 'S', 'A', 'X', 'B', 'R', 'Z', 'E', 'O', 'L', 'C', 'T'],
        guessedLetters: ['', '', 'O', '', '', 'B', 'A', 'L'],
        answer: ['V', 'O', 'E', 'T', 'B', 'A', 'L'],
        Done: null,
      },
      {
        levelNumber: 2,
        score: 0,
        letters: ['H', 'O', 'N', 'D', 'E', 'N', 'P', 'A', 'R', 'K'],
        guessedLetters: ['', 'O', 'N', 'D'],
        answer: ['H', 'O', 'N', 'D'],
        Done: null,
      },
      {
        levelNumber: 3,
        score: 0,
        letters: ['V', 'R', 'I', 'E', 'N', 'D', 'S', 'C', 'H', 'A', 'P'],
        guessedLetters: ['', '', '', 'E', '', 'N', 'D'],
        answer: ['V', 'R', 'I', 'E', 'N', 'D'],
        Done: null
      }
    ],
    // Voeg hier andere speltypes toe met hun levels
  };

  public score: number = 50;  // Voorbeeld score, je kunt dit op een andere manier initialiseren indien nodig
  public hintCost1: number = 50; // Kosten voor eerste hint
  public hintCost2: number = 10; // Kosten voor tweede hint

  constructor() { }

  // Methode om alle levels voor een specifiek speltype op te halen
  getLevels(gameType: string): Level[] {
    return this.games[gameType] || []; // Retourneer een lege array als het speltype niet bestaat
  }

  // Methode om een specifiek level op te halen
  getLevel(gameType: string, levelNumber: number): Level | undefined {
    const levels = this.getLevels(gameType); // Haal eerst de levels voor het speltype op
    return levels.find(level => level.levelNumber === levelNumber); // Zoek dan het level met het nummer
  }

  // Methode om de score bij te werken
  updateScore(newScore: number): void {
    this.score = newScore;
  }

    // Methode om de guessedLetters van een level bij te werken
  updateGuessedLetters(gameType: string, levelNumber: number, newGuessedLetters: string[]): void {
    const level = this.getLevel(gameType, levelNumber);
    if (level) {
      level.guessedLetters = newGuessedLetters;
    }
  }

    // Methode om de status van een level bij te werken (Done)
    updateLevelStatus(gameType: string, levelNumber: number, done: boolean | null): void {
        const level = this.getLevel(gameType, levelNumber);
        if (level) {
            level.Done = done;
        }
    }
}
