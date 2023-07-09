import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngridentsService } from './../../services/ingridents.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ingridents',
  templateUrl: './ingridents.component.html',
  styleUrls: ['./ingridents.component.css']
})
export class IngridentsComponent {
  ingridents: any;
  success!: string;
  errors: any = [];
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;
  searchForm!: FormGroup;
  searchTerm: string = '';
  
  constructor(private router: Router,private fb: FormBuilder, private ingridentService: IngridentsService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });

    this.searchForm.controls['searchTerm'].valueChanges.subscribe(
      (term: string) => {
        this.search(term);
      })

    this.getAllIngridents()
  }

  getAllIngridents() {
    this.ingridentService.ingridentsPagination(this.pageNumber).subscribe({
      next: (res: any) => {
          this.ingridents = res.data;
          this.totalItems = res.meta.total;
          this.pageSize = res.meta.per_page;
          console.log(this.totalItems);
          console.log(res);
      },
      error: (err: any) => {
        this.errors = err;
      }});
    }

  onPageChange(event: any) {
    this.pageNumber = event;
    this.getAllIngridents();
  }

  search(term: string) {
    this.ingridentService.ingridentsSearch(term).subscribe({
      next: (res: any) => {
          this.ingridents = res.data;
          console.log(res);
      },
      error: (err: any) => {
        this.ingridents = err.error.data;
        console.log(err);
      }}
    );
  }

  editIngrident(id: any) {
    this.router.navigate([`admin/dashboard/ingridents/edit/${id}`])
  }
}
