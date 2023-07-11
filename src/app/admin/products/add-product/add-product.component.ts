import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
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
  ExtraList: any[] = [];
  ExtraListId: any[] = [];

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
    // // call the all Ingredients
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
    // Convert the array of objects to an array of strings

    // convert array elements to integers
    // const extras = this.ExtraListId.map((value) => parseInt(value));
    // newProduct.append('extra', extras);
    // convert extras array to a JSON-formatted string
    // const extrasJson = JSON.stringify(extras);
    // // append extrasJson string to newProduct object
    // newProduct.append('extra', extrasJson);
    // console.log(newProduct.get('extra'));

    // extras.forEach((value: string, index: string) => {
    //   newProduct.append(`extra[${index}]`, value);
    //   console.log(newProduct.get('extra'));
    // });
    // const ExtraStrings = this.ExtraListId.map((extra) => {
    //   JSON.stringify(extra);
    //   console.log(JSON.stringify(extra));
    // });
    // console.log('ExtraStrings', ExtraStrings);

    // // Append the array of strings to the FormData object
    // ExtraStrings.forEach((extraString: any, index) => {
    //   console.log('extraString', extraString);
    //   newProduct.append(`extra[${index}]`, extraString);

    //   // const extraObj = JSON.parse(extraString);
    //   // Object.keys(extraObj).forEach((key) => {
    //   //   newProduct.append(`extra[${index}]`, extraObj[key]);
    //   //   console.log(extraObj[key]);
    //   // });
    // });
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

    this.total_price = ((total_price / 100) * 100).toFixed(2);
    return ((total_price / 100) * 100).toFixed(2);
  }

  addIngredientsForProduct() {
    //get selected Ingredient
    let selectedIngredient = this.ingredients.find(
      (elem) => elem.id == this.ingredientsForm.value.Ingredient_id
    );
    // get Ingredient Price
    let Ingredient_Price = selectedIngredient.price;
    //// console.log('Ingredient_Price', Ingredient_Price);
    console.log(this.ingredientsForm.value);

    // get Ingredient Profit
    let Ingredient_Profit = selectedIngredient.profit;
    ////  console.log('Ingredient_Profit', Ingredient_Profit);

    // get Ingredient Quantity that user enter it into the input field
    let Ingredient_Quantity = this.ingredientsForm.value.Ingredient_Quantity;
    // // console.log('Ingredient_Quantity', Ingredient_Quantity);

    // get Ingredient name
    let Ingredient_name = selectedIngredient.name;

    //calculate the total price = price * quantity * (1 + Profit)
    let finalPrice = (
      ((Ingredient_Quantity * Ingredient_Price * (1 + +Ingredient_Profit)) /
        100) *
      100
    ).toFixed(2);

    //create new Ingredient to sent it to the server
    const newIngredient = {
      id: this.ingredientsForm.value.Ingredient_id,
      name: Ingredient_name,
      quantity: this.ingredientsForm.value.Ingredient_Quantity,
      total: finalPrice,
    };
    //check if the ingredients exsit in the IngredientsList or not
    let ingredientsExist = this.IngredientsList.find(
      (elem) => elem.id == newIngredient.id
    );
    if (!ingredientsExist) {
      //store the new ingredient in the IngredientsList {array}
      this.IngredientsList.push(newIngredient);
      Swal.fire({
        icon: 'success',
        title: 'Ingredient added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
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
          Swal.fire('Updated!', 'Your Ingredient has been updated.', 'success');
          // Find the index of the existing ingredient in the array
          const index = this.IngredientsList.findIndex(
            (elem) => elem.id === newIngredient.id
          );
          // Update the quantity of the existing ingredient
          this.IngredientsList[index].quantity = newIngredient.quantity;
          // Recalculate the total price for the updated ingredient
          this.IngredientsList[index].total = (
            newIngredient.quantity *
            Ingredient_Price *
            (1 + +Ingredient_Profit)
          ).toFixed(2);
        }
      });
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

    // create new Extra to Show it in the browser for the user
    //  const newExtra = {
    //   id: this.ExtraForm.value.Ingredient_id,
    //   name: Ingredient_name,
    //   quantity: this.ExtraForm.value.Ingredient_Quantity,
    //   total: finalPrice.toFixed(2),
    //  };

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
}
