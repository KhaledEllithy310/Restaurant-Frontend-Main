import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TemplateRef, ViewEncapsulation } from '@angular/core';
import {
  NgbActiveOffcanvas,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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
    this.getAllCart();
  }

  getAllCart() {
    this.cartservice.getAllCart().subscribe(
      (Response: any) => {
        // this.CartProducts = Response.data[0].data;
        // console.log(this.cartservice.cartContainer);
        console.log(Response.data[0].data);
        this.cartservice.getCartProducts().subscribe((res) => {
          console.log(res);
          this.CartProducts = res;
          // console.log(this.CartProducts);
        });
      },
      (err: any) => console.log(err)
    );
  }

  plusProduct(cardProduct: any) {
    console.log(cardProduct);
    cardProduct.quantity++;
  }

  minusProduct(cardProduct: any) {
    console.log(cardProduct);
    if (cardProduct.quantity > 0) {
      cardProduct.quantity--;
    }
  }

  deleteProduct(cardProduct: any) {
    console.log(cardProduct);

    const DataProductCart = {
      id: cardProduct.id,
      _method: 'delete',
    };

    this.cartservice.DeleteFromCart(DataProductCart).subscribe(
      (Response: any) => {
        this.ngOnInit();
        console.log(Response);
        this.updateCartData();
        this.cartservice.getCartProducts().subscribe((res) => {
          this.CartProducts = res.filter(
            (product) => product.id != cardProduct.id
          );
          console.log(this.CartProducts);
        });
        Swal.fire({
          icon: 'success',
          title: Response.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err: any) => console.log(err)
    );
  }

  totalPriceItem(cardProduct: any) {
    return (+cardProduct.total_price * +cardProduct.quantity).toFixed(2);
  }

  updateCartData() {
    this.cartservice.getAllCart().subscribe(
      (Response: any) => {
        console.log(Response);
        this.cartservice.cartContainer.next(Response.data[0].data);
      },
      (err: any) => console.log(err)
    );
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
