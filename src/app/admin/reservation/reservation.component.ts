import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservations: any;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getAllResevations().subscribe((res: any) => this.reservations = res.data.data)
  }
}
