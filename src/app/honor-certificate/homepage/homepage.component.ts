import { AfterViewInit, Component } from '@angular/core';

declare const M: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Initialisation du modal Materialize
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  }

  openModal() {
    const modal = document.querySelector('#custom-modal');
    const instance = M.Modal.getInstance(modal);
    instance.open();
    document.body.style.overflow = 'auto'; 
  }
}
