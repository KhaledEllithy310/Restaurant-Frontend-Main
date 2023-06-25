import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-waiter-product-item',
  templateUrl: './waiter-product-item.component.html',
  styleUrls: ['./waiter-product-item.component.css'],
})
export class WaiterProductItemComponent {
  @Input() item: any = {};
  // productSelected: any = {};
  products!: any;
  @Output() productSelected = new EventEmitter<any>();

  constructor(private displayProductService: GetDataService) {}
  ngOnInit(): void {
    // console.log('Product:', this.item);
    // this.displayProduct();
  }

  // displayProduct() {
  //   this.displayProductService
  //     .displayProduct()
  //     .subscribe((res) => (this.products = res));
  // }


  getProductDetail(item: any) {
    this.productSelected.emit(item);
    // console.log(item);
  }
}
