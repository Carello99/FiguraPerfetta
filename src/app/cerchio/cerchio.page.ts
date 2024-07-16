import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerchio',
  templateUrl: 'cerchio.page.html',
  styleUrls: ['cerchio.page.scss']
})
export class CerchioPage {

  constructor(private router: Router) { }
  goToInfoPage() {
    this.router.navigate(['/info']);  // Modifica '/help' con il percorso corretto della tua pagina di destinazione
  }

}
