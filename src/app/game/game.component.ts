import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  levelNumber = 4; // Voorbeeld level nummer
  score = 50;       // Voorbeeld score
  hintCost1 = 50;    // Kosten voor eerste hint
  hintCost2 = 10;    // Kosten voor tweede hint
  letters = ['F', 'S', 'A', 'X', 'B', 'R', '5', 'E', '2', 'L', 'C', 'T']; // Beschikbare letters
  guessedLetters: string[] = ['', '', 'E', '', '', '']; // Correct geraden letters, initieel met lege strings
  answer: String[] = ['E', 'A', 'F', 'C', '2', '5'];
  //imageUrl = '../images/football.jpg'; //  Zorg dat dit pad correct is!
  imageUrl = 'https://yorbodyfysiotherapie.nl/wp-content/uploads/2021/08/voetbal-blessures.jpg'; // Placeholder image, vervang dit!

  constructor() { }

  ngOnInit(): void {
  }

  selectLetter(letter: string, index: number) {
    // Logica om een letter te selecteren en in het geraden woord te plaatsen
    console.log(`Letter ${letter} geklikt op index ${index}`);
    // Implementeer hier de logica om de letter aan de guessedLetters array toe te voegen
    // en de UI bij te werken.  Je moet rekening houden met de lege plekken.

    // Voorbeeld (zeer basic):
    for (let i = 0; i < this.guessedLetters.length; i++) {
      if (this.guessedLetters[i] === '') {
        this.guessedLetters[i] = letter;
        break; // Stop na het plaatsen van de letter
      }
    }
  }

    removeLetter(index: number) {
        // Logica om een letter te verwijderen uit het geraden woord
        console.log(`Letter verwijderen op index ${index}`);
        this.guessedLetters[index] = ''; // Verwijder de letter op de gegeven index
    }

  get displayString() {
        return this.guessedLetters.join('');
  }
  useHint1() {
    // Implementeer logica voor Hint 1
    console.log('Hint 1 gebruikt');
  }

  useHint2() {
    // Implementeer logica voor Hint 2
    console.log('Hint 2 gebruikt');
  }

  checkAnswer() {
    // Implementeer logica om het antwoord te controleren
    console.log('Antwoord controleren');
    const guessedWord = this.guessedLetters.join(''); // Zet de array van guessedLetters om in een string

    // Zorg ervoor dat je een 'answer' hebt om mee te vergelijken.  Dit moet je ergens definieren.
    const correctAnswer = this.answer.join('');

    if (guessedWord.toUpperCase() === correctAnswer.toUpperCase()) { // Vergelijk de woorden, case-insensitive
      console.log('Correct!!!!!');
      // Hier zou je de speler belonen, naar het volgende level gaan, etc.
    } else {
      console.log('Niet correct! :(');
      // Hier zou je de speler feedback geven, punten aftrekken, etc.
    }
  }
}
