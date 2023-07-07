import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
// import { Product } from '../../interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-waiter-product-list',
  templateUrl: './waiter-product-list.component.html',
  styleUrls: ['./waiter-product-list.component.css'],
})
export class WaiterProductListComponent {
  products!: Array<any>;
  CartProducts!: any[];
  cartData: any[] = [];

  selectedProduct: any = null;
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;
  totalPrice: number = 0;

  constructor(
    private cartservice: CartService,
    private productsService: ProductsService
  ) {}
  ngOnInit() {
    this.getAllProduct();
    this.getAllCart();
    this.totalPriceAllProductsCart();
  }

  getAllProduct() {
    this.productsService
      .getAvailableProductPagination(this.pageNumber)
      .subscribe(
        (response: any) => {
          this.products = response.data.data;
          this.totalItems = response.data.total;
          this.pageSize = response.data.per_page;
          console.log(this.products);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  //Change Pages To Display Product
  onPageChange(event: any) {
    // this.pageSize = event.pageSize;
    console.log(event);

    this.pageNumber = event;
    // this.pageNumber = event.page;
    this.getAllProduct();
  }
  onProductSelected(product: any) {
    this.selectedProduct = product;
    // console.log(this.selectedProduct);
  }

  resetSelectedProduct() {
    this.selectedProduct = null;
  }

  getAllCart() {
    this.cartservice.getAllCart().subscribe(
      (Response: any) => {
        // this.CartProducts = Response.data[0].data;
        console.log(Response.data);
        if (Response.data.length === 0) {
          console.log('The array is empty');
          this.totalPrice = 0;
          return;
        }
        this.cartservice.cartContainer.next(Response.data[0]);

        this.cartservice.getCartProducts().subscribe((res) => {
          console.log(res);
          this.CartProducts = res;
        });
      },
      (err: any) => console.log(err)
    );
  }

  addToCart(productSelected: any) {
    const newProductCart = {
      product_id: productSelected.id,
    };

    this.cartservice.AddToCart(newProductCart).subscribe(
      (Response: any) => {
        console.log(Response);
        this.updateCartData();
        this.cartservice.getCartProducts().subscribe((res) => {
          this.CartProducts = res;
          this.totalPriceAllProductsCart();

          console.log(this.CartProducts);
        });
        Swal.fire({
          icon: 'success',
          title: Response.message,
          showConfirmButton: false,
          timer: 800,
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 800,
        });
      }
    );
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
  //     totalPriceAllProductsCart;
  //     this.cartservice.setTotalPrice(totalPriceAllProductsCart);

  //     // console.log(this.totalPrice);
  //     // console.log('this.totalPrice', this.totalPrice);
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
      this.cartservice.setTotalPrice(totalPriceAllProductsCart);
      this.cartservice.getTotalPrice().subscribe((res: any) => {
        this.totalPrice = res;
      });
      console.log(this.totalPrice);
      console.log('this.totalPrice', this.totalPrice);
    });
  }

  //function to get the newest data from the server
  updateCartData() {
    this.cartservice.getAllCart().subscribe(
      (Response: any) => {
        console.log(Response);
        this.cartservice.cartContainer.next(Response.data[0]);
      },
      (err: any) => console.log(err)
    );
  }
}
