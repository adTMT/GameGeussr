import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(private location: Location) {}
  goBack(): void {
    this.location.back();
  }
}
