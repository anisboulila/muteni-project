import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var M: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements AfterViewInit {

  selectedLanguage: string = 'FR';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr'); // Langue par défaut
    const browserLang: string | undefined = this.translate.getBrowserLang();
    this.translate.use(browserLang && ['fr', 'en'].includes(browserLang) ? browserLang : 'fr');
  }

  /*ngAfterViewInit(): void {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }*/

  ngAfterViewInit(): void {
    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns, {
      coverTrigger: false,  // Permet au menu d’apparaître en dehors du bouton
      closeOnClick: false,  // Empêche le menu de se fermer automatiquement
    });
  }

  /*switchLanguage(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value; // Caster en HTMLSelectElement
    this.translate.use(selectedLanguage); // Changer la langue
    console.log(`Langue sélectionnée : ${selectedLanguage}`);
  }*/

    switchLanguage(event: Event,lang: string): void {
      event.preventDefault(); // Empêche le comportement par défaut (navigation)
      this.selectedLanguage = lang.toUpperCase();
      console.log('Langue changée vers :', lang);
      this.translate.use(lang); // Changer la langue
      console.log(`Langue sélectionnée : ${lang}`);
      // Fermer le menu manuellement
    const dropdownElement = document.querySelector('.dropdown-trigger');
    if (dropdownElement) {
      const dropdownInstance = M.Dropdown.getInstance(dropdownElement);
      dropdownInstance?.close(); // Ferme le menu dropdown
    }
    }
}
