import { customerMakeOrderGuard } from './../guard/customer-make-order.guard';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { NgbDateAdapter, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MyReservationComponent } from './my-reservation/my-reservation.component';
import { ProductListComponent } from './MakeOrder/Menu/product-list/product-list.component';
import { ProductItemComponent } from './MakeOrder/Menu/product-item/product-item.component';
import { CartComponent } from './MakeOrder/Menu/cart/cart.component';
import { MakeOrderComponent } from './MakeOrder/make-order/make-order.component';


const routes = [
  {path:'tablesForbook',component:TablesComponent},
  {path:'MakeReservation/:id',component:AddReservationComponent},
  {path:'MyReservations',component:MyReservationComponent},
  { path: 'MakeOrder', component: MakeOrderComponent,
  // canActivate: [customerMakeOrderGuard]
}
]
@NgModule({
  declarations: [
    TablesComponent,
    AddReservationComponent,
    MyReservationComponent,
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    MakeOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbTimepickerModule


  ],
  providers:[
    {provide: NgbDateAdapter, useClass: AddReservationComponent},


  ]

})
export class CustomerModule { }
