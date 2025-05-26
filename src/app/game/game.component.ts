import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Import Router
import { Subscription } from 'rxjs';
import { LevelService } from '../level.service';
import { Level } from '../types';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnDestroy {
  currentLevel: Level | undefined;
  score: number;
  hintCost1: number;
  hintCost2: number;
  imageUrl: String = 'https://yorbodyfysiotherapie.nl/wp-content/uploads/2021/08/voetbal-blessures.jpg';
  routeSubscription?: Subscription;
  nextLevel: number;

  constructor(
    private levelService: LevelService,
    private route: ActivatedRoute,
    private router: Router // Inject Router
  ) {
    this.score = this.levelService.score;
    this.hintCost1 = this.levelService.hintCost1;
    this.hintCost2 = this.levelService.hintCost2;
    this.nextLevel = Number(this.currentLevel?.levelNumber);
    if (this.currentLevel) {
      this.currentLevel.usedLetterIndices = [];
    }
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && !isNaN(Number(id))) {
        const levelNumber = Number(id);
        this.currentLevel = this.levelService.getLevel('raad_het_woord', levelNumber);
        if(this.currentLevel?.levelNumber)
        this.nextLevel = this.currentLevel?.levelNumber + 1;
        if (!this.currentLevel) {
          console.error(`Level with number ${levelNumber} not found`);
          this.router.navigate(['/levels']); // Redirect to levels page
        }
        if(this.currentLevel?.picture)
          this.imageUrl = this.currentLevel?.picture;
        if (this.currentLevel && !this.currentLevel.usedLetterIndices) {
          this.currentLevel.usedLetterIndices = [];
        }
      } else {
        console.error('Invalid or missing level ID.');
        this.router.navigate(['/levels']); // Redirect to levels page
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

    selectLetter(letter: string, index: number): void {
    if (!this.currentLevel) return;

    console.log(`Letter ${letter} geklikt op index ${index}`);

    // Controleer of deze index al is gebruikt om een letter in het geraden woord te plaatsen
    if (this.currentLevel.usedLetterIndices.includes(index)) {
      return;
    }

    // Zoek de eerste lege plek om de letter in te voegen
    const emptyIndexGuessed = this.currentLevel.guessedLetters.findIndex(guessedLetter => guessedLetter === '');
    if (emptyIndexGuessed !== -1) {
      this.currentLevel.guessedLetters[emptyIndexGuessed] = this.currentLevel.letters[index];
      this.currentLevel.usedLetterIndices.push(index); // Markeer de index als gebruikt
      this.levelService.updateGuessedLetters('raad_het_woord', this.currentLevel.levelNumber, this.currentLevel.guessedLetters); // Update via de service
      this.levelService.updateUsedLetterIndices('raad_het_woord', this.currentLevel.levelNumber, this.currentLevel.usedLetterIndices); // Update de gebruikte indices via de service
    }
  }
  checkLetter(index: number){
    if(this.currentLevel?.usedLetterIndices.includes(index))
      return false;
    else
    return true
  }
  removeLetter(indexGuessed: number): void {
    if (!this.currentLevel) return;

    console.log(`Letter verwijderen op index ${indexGuessed}`);
    const removedLetter = this.currentLevel.guessedLetters[indexGuessed];
    this.currentLevel.guessedLetters[indexGuessed] = '';

    // Verwijder de corresponderende index uit de usedLetterIndices array
    const originalIndexToRemove = this.currentLevel.letters.findIndex(
      (letter, originalIndex) => letter === removedLetter && this.currentLevel?.usedLetterIndices.includes(originalIndex)
    );

    if (originalIndexToRemove !== -1) {
      const usedIndexToRemove = this.currentLevel.usedLetterIndices.indexOf(originalIndexToRemove);
      if (usedIndexToRemove !== -1) {
        this.currentLevel.usedLetterIndices.splice(usedIndexToRemove, 1);
        this.levelService.updateUsedLetterIndices('raad_het_woord', this.currentLevel.levelNumber, this.currentLevel.usedLetterIndices); // Update de gebruikte indices via de service
      }
    }

    this.levelService.updateGuessedLetters('raad_het_woord', this.currentLevel.levelNumber, this.currentLevel.guessedLetters);
  }

  get displayString(): string | null {
    return this.currentLevel ? this.currentLevel.guessedLetters.join('') : null;
  }

  useHint1(): void {
    if (!this.currentLevel) return;
    let l = this.currentLevel.answer.length;
    let rnd = Math.floor(Math.random() * l)
    if (this.score >= this.hintCost1) {
      console.log('Hint 1 gebruikt = ' + rnd);
      this.levelService.updateScore(this.score);
      // Implement hint 1 logic
      if(this.checkLetter(rnd))
      {
        let x = this.currentLevel.letters.lastIndexOf(this.currentLevel.answer[rnd]);
        this.currentLevel.usedLetterIndices.push(x);
        this.currentLevel.guessedLetters[rnd] = this.currentLevel.answer[rnd];
        this.levelService.updateGuessedLetters('raad_het_woord', this.currentLevel.levelNumber, this.currentLevel.guessedLetters); // Update via de service
        this.levelService.updateUsedLetterIndices('raad_het_woord', this.currentLevel.levelNumber, this.currentLevel.usedLetterIndices); // Update de gebruikte indices via de service
        this.score -= this.hintCost1;
      }
    } else {
      console.log('Niet genoeg geld ' + rnd);
    }
  }

  useHint2(): void {
    if (!this.currentLevel) return;
    if (this.score >= this.hintCost2) {
      console.log('Hint 2 gebruikt');
      this.score -= this.hintCost2;
      this.levelService.updateScore(this.score);
      this.currentLevel.guessedLetters = this.currentLevel.answer
      // Implement hint 2 logic
    } else {
      console.log('Niet genoeg geld');
    }
  }

  checkAnswer(): void {
    if (!this.currentLevel) return;
    console.log('Antwoord controleren');
    const guessedWord = this.currentLevel.guessedLetters.join('').toUpperCase();
    const correctAnswer = this.currentLevel.answer.join('').toUpperCase();

    if (guessedWord === correctAnswer) {
      console.log('Correct!!!!!');
      this.score += 10;
      this.levelService.updateScore(10);
      this.levelService.updateLevelStatus('raad_het_woord', this.currentLevel.levelNumber, true);
      this.currentLevel.Done = true;
      this.levelService.markLevelCompleted('raad_het_woord', this.currentLevel.levelNumber);
      // Implement win logic
    } else {
      console.log('Niet correct! :(');
      // Implement lose logic
      this.currentLevel.Done =false
    }
  }
}
