import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { InfoComponent } from './info/info.component';
import { LevelsComponent } from './levels/levels.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SettingsComponent,InfoComponent,LevelsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GameGeussr';
}
