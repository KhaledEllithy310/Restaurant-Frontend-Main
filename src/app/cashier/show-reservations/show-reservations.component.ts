import  Swal  from 'sweetalert2';
import { CashierService } from './../../services/cashier.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-show-reservations',
  templateUrl: './show-reservations.component.html',
  styleUrls: ['./show-reservations.component.css']
})
export class ShowReservationsComponent {
  reservations: any;
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;

  constructor(private cahsierService:CashierService){

  }
  ngOnInit(): void {
    this.getAllReservation();
  }

  getAllReservation() {

    this.cahsierService.getAllReservation(this.pageNumber).subscribe((response:any)=>{
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

acceptReservation(id:number)
{
  this.cahsierService.acceptReservation(id).subscribe((res:any)=>
  {
    if(res.message == "Reservation Accepted")
    {
    Swal.fire({
      title: 'Update Reservation',
      text: res.message,
      icon: 'success'
    });
    this.reservations.map((value:any)=>{
      if(value.id==id)
      {
        value.status = 'accepted'
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
