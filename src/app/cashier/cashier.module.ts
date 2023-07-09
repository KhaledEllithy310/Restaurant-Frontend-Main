import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowReservationsComponent } from './show-reservations/show-reservations.component';
import { OrdersComponent } from './orders/orders.component';


const routes = [
  {path:'ShowReservations',component:ShowReservationsComponent},
  {path:'ShowOrders',component:OrdersComponent}
]
@NgModule({
  declarations: [
    ShowReservationsComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule

  ]
})
export class CashierModule { }
