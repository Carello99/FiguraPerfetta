import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-triangolo',
  templateUrl: 'triangolo.page.html',
  styleUrls: ['triangolo.page.scss']
})
export class TriangoloPage {

  constructor(private router: Router) { }
  goToInfoPage() {
    this.router.navigate(['/info']);  // Modifica '/help' con il percorso corretto della tua pagina di destinazione
  }
}
