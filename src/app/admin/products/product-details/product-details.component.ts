import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngridentsService } from 'src/app/services/ingridents.service';
import { ProductsService } from 'src/app/services/products.service';
import { Ingrident } from './../../../interfaces/ingrident';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  targetProduct: any;
  targetExtraList: any[] = [];
  targetIngredientList: any[] = [];
  ingredientsForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private IngridentsService: IngridentsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    //Call All Product And Display The Target Product
    this.getTargetProduct();

    this.ingredientsForm = this.fb.group({
      Ingredient_id: ['', [Validators.required]],
      Ingredient_Quantity: ['', [Validators.required]],
    });
  }

  //Call All Product And Display The Target Product
  getTargetProduct() {
    let targetId = this.activatedRoute.snapshot.params['id'];
    this.productsService.getProductById(targetId).subscribe((Response: any) => {
      (this.targetProduct = Response.data), console.log(this.targetProduct);
      console.log(this.targetProduct);
      this.getTargetExtra();
      this.getTargetIngredient();
    });
  }

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

  deleteIngredient(idIngredient: any) {
    this.productsService.deleteIngredient(idIngredient);
    this.productsService.getIngredientsList().subscribe((response: any) => {
      this.targetIngredientList = response;
      console.log(this.targetIngredientList);
    });
  }

  getTargetIngredient() {
    let TargetIngredient = [];
    for (let i = 0; i < this.targetProduct.ingredients.length; i++) {
      const Ingrident = this.targetProduct.ingredients[i];

      const newIngredient = {
        id: Ingrident.pivot.ingredient_id,
        name: Ingrident.name,
        quantity: Ingrident.pivot.quantity,
        total: Ingrident.pivot.total,
      };

      TargetIngredient.push(newIngredient);
    }
    this.productsService.initializeIngredientList(TargetIngredient);

    this.productsService.getIngredientsList().subscribe(
      (response: any) => {
        this.targetIngredientList = response;
        console.log(this.targetIngredientList);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
