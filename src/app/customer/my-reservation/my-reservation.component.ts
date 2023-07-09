import { CustomerService } from './../../services/customer.service';
import { CashierService } from './../../services/cashier.service';
import  Swal  from 'sweetalert2';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css']
})
export class MyReservationComponent {
  reservations: any;
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;

  constructor(private cahsierService:CashierService ,private customerService:CustomerService ){

  }
  ngOnInit(): void {
    this.getAllReservation();
  }

  getAllReservation() {

    this.customerService.getCustomerReservations(this.pageNumber).subscribe((response:any)=>{
      console.log(response.data)
    this.reservations=response.data.data
    this.totalItems = response.data.total;
    this.pageSize = response.data.per_page;
  })
}

cancelReservation(id:number)
{
  this.cahsierService.cancelReservation(id).subscribe((res:any)=>{
    if(res.message == "Reservation Canceled")
    {
    Swal.fire({
      title: 'Update Reservation',
      text: res.message,
      icon: 'success'
    });
    this.reservations.map((value:any)=>{
      if(value.id==id)
      {
        value.status = 'canceled'
      }
    })
  }else{

    Swal.fire({
      title: 'Update Reservation',
      text: res.message,
      icon: 'error'
    });
  }

  })


}

onPageChange(event: any) {
  this.pageNumber = event;
  this.getAllReservation();
}
}
