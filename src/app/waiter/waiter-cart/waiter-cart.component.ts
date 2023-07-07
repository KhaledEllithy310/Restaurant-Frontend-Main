import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TemplateRef, ViewEncapsulation } from '@angular/core';
import {
  NgbActiveOffcanvas,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TablesService } from 'src/app/services/tables.service';
import { OrderService } from './../../services/order.service';

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
  totalPrice: number = 0;
  tables!: any[];
  TableId: any;
  constructor(
    private cartservice: CartService,
    private offcanvasService: NgbOffcanvas,
    private tableService: TablesService,
    private orderService: OrderService
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
    this.totalPriceAllProductsCart();
    this.getAllTable();
    // console.log(this.CartProducts);
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

  getAllTable() {
    this.tableService.getTable().subscribe(
      (response: any) => {
        console.log(response);
        this.tables = response.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  plusProduct(cardProduct: any) {
    // console.log(cardProduct);
    const newCardProduct = {
      id: cardProduct.id,
      _method: 'put',
      quantity: ++cardProduct.quantity,
    };

    this.cartservice.UpdateCart(newCardProduct).subscribe((res) => {
      console.log(res);
      // cardProduct.quantity++;
      this.totalPriceAllProductsCart();
    });
  }

  minusProduct(cardProduct: any) {
    // console.log(cardProduct);
    if (cardProduct.quantity > 1) {
      const newCardProduct = {
        id: cardProduct.id,
        _method: 'put',
        quantity: --cardProduct.quantity,
      };

      this.cartservice.UpdateCart(newCardProduct).subscribe(
        (res) => {
          console.log(res);
          this.totalPriceAllProductsCart();
        },
        (error) => console.log(error)
      );
    } else if (cardProduct.quantity <= 1) {
      Swal.fire({
        title: 'Are you want to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          //delete the Product
          this.deleteProduct(cardProduct);
        } else {
          // User clicked Cancel, set the quantity to 1
          cardProduct.quantity = 1;
        }
      });
    }
  }

  deleteProduct(cardProduct: any) {
    console.log(cardProduct);
    //create a new card product object to send it to server
    const DataProductCart = {
      id: cardProduct.id,
      _method: 'delete',
    };
    //request to delete card product to server
    this.cartservice.DeleteFromCart(DataProductCart).subscribe(
      (Response: any) => {
        console.log(Response);
        this.totalPriceAllProductsCart();
        this.updateCartData();
        this.cartservice.getCartProducts().subscribe((res) => {
          const index = this.CartProducts.findIndex(
            (product) => product.id === cardProduct.id
          );
          if (index !== -1) {
            this.CartProducts.splice(index, 1);
          }
          console.log(this.CartProducts);
        });
        Swal.fire({
          icon: 'success',
          title: Response.message,
          showConfirmButton: false,
          timer: 800,
        });
      },
      (err: any) => console.log(err)
    );
  }

  totalPriceItem(cardProduct: any) {
    return (+cardProduct.total_price * +cardProduct.quantity).toFixed(2);
  }

  // totalPriceAllProductsCart() {
  //   // this.updateCartData();
  //   this.cartservice.getAllCart().subscribe((res: any) => {
  //     let productCart = res.data[0].data;
  //     let totalPriceAllProductsCart = 0;
  //     console.log(productCart);
  //     for (let i = 0; i < productCart.length; i++) {
  //       totalPriceAllProductsCart +=
  //         productCart[i].total_price * productCart[i].quantity;
  //     }
  //     // this.totalPrice = totalPriceAllProductsCart;
  //     this.cartservice.setTotalPrice(totalPriceAllProductsCart);
  //     this.cartservice.getTotalPrice().subscribe((res: any) => {
  //       this.totalPrice = res;
  //     });
  //     console.log(this.totalPrice);
  //     console.log('this.totalPrice', this.totalPrice);
  //   });
  // }

  totalPriceAllProductsCart() {
    // this.updateCartData();
    this.cartservice.getCartProducts().subscribe((res: any) => {
      let productCart = res;
      let totalPriceAllProductsCart = 0;
      console.log(productCart);
      for (let i = 0; i < productCart.length; i++) {
        totalPriceAllProductsCart +=
          productCart[i].total_price * productCart[i].quantity;
      }
      // this.totalPrice = totalPriceAllProductsCart;
      this.cartservice.setTotalPrice(totalPriceAllProductsCart.toFixed(2));
      this.cartservice.getTotalPrice().subscribe((res: any) => {
        this.totalPrice = res;
      });
      console.log(this.totalPrice);
      console.log('this.totalPrice', this.totalPrice);
    });
  }

  createOrder() {
    let newProductCart = [];
    for (let i = 0; i < this.CartProducts.length; i++) {
      const newCartObject = {
        id: this.CartProducts[i].product.id,
        // name: this.CartProducts[i].product.name,
        total_price: this.CartProducts[i].product.total_price,
        image: this.CartProducts[i].product.image,
        quantity: this.CartProducts[i].quantity,
      };
      console.log(this.CartProducts);

      newProductCart.push(newCartObject);
    }

    const order = {
      total_price: this.totalPrice,
      table_id: this.TableId,
      user_id: 3,
      products: newProductCart,
    };

    console.log(order);

    this.orderService.createOrder(order).subscribe(
      (res: any) => {
        console.log(res);
        this.CartProducts = [];
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Choose Your Table',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  getTableId(event: any) {
    console.log(event.target.value);
    this.TableId = event.target.value;
  }
  //function to get the newest data from the server
  updateCartData() {
    this.cartservice.getAllCart().subscribe(
      (Response: any) => {
        console.log(Response);
        this.cartservice.cartContainer.next(Response.data[0].data);
      },
      (err: any) => console.log(err)
    );
  }
}
