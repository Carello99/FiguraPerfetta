import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quadrato',
  templateUrl: 'quadrato.page.html',
  styleUrls: ['quadrato.page.scss']
})
export class QuadratoPage {

  constructor(private router: Router) { }
  goToInfoPage() {
    this.router.navigate(['/info']);  // Modifica '/help' con il percorso corretto della tua pagina di destinazione
  }
}
