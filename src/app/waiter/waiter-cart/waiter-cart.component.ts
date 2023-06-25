import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-waiter-cart',
  templateUrl: './waiter-cart.component.html',
  styleUrls: ['./waiter-cart.component.css'],
})
// export class NgbdOffcanvasContent {
//   constructor(public activeOffcanvas: NgbActiveOffcanvas) {}
// }
export class WaiterCartComponent {
  CartProducts!: any[];
  @Input() product: any;
  constructor(
    private cartservice: CartService,
    private offcanvasService: NgbOffcanvas
  ) {}

  // open() {
  //   const offcanvasRef = this.offcanvasService.open(NgbdOffcanvasContent);
  //   offcanvasRef.componentInstance.name = 'World';
  // }
  ngOnInit(): void {
    //GET PRODUCT THAT STORED IN CART
    this.cartservice
      .getCartProducts()
      .subscribe((res: any) => (this.CartProducts = res));
    // .subscribe((res: any) => console.log(res));
  }

  moveCartBtn() {
    let cartBtn = document.getElementById('cart_btn');
    cartBtn?.addEventListener('click', function () {
      // if (cartBtn) {
      //   cartBtn.style.position = 'fixed';
      //   // cartBtn.style.top = '100px';
      //   cartBtn.style.right = '400px';
      // } else {
      //   if (cartBtn) {
      //     cartBtn.style.position = 'fixed';
      //     cartBtn.style.right = '0px';
      //   }
      // }
    });
  }
}
