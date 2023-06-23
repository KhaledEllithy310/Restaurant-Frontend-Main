import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterProductListComponent } from './waiter-product-list/waiter-product-list.component';
import { WaiterProductItemComponent } from './waiter-product-item/waiter-product-item.component';



@NgModule({
  declarations: [
    WaiterProductListComponent,
    WaiterProductItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WaiterModule { }
