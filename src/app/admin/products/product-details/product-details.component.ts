import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IngridentsService } from 'src/app/services/ingridents.service';
import { ProductsService } from 'src/app/services/products.service';
import { Ingrident } from './../../../interfaces/ingrident';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  targetProduct: any;
  targetExtraList: any[] = [];
  targetIngredientList: any[] = [];
  categories!: any[];
  Ingredients!: any[];
  productExtra!: any[];
  IngredientsList: any[] = [];
  ExtraList: any[] = [];
  ExtraListId: any[] = [];
  oldIngredient: any = {};
  ingredients!: any[];
  data!: any[];
  idCategory!: number;
  productForm!: FormGroup;
  ingredientsForm!: FormGroup;
  ExtraForm!: FormGroup;
  showIngredientsForm = false;
  showProductForm = false;

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
  statusUpdateButton: boolean = false;
  statusUpdateProductButton: boolean = false;
  @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('updatefileInput', { static: false }) updatefileInput!: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private IngridentsService: IngridentsService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    //Call All Product And Display The Target Product
    this.getTargetProduct();
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
    });

    this.ExtraForm = this.fb.group({
      Ingredient_id: ['', [Validators.required]],
      Ingredient_Quantity: ['', [Validators.required]],
    });
  }

  //Call The Target Product
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
    this.targetIngredientList = this.targetIngredientList.filter(
      (ingredient) => ingredient.id !== idIngredient
    );
    console.log(this.targetIngredientList);
    Swal.fire({
      icon: 'success',
      title: 'Ingredient Deleted successfully',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  getTargetIngredient() {
    // let TargetIngredient = [];
    for (let i = 0; i < this.targetProduct.ingredients.length; i++) {
      const Ingrident = this.targetProduct.ingredients[i];

      const newIngredient = {
        id: Ingrident.pivot.ingredient_id,
        name: Ingrident.name,
        quantity: Ingrident.pivot.quantity,
        total: Ingrident.pivot.total,
      };

      this.targetIngredientList.push(newIngredient);
    }
    this.productsService.initializeIngredientList(this.targetIngredientList);

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

  // changeFormStatus() {
  //   this.showIngredientsForm = true;

  //   this.productsService.setFormStatus(this.showIngredientsForm);
  // }

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

  //Get All Ingredients
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

  //Update Product
  updateProduct() {
    // Set the submitted flag to true
    this.submitted = true;
    // Check if the form is invalid
    if (this.productForm.invalid) {
      return;
    }
    // get the image file from the file input element
    let image = this.updatefileInput.nativeElement.files[0];
    // console.log(this.productForm);
    console.log(this.productForm.value);
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

    // ** Start append ingredients array in form data **
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
    // ** End append ingredients array in form data **

    // ** Start append Extra array of id in form data **
    for (let i = 0; i < this.ExtraListId.length; i++) {
      newProduct.append('extra[]', this.ExtraListId[i]);
    }
    // ** End append Extra array of id in form data **

    //call the service and sent the request to the server
    this.productsService.CreateProduct(newProduct).subscribe(
      (response: any) => {
        console.log(response);
        this.productForm.reset();
        //empty the IngredientsList after add this product
        this.IngredientsList = [];
        //check if the IngredientsList is empty => return false and container__Ingredients__Extra is disappear
        this.isIngredientsListEmpty = this.IngredientsList.length === 0;
        //empty the ExtraList after add this product
        this.ExtraList = [];
        //check if the ExtraList is empty => return false and container__Ingredients__Extra is disappear
        this.isExtraListEmpty = this.ExtraList.length === 0;
        this.successMessage = response.message;
        this.showSuccessMessage = true;

        // setTimeout(() => {
        //   this.showSuccessMessage = false;
        // }, 3000);
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 2000,
        });
        this.submitted = false; // Set submitted to false after reset
      },
      (error) => {
        console.log(error);
        // this.ErrorMessage = error.error.message;

        Swal.fire({
          icon: 'warning',
          title: error.error.message,
          showConfirmButton: false,
          timer: 2000,
        });
        // this.showErroressage = true;
        // setTimeout(() => {
        //   this.showErroressage = false;
        // }, 3000);
        this.submitted = false; // Set submitted to false after reset
        // Handle error response
      }
    );

    // window.location.reload();
  }
  //Calculate the total price of  product {Ingredient + extra}
  calculate_total_price() {
    let total_price = 0;
    this.IngredientsList.forEach((Ingredient) => {
      total_price += +Ingredient.total;
    });

    this.total_price = total_price;
    return total_price;
  }

  addIngredientsForProduct() {
    //get selected Ingredient
    let selectedIngredient = this.ingredients.find(
      (elem) => elem.id == this.oldIngredient.id
    );
    console.log(selectedIngredient);
    console.log('oldIngredient', this.oldIngredient);

    // get Ingredient Price
    let Ingredient_Price = selectedIngredient?.price;
    //// console.log('Ingredient_Price', Ingredient_Price);
    console.log(this.ingredientsForm.value);

    // get Ingredient Profit
    let Ingredient_Profit = selectedIngredient?.profit;
    ////  console.log('Ingredient_Profit', Ingredient_Profit);

    // get Ingredient Quantity that user enter it into the input field
    let Ingredient_Quantity =
      this.ingredientsForm.value.Ingredient_Quantity ||
      this.oldIngredient.quantity;
    // // console.log('Ingredient_Quantity', Ingredient_Quantity);

    // get Ingredient name
    let Ingredient_name = selectedIngredient?.name;

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

    //check if the ingredients exsit in the IngredientsList or not
    let ingredientsExist = this.targetIngredientList.find(
      (elem) => elem.id == newIngredient.id
    );

    let IngredientFormTitle = document.getElementById(
      'IngredientFormTitle'
    ) as HTMLInputElement;
    //************************* Update Ingredient *******************************//
    if (IngredientFormTitle.innerText == 'Update Ingredient') {
      const updatedIngredient = {
        id: this.ingredientsForm.value.Ingredient_id || this.oldIngredient.id,
        name: this.oldIngredient.name,
        quantity:
          this.ingredientsForm.value.Ingredient_Quantity ||
          this.oldIngredient.quantity,
        total: finalPrice.toFixed(2),
      };
      // this.ingredientsForm.value.Ingredient_id = this.oldIngredient.id;
      // this.ingredientsForm.value.quantity = this.oldIngredient.quantity;

      const index = this.targetIngredientList.findIndex(
        (elem) => elem.id == this.oldIngredient.id
      );
      // Update the quantity of the existing ingredient
      this.targetIngredientList[index].quantity = updatedIngredient.quantity;
      // Recalculate the total price for the updated ingredient
      this.targetIngredientList[index].total = (
        updatedIngredient.quantity *
        Ingredient_Price *
        (1 + +Ingredient_Profit)
      ).toFixed(2);

      Swal.fire({
        icon: 'success',
        title: 'Ingredient updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (!ingredientsExist) {
        //store the new ingredient in the IngredientsList {array}
        this.targetIngredientList.push(newIngredient);
        Swal.fire({
          icon: 'success',
          title: 'Ingredient Added successfully',
          showConfirmButton: false,
          timer: 1500,
        });

        console.log('targetIngredientList', this.targetIngredientList);
      } else {
        Swal.fire({
          title: 'Do you want to update the quantity?',
          text: 'This Ingredient already exists !',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Update it!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Updated!',
              'Your Ingredient has been updated.',
              'success'
            );
            // Find the index of the existing ingredient in the array
            const index = this.targetIngredientList.findIndex(
              (elem) => elem.id == newIngredient.id
            );
            console.log('index', index);

            console.log(
              'updated targetIngredientList',
              this.targetIngredientList
            );

            // Update the quantity of the existing ingredient
            this.targetIngredientList[index].quantity = newIngredient.quantity;
            // Recalculate the total price for the updated ingredient
            this.targetIngredientList[index].total = (
              newIngredient.quantity *
              Ingredient_Price *
              (1 + +Ingredient_Profit)
            ).toFixed(2);
          }
        });
      }
    }

    //  // console.log(newIngredient);

    // // console.log(this.IngredientsList);
    //check if the IngredientsList is empty => return false and container__Ingredients__Extra is disappear
    this.isIngredientsListEmpty = this.IngredientsList.length === 0;
    //clear the data in form
    this.ingredientsForm.reset();
    //disappear the form after submit
    this.showIngredientsForm = false;
  }

  getOldIngredient(ingredient_id: any) {
    // appear the form ingredient for update
    this.showIngredientsForm = true;
    console.log(ingredient_id);

    const index = this.targetIngredientList.findIndex(
      (elem) => elem.id == ingredient_id
    );

    // use setTimeout to delay code execution by 100ms
    setTimeout(() => {
      let IngredientFormTitle = document.getElementById(
        'IngredientFormTitle'
      ) as HTMLInputElement;
      let IngredientFormBtn = document.getElementById(
        'IngredientFormBtn'
      ) as HTMLInputElement;

      let oldIngredient_id = document.getElementById(
        'oldIngredient_id'
      ) as HTMLInputElement;
      let oldIngredient_quantity = document.getElementById(
        'oldIngredient_quantity'
      ) as HTMLInputElement;
      // Check if the element exists before accessing its innerText property
      if (IngredientFormTitle || IngredientFormBtn) {
        this.oldIngredient = this.targetIngredientList[index];
        IngredientFormTitle.innerText = 'Update Ingredient';
        IngredientFormBtn.innerText = 'Update Ingredient';
        oldIngredient_id.value = this.oldIngredient.id;
        oldIngredient_quantity.value = this.oldIngredient.quantity;
      }
    }, 100);

    //get selected Ingredient
    let selectedIngredient = this.ingredients.find(
      (elem) => elem.id == ingredient_id
    );
    // // get Ingredient Price
    // let Ingredient_Price = selectedIngredient.price;

    // // get Ingredient Profit
    // let Ingredient_Profit = selectedIngredient.profit;

    // // Update the quantity of the existing ingredient
    // this.targetIngredientList[index].quantity =
    //   this.ingredientsForm.value.quantity;
    // // Recalculate the total price for the updated ingredient
    // this.targetIngredientList[index].total = (
    //   this.ingredientsForm.value.quantity *
    //   Ingredient_Price *
    //   (1 + +Ingredient_Profit)
    // ).toFixed(2);
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Ingredient Updated successfully',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
  }

  addExtraForProduct() {
    //get selected Ingredient
    let selectedIngredient = this.ingredients.find(
      (elem) => elem.id == this.ExtraForm.value.Ingredient_id
    );

    // get Ingredient name
    let Ingredient_name = selectedIngredient.name;

    //create new Extra to sent it to the server
    const ExtraId = {
      id: this.ExtraForm.value.Ingredient_id,
    };
    // // create new Extra to Show it in the browser for the user
    //  // const newExtra = {
    ////   id: this.ExtraForm.value.Ingredient_id,
    // //   name: Ingredient_name,
    // //   quantity: this.ExtraForm.value.Ingredient_Quantity,
    // //   total: finalPrice.toFixed(2),
    //  // };
    const newExtra = {
      id: this.ExtraForm.value.Ingredient_id,
      name: Ingredient_name,
    };
    //  // console.log(newIngredient);
    //check if the ingredients exsit in the IngredientsList or not
    let ExtraExist = this.ExtraList.find((elem) => elem.id == newExtra.id);
    if (!ExtraExist) {
      //store the new Extra in the ExtraList {array}
      this.ExtraList.push(newExtra);
      //store the new Extra in the ExtraList {array}
      this.ExtraListId.push(ExtraId.id);
      Swal.fire({
        icon: 'success',
        title: 'Extra added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'This Extra already exists!',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // // console.log(this.IngredientsList);
    //check if the ExtraList is empty => return false and container__Ingredients__Extra is disappear
    this.isExtraListEmpty = this.ExtraList.length === 0;
    //clear the data in form
    this.ExtraForm.reset();
    //disappear the form after submit
    this.showExtraForm = false;
  }

  closeIngredientForm() {
    //clear the data in form
    this.ingredientsForm.reset();
    //disappear the form after submit
    this.showIngredientsForm = false;
  }

  closeExtraForm() {
    //clear the data in form
    this.ExtraForm.reset();
    //disappear the form after submit
    this.showExtraForm = false;
  }

  showUpdateIngredientButton() {
    this.statusUpdateButton = !this.statusUpdateButton;
    let Update_Ingredient = document.getElementById(
      'Update_Ingredient'
    ) as HTMLElement;
    let Add_Ingredient = document.getElementById(
      'Add_Ingredient'
    ) as HTMLElement;
    if (this.statusUpdateButton) {
      Update_Ingredient.innerText = 'Done';
      Add_Ingredient.classList.remove('d-none');

      //**Send New Ingredient To Sever */

      Update_Ingredient.addEventListener('click', () => {
        const ingredients = {
          ingredients: this.targetIngredientList,
        };
        console.log(ingredients);
        console.log(this.targetIngredientList);
        this.productsService
          .updateIngredient(this.targetProduct.id, ingredients)
          .subscribe(
            (response) => {
              console.log(response);
              Swal.fire({
                icon: 'success',
                title: 'Extra added successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            },
            (error) => {
              console.log(error);
            }
          ); // Add any code you want to execute when the button is clicked
      });
    } else {
      Update_Ingredient.innerText = 'Update Ingredient';
    }
  }

  showUpdateProductButton() {
    this.statusUpdateProductButton = !this.statusUpdateProductButton;
    let Update_Product = document.getElementById(
      'Update_Product'
    ) as HTMLElement;
    if (this.statusUpdateProductButton) {
      // set the form controls to the data of the target product
      this.productForm.patchValue({
        productName: this.targetProduct.name,
        productDiscount: this.targetProduct.discount,
        image: this.targetProduct.image,
        category_id: this.targetProduct.category_id,
        productDescription: this.targetProduct.description,
      });
    } else {
      // update the text of the 'Update Product' button to 'Update Product'
      Update_Product.innerText = 'Update Product';
    }
    // set the 'display' property of the 'Update Product' button
    // based on the value of statusUpdateProductButton
    Update_Product.style.display = this.statusUpdateProductButton
      ? 'none'
      : 'block';
  }
}

// showIngredientsForm = true;
