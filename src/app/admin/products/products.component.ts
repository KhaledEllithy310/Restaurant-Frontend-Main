import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;
  products!: any[];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    config: NgbPaginationConfig
  ) {
    // customize default values of pagination controls
    // config.maxSize = 10;
    // config.pageSize = this.pageSize;
    // config.boundaryLinks = true;
  }
  ngOnInit() {
    //call the  All Products
    this.getAllProducts();
  }

  //Get All Products
  getAllProducts() {
    this.productsService.getProduct(this.pageNumber, this.pageSize).subscribe(
      (response: any) => {
        this.products = response.data;
        this.totalItems = response.total;
        console.log(this.totalItems);

        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
  }

  // onPageChange(event: any) {
  //   this.pageSize = event.pageSize;
  //   this.pageNumber = event.page;
  //   // this.pageNumber = event.page;
  //   this.getAllProducts();
  // }
}
