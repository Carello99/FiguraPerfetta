import { Component, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerchio',
  templateUrl: 'cerchio.page.html',
  styleUrls: ['cerchio.page.scss']
})
export class CerchioPage implements AfterViewInit {
  constructor(private router: Router) {}
  @ViewChild('myCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  isDrawing: boolean = false;
  drawnPoints: { x: number, y: number }[] = [];
  precisioneCalcolata: boolean = false;
  precisione!: number;
  isVisible: boolean = false;

  //Metodo utilizzato per entrare nella pagina delle info
  goToInfoPage() {
    this.router.navigate(['/info']);
  }

  hideHeader() {
    this.isVisible = !this.isVisible;
    console.log("Visibilita: ", this.isVisible);
  }

  
  /*
  * Metodo utilizzato per inizializzare la pagina, in particolare la dimensione del canvas
  * dove disegno e l'aggiunta di un listener. 
  */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.adjustCanvasSize();
    }, 0);
    window.addEventListener('resize', this.adjustCanvasSize.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustCanvasSize();
  }

  // Metodo effettivo per il ridimensionamento del canvas
  adjustCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
  }

  /*
  * Metodo utilizzato per ottenere le coordinate del disegno
  */
  getCanvasCoordinates(event: MouseEvent | TouchEvent): { x: number, y: number } {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    let clientX, clientY;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    const scaleX = this.canvasRef.nativeElement.width / rect.width;
    const scaleY = this.canvasRef.nativeElement.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }
  /*
  * Metodo utilizzato nel momento in cui inizio a disegnare
  * Praticamente quando metto il dito dallo schermo
  */
  onMouseDown(event: MouseEvent) {
    const coords = this.getCanvasCoordinates(event);
    this.startDrawing(coords.x, coords.y);
  }

  /*
  * Metodo utilizzato per disegnare e per carpire le coordinate del disegno
  * TODO Bisogna gestire correttamente le coordinate per il calcolo della precisione
  */
  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing) return;
    const coords = this.getCanvasCoordinates(event);
    this.draw(coords.x, coords.y);
  }

  //TODO Inserire un timeout di mezzo secondo per poi calcolare la precisione del disegno
  //TODO Successivamente far visualizzare a schermo il risultato
  //NOTA: il primo metodo: quando "rilascio" il mouse, mentre il secondo quando "esco" fuori dal
  //canvas, praticamente devo avere lo stesso metodo..
  //Devo includere qui anche la logica del cancellamento del disegno --> richiamo clearCanvas()
  onMouseUp() {
    this.stopDrawing();
    this.calcolaPrecisione();
    setTimeout(() => {
      this.adjustCanvasSize();
      this.hideHeader();
    }, 1000);
  }  
  onMouseLeave() {
    if (this.isDrawing) {
      this.stopDrawing();
    }
    this.calcolaPrecisione();
  }

  
  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    const coords = this.getCanvasCoordinates(event);
    this.startDrawing(coords.x, coords.y);
  }

  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    if (!this.isDrawing) return;
    const coords = this.getCanvasCoordinates(event);
    this.draw(coords.x, coords.y);
  }

  onTouchEnd() {
    this.stopDrawing();
    this.calcolaPrecisione();
    setTimeout(() => {
      this.adjustCanvasSize();
      this.hideHeader();
    }, 1000);
  }

  onTouchCancel() {
    this.stopDrawing();
  }

  startDrawing(x: number, y: number) {
    this.isDrawing = true;
    this.drawnPoints.push({ x, y });
    this.context = this.canvasRef.nativeElement.getContext('2d')!;
    this.context.beginPath();
    this.context.moveTo(x, y);
  }

  draw(x: number, y: number) {
    this.drawnPoints.push({ x, y });
    this.context.lineTo(x, y);
    this.context.stroke();
  }

  stopDrawing() {
    this.isDrawing = false;
    this.context.beginPath(); // Inizia un nuovo percorso per evitare collegamenti tra i tratti
  }

  /*
  * Qui bisogna fare dei calcoli a secondo della figura geometrica usata.
  */
  calcolaPrecisione() {
    if (this.drawnPoints.length < 2) {
      this.precisione = 0;
      this.precisioneCalcolata = true;
      return;
    }
  
    // Campiona i punti disegnati lungo il percorso
    const campioni = this.campionaPuntiDisegnati();
  
    // Calcola la circonferenza del cerchio ideale che può contenere il disegno
    const circonferenzaCerchioIdeale = this.calcolaCirconferenzaCerchioIdeale();
  
    // Calcola la precisione come percentuale basata sulle distanze tra i campioni
    const percorsoCampione = this.calcolaPercorsoCampione(campioni);
    this.precisione = Math.min(Math.floor((percorsoCampione / circonferenzaCerchioIdeale) * 100), 100);
    this.precisioneCalcolata = true;
  
    console.log('Precisione Cerchio:', this.precisione, '%');
  }
  
  private calcolaCirconferenzaCerchioIdeale(): number {
    const centro = this.calcolaCentroide();
    const raggio = Math.max(...this.drawnPoints.map(p => Math.sqrt(Math.pow(p.x - centro.x, 2) + Math.pow(p.y - centro.y, 2))));
    return 2 * Math.PI * raggio;
  }
  
  private calcolaCentroide(): { x: number, y: number } {
    const sommaX = this.drawnPoints.reduce((acc, p) => acc + p.x, 0);
    const sommaY = this.drawnPoints.reduce((acc, p) => acc + p.y, 0);
    return { x: sommaX / this.drawnPoints.length, y: sommaY / this.drawnPoints.length };
  }
  
  
  private campionaPuntiDisegnati(): { x: number, y: number }[] {
    // Numero di campioni desiderati lungo il percorso
    const numCampioni = 4; // Modifica il numero di campioni secondo le tue esigenze
  
    const campioni: { x: number, y: number }[] = [];
    const lunghezzaPercorso = this.calcolaLunghezzaPercorso();
  
    // Calcola la distanza tra i campioni lungo il percorso
    const distanzaTraCampioni = lunghezzaPercorso / (numCampioni - 1);
  
    let lunghezzaAccumulata = 0;
    let puntoPrecedente = this.drawnPoints[0];
    campioni.push(puntoPrecedente);
  
    for (let i = 1; i < this.drawnPoints.length; i++) {
      const puntoCorrente = this.drawnPoints[i];
      const distanza = Math.sqrt(Math.pow(puntoCorrente.x - puntoPrecedente.x, 2) + Math.pow(puntoCorrente.y - puntoPrecedente.y, 2));
      lunghezzaAccumulata += distanza;
  
      // Se la lunghezza accumulata supera la distanza tra i campioni, prendi il campione
      if (lunghezzaAccumulata >= distanzaTraCampioni) {
        const percentualeAvanzamento = lunghezzaAccumulata / lunghezzaPercorso;
        const campioneX = puntoPrecedente.x + percentualeAvanzamento * (puntoCorrente.x - puntoPrecedente.x);
        const campioneY = puntoPrecedente.y + percentualeAvanzamento * (puntoCorrente.y - puntoPrecedente.y);
        campioni.push({ x: campioneX, y: campioneY });
        lunghezzaAccumulata = 0;
      }
  
      puntoPrecedente = puntoCorrente;
    }
  
    // Assicurati di includere l'ultimo punto disegnato come ultimo campione
    if (campioni.length < numCampioni) {
      campioni.push(this.drawnPoints[this.drawnPoints.length - 1]);
    }
  
    return campioni;
  }
  
  private calcolaLunghezzaPercorso(): number {
    let lunghezza = 0;
  
    for (let i = 1; i < this.drawnPoints.length; i++) {
      const p1 = this.drawnPoints[i - 1];
      const p2 = this.drawnPoints[i];
      lunghezza += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
  
    return lunghezza;
  }
  
  private calcolaPerimetroQuadratoIdeale(): number {
    const minX = Math.min(...this.drawnPoints.map(p => p.x));
    const minY = Math.min(...this.drawnPoints.map(p => p.y));
    const maxX = Math.max(...this.drawnPoints.map(p => p.x));
    const maxY = Math.max(...this.drawnPoints.map(p => p.y));
  
    const width = maxX - minX;
    const height = maxY - minY;
  
    const perimetro = 2 * (width + height);
    return perimetro;
  }
  
  private calcolaPercorsoCampione(campioni: { x: number, y: number }[]): number {
    let percorso = 0;
  
    for (let i = 1; i < campioni.length; i++) {
      const p1 = campioni[i - 1];
      const p2 = campioni[i];
      percorso += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
  
    return percorso;
  }
  clearCanvas() {
    if (this.context) {
      const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}