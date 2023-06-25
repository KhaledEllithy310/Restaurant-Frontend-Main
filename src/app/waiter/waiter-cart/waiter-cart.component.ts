import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TemplateRef, ViewEncapsulation } from '@angular/core';
import {
  NgbActiveOffcanvas,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-waiter-cart',
  // standalone: true,
  templateUrl: './waiter-cart.component.html',
  styleUrls: ['./waiter-cart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WaiterCartComponent {
  CartProducts!: any[];
  @Input() product: any;

  constructor(
    private cartservice: CartService,
    private offcanvasService: NgbOffcanvas
  ) {}
  //*Start offcanvas ng-bootstrap*//
  isOffcanvasOpen = false;
  offcanvasRef!: NgbOffcanvasRef;

  openEnd(content: TemplateRef<any>) {
    if (!this.isOffcanvasOpen) {
      this.offcanvasRef = this.offcanvasService.open(content, {
        position: 'end',
      });
    } else {
      this.offcanvasRef.close();
    }
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }
  //*End offcanvas ng-bootstrap*//

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
