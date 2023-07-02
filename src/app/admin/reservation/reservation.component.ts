import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservations: any;
  filterReservation: any = [];
  urlapi = 'http://127.0.0.1:8000/api/reservation/date';
  startDate: any;
  endDate: any;

  constructor(private reservationService: ReservationService, private http: HttpClient) {}

  ngOnInit() {
    this.reservationService.getAllResevations().subscribe((res: any) => {
      this.reservations = res.data.data;
      this.filterDataByDate();
    })
  }

  filterDataByDate() {
    const url = `${this.urlapi}?start_date=${this.startDate}&end_date=${this.endDate}`;
    this.http.get(url).subscribe((res: any) => {
      this.filterReservation = res.data;
    });
}
}