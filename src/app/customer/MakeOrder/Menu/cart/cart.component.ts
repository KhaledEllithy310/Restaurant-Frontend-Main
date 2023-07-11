import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { StorgeTokenService } from './../../../../services/storge-token.service';
import Swal from 'sweetalert2';
import { OrderService } from './../../../../services/order.service';
import { TablesService } from 'src/app/services/tables.service';
import { CartService } from 'src/app/services/cart.service';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  CartProducts!: any[];
  @Input() product: any;
  totalPrice: number = 0;
  tables!: any[];
  TableId: any;
  constructor(
    private cartservice: CartService,
    private offcanvasService: NgbOffcanvas,
    private orderService: OrderService,
    private session:StorgeTokenService,
    private reservationService:ReservationService,
    private navigateRoute:Router

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
    // console.log(this.CartProducts);
  }

  getAllCart() {
    this.cartservice.getAllCartCustomer().subscribe(
      (Response: any) => {

        console.log(Response);
        this.cartservice.getCartProducts().subscribe((res) => {
          console.log(res);
          this.CartProducts = res;
        });
      },
      (err: any) => console.log(err)
    );
  }

  plusProduct(cardProduct: any) {
    // console.log(cardProduct);
    const newCardProduct = {
      id: cardProduct.id,
      _method: 'put',
      quantity: cardProduct.quantity + 1,
    };

    this.cartservice.UpdateCartCustomer(newCardProduct).subscribe(
      (res) => {
        console.log(res);
        // cardProduct.quantity++;
        cardProduct.quantity++; // increment the quantity after the request is successful
        this.totalPriceAllProductsCart();
      },
      (err) => {
        // --cardProduct.quantity;
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  minusProduct(cardProduct: any) {
    // console.log(cardProduct);
    if (cardProduct.quantity > 1) {
      const newCardProduct = {
        id: cardProduct.id,
        _method: 'put',
        quantity: --cardProduct.quantity,
      };

      this.cartservice.UpdateCartCustomer(newCardProduct).subscribe(
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
    this.cartservice.DeleteFromCartCustomer(DataProductCart).subscribe(
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

          console.log(this.totalPrice);
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
    const reservation=this.reservationService.getCustomerReservation();
    if(reservation)
    {
      let newProductCart = [];
    for (let i = 0; i < this.CartProducts.length; i++) {
      const newCartObject = {
        id: this.CartProducts[i].product.id,
        // name: this.CartProducts[i].product.name,
        
        total_price: this.CartProducts[i].product.total_price,
        image: this.CartProducts[i].product.image,
        quantity: this.CartProducts[i].quantity,
      };
      localStorage.removeItem("Reservation_Info");
      this.navigateRoute.navigate(["customer/tablesForbook"])
      console.log(this.CartProducts);

      newProductCart.push(newCartObject);
    }

    const order = {
      total_price: this.totalPrice,
      customer_id: this.session.getUser()['user']['id'],
      products: newProductCart,
      start_date:reservation['start_date'],
      table_id:reservation['table_id']
    };

    const deletedCartObject = {
      _method: 'delete',
    };
    console.log(order);
    //Send Request to make order
    this.orderService.createOrder(order).subscribe(
      (res: any) => {
        console.log(res);

        //Send Request and Delete All Cart Objects from server
        this.cartservice.DeleteCartCustomer(deletedCartObject).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
        this.CartProducts = [];
        this.totalPrice = 0;
        localStorage.removeItem("Reservation_Info");
        this.navigateRoute.navigate(["customer/tablesForbook"])


        Swal.fire({
          icon: 'success',
          title: res.message,
          timer: 1500,
        });
      },
      (err: any) => {
        console.log(err);

      }
    );
    }

  }


  //function to get the newest data from the server
  updateCartData() {
    this.cartservice.getAllCartCustomer().subscribe(
      (Response: any) => {
        console.log(Response.data);
        if (Response.data.length === 0) {
          console.log('The array is empty');
          this.totalPrice = 0;
        
          return;
        }
        console.log(Response.data[0]);
        this.cartservice.cartContainer.next(Response.data[0]);
      },
      (err: any) => console.log(err)
    );
  }
}
