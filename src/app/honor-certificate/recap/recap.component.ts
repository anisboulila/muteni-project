import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.css'
})
export class RecapComponent {
  @Input() form!: FormGroup;
  @Input() goToStep!: (step: number) => void; // Méthode passée depuis le parent
  @Input() steps!:  string[];
}
