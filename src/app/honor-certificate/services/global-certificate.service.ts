import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalCertificate } from '../models/global-certificate';

@Injectable({
  providedIn: 'root'
})
export class GlobalCertificateService {

  private readonly apiNominatimUrl = 'https://nominatim.openstreetmap.org/search';
  private readonly apiCertificateUrl = 'http://localhost:3101/certificates';
  constructor(private http: HttpClient) {}

  // Appel HTTP pour récupérer les pays
  getCountries() {
    return this.http.get<any[]>('assets/countries.json');
  }

  // Génération du numéro client
  generateCustomerNumber(lastName: string, firstName: string): number | null {
    if (lastName && firstName) {
      return Math.floor(Math.random() * 1000000); // Numéro aléatoire
    }
    return null;
  }

  // Validateur personnalisé pour la date de naissance
  dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
    debugger;
    const dateValue = control.value;
    const today = new Date();
    const birthDate = new Date(dateValue);
    if (birthDate > today) {
      return { invalidDate: true }; // Date dans le futur
    }
    return null;
  }

  // Observateur de champs (méthode utilitaire)
  observeFields(
    form: any, 
    fieldPaths: string[], 
    callback: () => void
  ): void {
    fieldPaths.forEach((path) => {
      form.get(path)?.valueChanges.subscribe(() => {
        callback();
      });
    });
  }


  getSuggestions(query: string): Observable<any[]> {
    const url = `${this.apiNominatimUrl}?format=json&q=${encodeURIComponent(query)}&addressdetails=1`;
    return this.http.get<any[]>(url);
  }

  submitCertificate(data: GlobalCertificate): Observable<GlobalCertificate> {
    return this.http.post<GlobalCertificate>(this.apiCertificateUrl, data);
  }
}
