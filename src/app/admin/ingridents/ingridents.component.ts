import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingridents',
  templateUrl: './ingridents.component.html',
  styleUrls: ['./ingridents.component.css']
})
export class IngridentsComponent {

  ingridents: any;

  constructor(private router: Router) {}

}
