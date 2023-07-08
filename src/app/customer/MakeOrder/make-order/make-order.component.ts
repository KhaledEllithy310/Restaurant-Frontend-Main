import { CartService } from 'src/app/services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent {
  productsInCarts: any;
  constructor(private cartservice: CartService) {}

  ngOnInit() {
    this.cartservice.getCartProducts().subscribe((res: any) => {
      this.productsInCarts = res;
    });
  }
}

