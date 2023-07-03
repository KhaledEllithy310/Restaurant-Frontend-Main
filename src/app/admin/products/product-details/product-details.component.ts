import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  targetProduct: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    //Call All Product And Display The Target Product
    this.getTargetProduct();
  }

  //Call All Product And Display The Target Product
  getTargetProduct() {
    this.productsService.getAllProduct().subscribe((Response: any) => {
      this.targetProduct = Response.data.find(
        (elem: any) => elem.id == this.activatedRoute.snapshot.params['id'],
        console.log(Response),
        console.log(this.targetProduct),
        console.log(this.activatedRoute.snapshot.params['id'])
      );
    });
  }
}
