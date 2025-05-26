import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LevelsComponent } from './levels/levels.component';
import { InfoComponent } from './info/info.component';
import { GameComponent } from './game/game.component';
import { GameModesComponent } from './game-modes/game-modes.component';

export const routes: Routes = [ { path: "home", component: HomeComponent },
    { path: "settings", component: SettingsComponent},
    { path: "levels/:mode", component: LevelsComponent},
    { path: "info", component: InfoComponent},
    { path: "level/:mode/:id", component: GameComponent},
    { path: "gamemodes", component: GameModesComponent},
    { path: "", redirectTo: "home", pathMatch: "full" }];
