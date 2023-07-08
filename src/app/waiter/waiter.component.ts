import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css'],
})
export class WaiterComponent {
  productsInCarts: any;
  constructor(private cartservice: CartService) {}

  ngOnInit() {
    this.cartservice.getCartProducts().subscribe((res: any) => {
      this.productsInCarts = res;
    });
  }
}


