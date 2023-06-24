import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterProductListComponent } from './waiter-product-list/waiter-product-list.component';
import { WaiterProductItemComponent } from './waiter-product-list/waiter-product-item/waiter-product-item.component';
import { WaiterProductDetailComponent } from './waiter-product-list/waiter-product-item/waiter-product-detail/waiter-product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { WaiterComponent } from './waiter.component';

const routes: Routes = [
  {
    path: 'ProductList',
    component: WaiterProductListComponent,
  },
  {
    path: 'ProductDetail',
    component: WaiterProductDetailComponent,
  },
  {
    path: 'ProductItem',
    component: WaiterProductItemComponent,
  },
];
@NgModule({
  declarations: [
    WaiterProductListComponent,
    WaiterProductItemComponent,
    WaiterProductDetailComponent,WaiterComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [GetDataService],
})
export class WaiterModule {}
