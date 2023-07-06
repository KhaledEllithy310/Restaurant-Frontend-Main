import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes = [
  {path:'tablesForbook',component:TablesComponent},
  {path:'MakeReservation/:id',component:AddReservationComponent}
]
@NgModule({
  declarations: [
    TablesComponent,
    AddReservationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,


  ],
  providers:[
    {provide: NgbDateAdapter, useClass: AddReservationComponent},
  ]

})
export class CustomerModule { }
