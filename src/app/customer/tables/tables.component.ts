import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent {
  alltables: any;
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService
      .getAvailableTablesPagination(this.pageNumber)
      .subscribe(
        (res: any) => (
          console.log(res),
          (this.alltables = res.data),
          (this.totalItems = res.meta.total),
          (this.pageSize = res.meta.per_page)
        )
      );
  }

  ShowAvailableTime(id: string) {
    return this.router.navigate(['customer/MakeReservation', id]);
  }

  onPageChange(event: any) {
    // this.pageSize = event.pageSize;
    console.log(event);

    this.pageNumber = event;
    // this.pageNumber = event.page;
    this.customerService
      .getAvailableTablesPagination(this.pageNumber)
      .subscribe((res: any) => (this.alltables = res.data));
  }
}
