import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngridentsService } from 'src/app/services/ingridents.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  targetProduct: any;
  targetExtraList: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private IngridentsService: IngridentsService
  ) {}

  ngOnInit() {
    //Call All Product And Display The Target Product
    this.getTargetProduct();
    //call all extra for target product
    // this.getTargetExtra();
  }

  //Call All Product And Display The Target Product
  getTargetProduct() {
    let targetId = this.activatedRoute.snapshot.params['id'];
    this.productsService.getProductById(targetId).subscribe((Response: any) => {
      (this.targetProduct = Response.data), console.log(this.targetProduct);
      console.log(this.targetProduct.extra);
      this.getTargetExtra();
    });
  }

  // //Call All Product And Display The Target Product
  // getTargetProduct1() {
  //   this.productsService.getAllProduct().subscribe((Response: any) => {
  //     this.targetProduct = Response.data.find(
  //       (elem: any) => elem.id == this.activatedRoute.snapshot.params['id']
  //     );
  //   });
  // }
  getTargetExtra() {
    for (const key in this.targetProduct.extra) {
      if (this.targetProduct.extra.hasOwnProperty(key)) {
        const name = this.targetProduct.extra[key][0].name;
        console.log(name);
        this.targetExtraList.push(name);
        console.log(this.targetExtraList);
      }
    }
  }
}
