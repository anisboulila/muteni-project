import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalCertificateService } from '../services/global-certificate.service';
import { GlobalCertificate } from '../models/global-certificate';

declare const M: any;
@Component({
  selector: 'app-attestation',
  templateUrl: './global-certificate.component.html',
  styleUrl: './global-certificate.component.css'
})
export class GlobalCertificateComponent implements OnInit {
  attestationForm!: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 5;
  progress: number = 20;
  suggestions: any[] = [];
  countries: string[] = [];


  steps: string[] = [
    'FORM.STEP.LEGAL_REPRESENTATIVE_INFO',
    'FORM.STEP.DECEASED_INFO',
    'FORM.STEP.BENEFICIARY_INFO',
    'FORM.STEP.TAX_SITUATION',
    'FORM.STEP.RECAP'
  ];

  requiredOnlyLettersValidators = [Validators.required, Validators.pattern('^[a-zA-Z]+$')];
  birthDatePattern!: any[];


  constructor(private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private certificateService: GlobalCertificateService) { }



  ngOnInit() {
    this.initForm();
    this.loadCountries();
    this.observeFields();
  }

  private initForm() {
    this.birthDatePattern = [
      Validators.required,
      Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$'),
      this.certificateService.dateOfBirthValidator
    ];
    this.attestationForm = this.fb.group({
      step1: this.fb.group({
        lastName: ['', this.requiredOnlyLettersValidators],
        firstName: ['', this.requiredOnlyLettersValidators]
      }),
      step2: this.fb.group({
        lastName: [
          '',
          this.requiredOnlyLettersValidators
        ],
        firstName: [
          '',
          this.requiredOnlyLettersValidators
        ],
        birthDate: [
          '',
          this.birthDatePattern
        ],
        customerNumber: [{ value: '', disabled: true }] // Numéro client, désactivé dès le départ
      }),
      step3: this.fb.group({
        lastName: ['', this.requiredOnlyLettersValidators],
        usageName: [''],
        firstName: ['', this.requiredOnlyLettersValidators],
        birthDate: ['', this.birthDatePattern],
        birthCity: ['', Validators.required],
        birthCountry: ['', Validators.required],
        address: ['', Validators.required],
        addressDetails: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
      step4: this.fb.group({
        option: ['', Validators.required]  
      })
    });
  }
  private loadCountries() {
    this.certificateService.getCountries().subscribe(
      (data) => {
        this.countries = data
          .filter((country) => country.translations?.fra)
          .map((country) => country.translations.fra.common)
          .sort();
        this.initAutocomplete();
      },
      (error) => {
        console.error('Erreur lors de l’appel API :', error);
      }
    );
  }

  observeFields() {
    debugger;
    this.certificateService.observeFields(
      this.attestationForm,
      ['step2.lastName', 'step2.firstName'],
      this.setCustomerNumber.bind(this)
    );
  }

  showStep(step: number): boolean {
    return this.currentStep >= step;
  }

  updateProgress() {
    this.progress = (this.currentStep / this.totalSteps) * 100;
  }

  goToStep(step: number): void {
    if (step <= this.currentStep) {
      this.currentStep = step;
      this.updateProgress();
    }
  }


  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  getStepForm(step: number): FormGroup {
    return this.attestationForm.get(`step${step}`) as FormGroup;
  }

  nextStep() {
    const currentGroup = this.attestationForm.get(`step${this.currentStep}`);
    if (currentGroup) {
      currentGroup.markAllAsTouched();

      if (currentGroup.valid) {

        this.currentStep++;
        this.updateProgress()
        this.cdr.detectChanges();

        if (this.currentStep === 3) {
          this.initAutocomplete();
        }
      }
    }
  }

  submit() {
    if (this.attestationForm.valid) {
      const formData: GlobalCertificate = this.attestationForm.value;
      this.certificateService.submitCertificate(formData).subscribe(
        (response) => {
          console.log('Formulaire soumis avec succès :', response);
          this.router.navigate(['/confirmation']);
        },
        (error) => {
          console.error('Erreur lors de la soumission du formulaire :', error);
        }
      );
    }
  }
  
  setCustomerNumber() {
    debugger;
    const lastName = this.attestationForm.get('step2')?.get('lastName')?.value;
    const firstName = this.attestationForm.get('step2')?.get('firstName')?.value;
    const customerNumber = this.certificateService.generateCustomerNumber(lastName, firstName);
    if (customerNumber) {
      this.attestationForm.get('step2')?.get('customerNumber')?.setValue(customerNumber);
    }
  }


  selectSuggestion(suggestion: any): void {
    const address = suggestion.address;

    this.attestationForm.get('step3')?.patchValue({
      address: suggestion.display_name,
      city: address.city || address.town || address.village || '',
      postalCode: address.postcode || '',
      country: address.country || '',
    });

    this.suggestions = [];
  }

  initAutocomplete(): void {
    const elems = document.querySelectorAll('.autocompleteCountry');

    if (elems.length > 0) {
      console.log('countries:', this.countries);
      const autocompleteData = this.countries.reduce<{ [key: string]: any }>((acc, country) => {
        acc[country] = null;
        return acc;
      }, {});

      M.Autocomplete.init(elems, {
        data: autocompleteData,
        onAutocomplete: (selectedCountry: string) => {
          console.log('Pays sélectionné :', selectedCountry); 
          this.attestationForm.get('step3.birthCountry')?.setValue(selectedCountry);
        }
      });
    }
  }
}
