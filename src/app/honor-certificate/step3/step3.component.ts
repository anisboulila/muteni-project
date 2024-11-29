import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalCertificateService } from '../services/global-certificate.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component {
  @Input() formGroup!: FormGroup;
  @Input() selectSuggestion!: (suggestion: any) => void; // Méthode passée depuis le parent
  @Input() suggestions: any[] = [];

  constructor(private certificateService: GlobalCertificateService) {}

   //step3 
   onAddressInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    

    if (input.length > 2) {
      this.certificateService.getSuggestions(input).subscribe((data) => {
        this.suggestions = data.slice(0, 5); // Limiter à 5 suggestions
      });
    } else {
      this.suggestions = [];
    }
  }

  
}
