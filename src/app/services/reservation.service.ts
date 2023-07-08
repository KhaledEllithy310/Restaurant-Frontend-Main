import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  getAllResevations() {
    return this.http.get(`http://127.0.0.1:8000/api/reservation`);
  }

  getReservationByTableInDay(TableId: any) {
    return this.http.get(
      `http://127.0.0.1:8000/api/reservation/bytable/` + TableId
    );
  }
}
