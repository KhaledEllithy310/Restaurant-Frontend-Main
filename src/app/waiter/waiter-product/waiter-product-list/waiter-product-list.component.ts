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

  selectedProduct: any = null;
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;
  constructor(
    private cartservice: CartService,
    private productsService: ProductsService
  ) {}
  ngOnInit() {
    this.getAllProduct();
    this.getAllCart();
  }

  getAllProduct() {
    this.productsService.getProductPagination(this.pageNumber).subscribe(
      (response: any) => {
        this.products = response.data;
        this.totalItems = response.total;
        this.pageSize = response.per_page;
        console.log(response);
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
        console.log(Response.data[0].data);
        this.cartservice.cartContainer.next(Response.data[0].data);

        this.cartservice.getCartProducts().subscribe((res) => {
          console.log(res);
        });
      },
      (err: any) => console.log(err)
    );
  }

  addToCart(productSelected: any) {
    // this.cartservice.addToCart(productSelected);
    // console.log(productSelected.id);

    const newProductCart = {
      product_id: productSelected.id,
    };

    this.cartservice.AddToCart(newProductCart).subscribe(
      (Response: any) => {
        console.log(Response);
        this.updateCartData();
        this.cartservice.getCartProducts().subscribe((res) => {
          this.CartProducts = res;
          console.log(this.CartProducts);
        });
        Swal.fire({
          icon: 'success',
          title: Response.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
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
}
