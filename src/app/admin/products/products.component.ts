import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;
  products!: any[];
  searchTerm: string = '';
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService // config: NgbPaginationConfig
  ) {
    // customize default values of pagination controls
    // config.maxSize = 10;
    // config.pageSize = this.pageSize;
    // config.boundaryLinks = true;
  }
  ngOnInit() {
    //call the  All Products
    this.getAllProducts();
    //handel the search when the user clear the input search
    this.searchForm = this.fb.group({
      searchTerm: '',
    });

    this.searchForm.controls['searchTerm'].valueChanges.subscribe(
      (term: string) => {
        this.search(term);
      }
    );
  }

  //Get All Products
  getAllProducts() {
    this.productsService.getProduct(this.pageNumber).subscribe(
      (response: any) => {
        this.products = response.data;
        this.totalItems = response.total;
        this.pageSize = response.per_page;

        console.log(this.totalItems);

        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
  }

  onPageChange(event: any) {
    // this.pageSize = event.pageSize;
    console.log(event);

    this.pageNumber = event;
    // this.pageNumber = event.page;
    this.getAllProducts();
  }

  // change_status(id_Product: any) {
  //   console.log(id_Product);

  //   this.productsService
  //     .change_status(id_Product)
  //     .subscribe((Response) => console.log(Response));
  // }

  onSearch() {
    // this.productsService.onSearch(this.searchTerm).subscribe(
    //   (Response: any) => {
    //     this.products = Response.data.data;
    //     console.log(Response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  search(term: string) {
    // Perform search using the term
    this.productsService.onSearch(term).subscribe(
      (Response: any) => {
        this.products = Response.data.data;
        console.log(Response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
