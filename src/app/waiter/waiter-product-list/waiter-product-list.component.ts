import { Component } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-waiter-product-list',
  templateUrl: './waiter-product-list.component.html',
  styleUrls: ['./waiter-product-list.component.css'],
})
export class WaiterProductListComponent {
  products!: any;

  constructor(private displayProductService: GetDataService) {}
  ngOnInit() {
    this.displayProduct();
  }

  displayProduct() {
    this.displayProductService
      .displayProduct()
      .subscribe((res) => (this.products = res));
  }
}
