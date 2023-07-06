import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {
  alltables:any;
  constructor(private customerService:CustomerService,private router: Router){

  }
  ngOnInit(): void {

    this.customerService.getAvailableTables().subscribe((res:any)=>this.alltables=res.data)

  }
  ShowAvailableTime(id:string)
  {
   return this.router.navigate(['customer/MakeReservation', id]);

  }

}
