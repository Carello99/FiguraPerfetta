import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit{

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['tabs/cerchio']);
    }, 3000);
  }


}
