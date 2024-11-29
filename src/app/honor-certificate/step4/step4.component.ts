import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.css'
})
export class Step4Component {
  @Input() formGroup!: FormGroup;

  options = [
    { value: 'Option 1', label: 'FORM.STEP4.OPTION1' },
    { value: 'Option 2', label: 'FORM.STEP4.OPTION2' }
  ];
}
