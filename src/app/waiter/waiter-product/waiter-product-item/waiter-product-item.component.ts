import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetDataService } from './../../../services/get-data.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

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
  @Output() item_card = new EventEmitter<any>();
  constructor(
    private displayProductService: GetDataService,
    private cartservice: CartService
  ) {}
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

  add(productSelected: any) {
    this.item_card.emit(productSelected);
    console.log(productSelected.id);
  }
}
