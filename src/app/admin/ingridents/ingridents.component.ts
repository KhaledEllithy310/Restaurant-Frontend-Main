import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngridentsService } from './../../services/ingridents.service';

@Component({
  selector: 'app-ingridents',
  templateUrl: './ingridents.component.html',
  styleUrls: ['./ingridents.component.css']
})
export class IngridentsComponent {

  ingridents: any;
  success!: string;
  errors: any = [];
  constructor(private router: Router, private ingridentService: IngridentsService) {}

  ngOnInit() {
    this.ingridentService.getIngridents().subscribe({
      next: (res: any) => {
        this.ingridents = res.data;
      },
      error: (err: any) => {
        console.log(err);
        
      }
    })
  }
  editIngrident(id: any) {
    this.router.navigate([`admin/ingridents/edit/${id}`])
  }

}
