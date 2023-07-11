import { StorgeTokenService } from 'src/app/services/storge-token.service';
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
import { ReservationService } from 'src/app/services/reservation.service';

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

  customerId: any;
  reservationId: any;

  constructor(
    private cartservice: CartService,
    private offcanvasService: NgbOffcanvas,
    private tableService: TablesService,
    private orderService: OrderService,
    private session:StorgeTokenService,
    private reservationService: ReservationService
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
        console.log(Response);
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
    this.tableService.getAvailableTable().subscribe(
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
      quantity: cardProduct.quantity + 1,
    };

    this.cartservice.UpdateCart(newCardProduct).subscribe(
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
      console.log('before', totalPriceAllProductsCart.toFixed(2));

      this.cartservice.setTotalPrice(
        ((totalPriceAllProductsCart / 100) * 100).toFixed(2)
      );

      this.cartservice.getTotalPrice().subscribe((res: any) => {
        this.totalPrice = res;
      });
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
    console.log('customer_id', this.customerId);
    console.log('reservation_id', this.reservationId);

    const order = {
      total_price: this.totalPrice,
      table_id: this.TableId,
      user_id: this.session.getUser()['user']['id'],
      products: newProductCart,
      customer_id: this.customerId,
      reservation_id: this.reservationId,
    };

    const deletedCartObject = {
      _method: 'delete',
    };

    console.log(order);
    // Send Request to make order
    this.orderService.createOrder(order).subscribe(
      (res: any) => {
        console.log(res);
        this.getAllTable()
        //Send Request and Delete All Cart Objects from server
        this.cartservice.DeleteCart(deletedCartObject).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
        this.CartProducts = [];
        this.totalPrice = 0;

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
    this.TableId = +event.target.value;
    console.log('TableId', this.TableId);

    this.getReservationByTableInDay(this.TableId);
  }

  //function to get the newest data from the server
  updateCartData() {
    this.cartservice.getAllCart().subscribe(
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

  getReservationByTableInDay(TableId: any) {
    this.reservationService.getReservationByTableInDay(TableId).subscribe(
      (res: any) => {
        console.log(res);
        if (res.data.length === 0) {
          Swal.fire({
            icon: 'info',
            title: "This Table Hasn't Any Reservation",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger',
            },
            buttonsStyling: false,
          });

          swalWithBootstrapButtons
            .fire({
              title: `This Table Has Reservation`,
              text: `For Mr :${res.data[0].customer.name} --
                     Data: ${res.data[0].start_date}
              `,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'confirmation',
              cancelButtonText: 'cancel',
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                swalWithBootstrapButtons.fire('Confirmed', '', 'success');
                this.customerId = res.data[0].customer.id;
                this.reservationId = res.data[0].id;
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  "this client hasn't Reservation",
                  'error'
                );
              }
            });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
