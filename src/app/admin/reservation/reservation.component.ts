import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  reservations: any;

  filterReservation: any = [];

  filterBytable: any = [];

  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;

  urlapi = 'http://127.0.0.1:8000/api/reservation/date';
  urlapi2 = 'http://127.0.0.1:8000/api/reservation';
  
  startDate: any;
  
  endDate: any;

  tableNum: any;
  errors: any = [];
  constructor(private reservationService: ReservationService, private http: HttpClient) {}

  ngOnInit() {
    this.getReservation();
  }

  getReservation() {
    this.reservationService.reservationPagination(this.pageNumber).subscribe({
      next: (res: any) => {
          this.reservations = res.data.data;
          this.totalItems = res.data.total;
          this.pageSize = res.data.per_page;
          console.log(this.totalItems);
          console.log(res);
      },
      error: (err: any) => {
        this.errors = err;
      }});
  }

  onPageChange(event: any) {
    this.pageNumber = event;
    this.getReservation();
  }

  filterDataByDate(): any {

    if (this.startDate == '' || this.endDate == '') {
      return this.filterReservation = [];
    }

    const url = `${this.urlapi}?start_date=${this.startDate}&end_date=${this.endDate}`;
    this.http.get(url).subscribe((res: any) => {

      this.filterReservation = res.data;
    });
}
  filterDataByTable(): any {
    if (!this.tableNum) {
      this.filterBytable = this.reservations;
      return;
    }
    const url = `${this.urlapi2}/${this.tableNum}`;
    this.http.get(url).subscribe((res: any) => {
      this.filterBytable = res.data
    });
  }
}