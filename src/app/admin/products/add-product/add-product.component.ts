import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  categories!: any[];
  Ingredients!: any[];
  productExtra!: any[];
  IngredientsList: any[] = [];
  ExtraProducts: any[] = [];
  ingredients!: any[];
  data!: any[];
  idCategory!: number;
  productForm!: FormGroup;
  ingredientsForm!: FormGroup;
  ExtraForm!: FormGroup;
  showIngredientsForm = false;
  showExtraForm = false;
  isIngredientsListEmpty: boolean = true;
  isExtraListEmpty: boolean = true;
  statusText!: string;
  total_price: any = 0;
  submitted = false;
  successMessage: any;
  showSuccessMessage: any;
  ErrorMessage: any;
  showErroressage: any;
  // total_price = this.totalPriceProduct();
  @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('updatefileInput', { static: false }) updatefileInput!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // call the all Ingredients
    this.getAllIngredients();
    // call the all categories
    this.getAllCategory();
    // this.checkStatusAvailable();
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      productDescription: [''],
      image: ['', [Validators.required]],
      productDiscount: [,],
      category_id: ['', [Validators.required]],
    });

    this.ingredientsForm = this.fb.group({
      Ingredient_id: ['', [Validators.required]],
      Ingredient_Quantity: ['', [Validators.required]],
      // Ingredient_Price: ['', [Validators.required]],
      // Ingredient_profit: ['', [Validators.required]],
    });

    this.ExtraForm = this.fb.group({
      Ingredient_id: ['', [Validators.required]],
      Ingredient_Quantity: ['', [Validators.required]],
      // Ingredient_Price: ['', [Validators.required]],
      // Ingredient_profit: ['', [Validators.required]],
    });
  }

  get product_Name_Control() {
    return this.productForm.controls['productName'];
  }
  get product_Description_Control() {
    return this.productForm.controls['productDescription'];
  }
  get status_Control() {
    return this.productForm.controls['status'];
  }
  get product_Discount_Control() {
    return this.productForm.controls['productDiscount'];
  }
  get product_image_Control() {
    return this.productForm.controls['image'];
  }
  get category_id_Control() {
    return this.productForm.controls['category_id'];
  }

  //check if the status is available or unavailable
  // checkStatusAvailable() {
  //   this.productForm.get('status')?.valueChanges.subscribe((value) => {
  //     this.statusText = value ? 'Available' : 'Unavailable';
  //   });
  // }

  // const statusControl = this.productForm.get('status');
  // if (statusControl) {
  //   const statusValue = statusControl.value;
  //   console.log(statusControl.value);

  //   if (statusValue === true) {
  //     this.isUnAvailable = false;
  //     this.isAvailable = true;
  //   } else {
  //     this.isAvailable = false;
  //     this.isUnAvailable = true;
  //   }
  // }
  //Get All Categories
  getAllCategory() {
    this.categoryService.getCategory().subscribe(
      (response: any) => {
        this.categories = response.data;
        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
  }

  getAllIngredients() {
    this.productsService.getIngredients().subscribe(
      (response: any) => {
        this.ingredients = response.data;
        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
  }

  //Create a new Product
  createProduct() {
    // Set the submitted flag to true
    this.submitted = true;
    // Check if the form is invalid
    if (this.productForm.invalid) {
      return;
    }
    // get the image file from the file input element
    let image = this.addfileInput.nativeElement.files[0];
    // console.log(this.productForm);

    // create a new FormData object to send to the server
    const newProduct = new FormData();
    newProduct.append('name', this.productForm.value.productName);
    newProduct.append('description', this.productForm.value.productDescription);
    // add the product discount to the FormData object if it exists
    if (this.productForm.value.productDiscount) {
      newProduct.append('discount', this.productForm.value.productDiscount);
    }
    newProduct.append('category_id', this.productForm.value.category_id);
    newProduct.append('total_price', this.total_price);
    newProduct.append('image', image);
    // Convert the array of objects to an array of strings
    const ingredientStrings = this.IngredientsList.map((ingredient) =>
      JSON.stringify(ingredient)
    );
    // Append the array of strings to the FormData object
    ingredientStrings.forEach((ingredientString, index) => {
      const ingredientObj = JSON.parse(ingredientString);
      Object.keys(ingredientObj).forEach((key) => {
        newProduct.append(`ingredients[${index}][${key}]`, ingredientObj[key]);
      });
    });

    
    this.productsService.CreateProduct(newProduct).subscribe(
      (response: any) => {
        console.log(response);
        this.productForm.reset();
        //empty the IngredientsList after add this product
        this.IngredientsList = [];
        //check if the IngredientsList is empty => return false and container__Ingredients__Extra is disappear
        this.isIngredientsListEmpty = this.IngredientsList.length === 0;
        this.successMessage = response.message;
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

        this.submitted = false; // Set submitted to false after reset
      },
      (error) => {
        console.log(error);
        this.ErrorMessage = error.error.message;
        this.showErroressage = true;
        setTimeout(() => {
          this.showErroressage = false;
        }, 3000);
        this.submitted = false; // Set submitted to false after reset
        // Handle error response
      }
    );

    // window.location.reload();
  }

  //Calculate the total price of  product
  totalPriceProduct() {
    let total_price = 0;

    for (let i = 0; i < this.IngredientsList.length; i++) {
      total_price += parseFloat(this.IngredientsList[i].total);
    }
    //set the total price variable {this.total_price } to append it in form data
    this.total_price = total_price;
    return total_price;
  }

  addIngredientsForProduct() {
    //get selected Ingredient
    let selectedIngredient = this.ingredients.find(
      (elem) => elem.id == this.ingredientsForm.value.Ingredient_id
    );
    // get Ingredient Price
    let Ingredient_Price = selectedIngredient.price;
    //// console.log('Ingredient_Price', Ingredient_Price);

    // get Ingredient Profit
    let Ingredient_Profit = selectedIngredient.profit;
    ////  console.log('Ingredient_Profit', Ingredient_Profit);

    // get Ingredient Quantity that user enter it into the input field
    let Ingredient_Quantity = this.ingredientsForm.value.Ingredient_Quantity;
    // // console.log('Ingredient_Quantity', Ingredient_Quantity);

    // get Ingredient name
    let Ingredient_name = selectedIngredient.name;

    //calculate the total price = price * quantity * (1 + Profit)
    let finalPrice =
      Ingredient_Quantity * Ingredient_Price * (1 + +Ingredient_Profit);

    //create new Ingredient to sent it to the server
    const newIngredient = {
      id: this.ingredientsForm.value.Ingredient_id,
      name: Ingredient_name,
      quantity: this.ingredientsForm.value.Ingredient_Quantity,
      total: finalPrice.toFixed(2),
    };

    //  // console.log(newIngredient);
    //store the new ingredient in the IngredientsList {array}
    this.IngredientsList.push(newIngredient);
    // // console.log(this.IngredientsList);
    //Call totalPrice function to calculate the total price after adding the new ingredient
    this.totalPriceProduct();
    //check if the IngredientsList is empty => return false and container__Ingredients__Extra is disappear
    this.isIngredientsListEmpty = this.IngredientsList.length === 0;
    //disappear the form after submit
    this.showIngredientsForm = false;
  }

  addExtraForProduct() {
    this.submitted = true;
    let ingredientPrice = document.getElementById(
      'ingredientPrice'
    ) as HTMLInputElement;
    let ingredientProfit = document.getElementById(
      'ingredientProfit'
    ) as HTMLInputElement;
    let Ingredient_Price =
      this.ExtraForm.value.ingredientPrice || ingredientPrice.value;
    console.log('Ingredient_Price', Ingredient_Price);

    let Ingredient_Profit =
      this.ExtraForm.value.ingredientProfit || ingredientProfit.value;
    console.log('Ingredient_Profit', Ingredient_Profit);
    let Ingredient_Quantity = this.ExtraForm.value.Ingredient_Quantity;

    console.log('Ingredient_Quantity', Ingredient_Quantity);
    let finalPrice =
      Ingredient_Quantity * Ingredient_Price * (1 + +Ingredient_Profit);
    let Ingredient_name = this.ingredients.find(
      (elem) => elem.id == this.ExtraForm.value.Ingredient_id
    ).name;

    console.log(Ingredient_name);

    const newExtra = {
      id: this.ExtraForm.value.Ingredient_id,
      name: Ingredient_name,
      Quantity: this.ExtraForm.value.Ingredient_Quantity,
      Price: finalPrice.toFixed(2),
    };
    console.log(newExtra);
    this.ExtraProducts.push(newExtra);
    this.isExtraListEmpty = this.ExtraProducts.length === 0;
    this.showExtraForm = false;
  }

  // selectedIngredient(event: any) {
  //   console.log(event.target.value);
  //   let ingredientSelected = this.ingredients.find(
  //     (elem) => elem.id == event.target.value
  //   );
  //   console.log(ingredientSelected);

  //   let ingredientPrice = document.getElementById(
  //     'ingredientPrice'
  //   ) as HTMLInputElement;
  //   if (ingredientPrice) {
  //     ingredientPrice.value = ingredientSelected.price;
  //   }

  //   let ingredientProfit = document.getElementById(
  //     'ingredientProfit'
  //   ) as HTMLInputElement;
  //   if (ingredientProfit) {
  //     ingredientProfit.value = ingredientSelected.profit;
  //   }
  // }
  //GET ALL CATEGORIES
  getAllProduct() {
    // this.getdataService
    //   .getAllCategory()
    //   .subscribe((res: any) => (this.categories = res));
  }

  // createCategory(data: any) {
  //   // this.addService.createCategory(data).subscribe((res) => console.log(res));
  //   // this.getAllCategory();
  //   // window.location.reload();
  // }

  deleteCategory(index: any) {
    // let category = document.getElementById(`cate${index}`);
    // category?.remove();
    // let idCategory = this.categories[index]._id;
    // this.deleteService
    //   .deleteCategory(idCategory)
    //   .subscribe((res) => console.log(res));
    // console.log(this.categories);
    // window.location.reload();
  }

  //GET THE ID OF THE OBJECT
  getIdCategory(idCategory: any) {
    // this.idCategory = idCategory;
  }

  // updateCategory(data: any, idCategory: any) {
  //   // this.updateService
  //   //   .updateCategory(idCategory, data)
  //   //   .subscribe((res) => console.log(res));
  //   // window.location.reload();
  // }

  //Update Category
  name_updated: any;
  image_updated: any;

  updateTable() {
    // const image_updated = this.updatefileInput.nativeElement.files[0];
    // console.log('image_updated', image_updated);
    // const formData = new FormData();
    // formData.set('name_updated', this.name_updated);
    // formData.append('image_updated', image_updated);
    // console.log(formData.get('name_updated'));
    // console.log(formData.get('image_updated'));
    // this.addService.createBook(formData).subscribe((res) => console.log(res));
    // this.getAllBook();
    // console.log(data);
    // window.location.reload();
  }
}
