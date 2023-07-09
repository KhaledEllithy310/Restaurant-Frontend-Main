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

  getCustomerReservation()
  {
    const itemString = localStorage.getItem('Reservation_Info');

if(itemString){
const item = JSON.parse(itemString);

if (item.expiration < new Date().getTime()) {
  localStorage.removeItem('Reservation_Info');
  return false;
} else {
  const value = item.value;
  return value;
}
  }
  return false;
  }
  getReservationByTableInDay(TableId: any) {
    return this.http.get(
      `http://127.0.0.1:8000/api/reservation/bytable/` + TableId
    );
  }
  reservationPagination(pageNumber: any) {
    return this.http.get(`http://127.0.0.1:8000/api/reservation?page=${pageNumber}`);
  }
}
