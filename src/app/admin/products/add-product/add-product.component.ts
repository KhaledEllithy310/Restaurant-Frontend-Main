import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

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
  ingredients: any[] = [
    {
      id: 1,
      name: 'ingredient1',
      Quantity_Stock: 1000,
      price: 100,
      profit: 0.1,
    },
    {
      id: 2,
      name: 'ingredient2',
      Quantity_Stock: 2000,
      price: 200,
      profit: 0.2,
    },
    {
      id: 3,
      name: 'ingredient3',
      Quantity_Stock: 3000,
      price: 300,
      profit: 0.3,
    },
    {
      id: 4,
      name: 'ingredient4',
      Quantity_Stock: 4000,
      price: 400,
      profit: 0.4,
    },
  ];
  data!: any[];
  idCategory!: number;
  tableForm!: FormGroup;
  ingredientsForm!: FormGroup;
  ExtraForm!: FormGroup;
  showIngredientsForm = false;
  showExtraForm = false;
  isIngredientsListEmpty: boolean = true;
  isExtraListEmpty: boolean = true;
  statusText!: string;
  @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('updatefileInput', { static: false }) updatefileInput!: ElementRef;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.checkStatusAvailable();
    this.tableForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      productDescription: [''],
      status: [true],
      image: ['', [Validators.required]],
      productDiscount: [''],
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
    return this.tableForm.controls['productName'];
  }
  get product_Description_Control() {
    return this.tableForm.controls['productDescription'];
  }
  get status_Control() {
    return this.tableForm.controls['status'];
  }

  //check if the status is available or unavailable
  // checkStatusAvailable() {
  //   this.tableForm.get('status')?.valueChanges.subscribe((value) => {
  //     this.statusText = value ? 'Available' : 'Unavailable';
  //   });
  // }

  // const statusControl = this.tableForm.get('status');
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

  createProduct() {
    let image = this.addfileInput.nativeElement.files[0];
    // console.log(this.tableForm.value);
    const newProduct = {
      productName: this.tableForm.value.productName,
      productDescription: this.tableForm.value.productDescription,
      status: this.tableForm.value.status,
      image: image,
      productDiscount: this.tableForm.value.productDiscount,
      category_id: this.tableForm.value.category_id,
    };
    console.log(newProduct);
  }

  addIngredientsForProduct() {
    // let ingredientPrice = document.getElementById(
    //   'ingredientPrice'
    // ) as HTMLInputElement;
    // let ingredientProfit = document.getElementById(
    //   'ingredientProfit'
    // ) as HTMLInputElement;

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
      Quantity: this.ingredientsForm.value.Ingredient_Quantity,
      Price: finalPrice.toFixed(2),
    };

    console.log(newIngredient);
    //store the new ingredient in the IngredientsList {array}
    this.IngredientsList.push(newIngredient);
    //check if the IngredientsList is empty => return false and container__Ingredients__Extra is disappear
    this.isIngredientsListEmpty = this.IngredientsList.length === 0;
    //disappear the form after submit
    this.showIngredientsForm = false;
  }

  addExtraForProduct() {
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

  selectedIngredient(event: any) {
    console.log(event.target.value);
    let ingredientSelected = this.ingredients.find(
      (elem) => elem.id == event.target.value
    );
    console.log(ingredientSelected);

    let ingredientPrice = document.getElementById(
      'ingredientPrice'
    ) as HTMLInputElement;
    if (ingredientPrice) {
      ingredientPrice.value = ingredientSelected.price;
    }

    let ingredientProfit = document.getElementById(
      'ingredientProfit'
    ) as HTMLInputElement;
    if (ingredientProfit) {
      ingredientProfit.value = ingredientSelected.profit;
    }
  }
  //GET ALL CATEGORIES
  getAllCategory() {
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

  //CREATE Table
  productName: any;
  productDescription: any;
  productDiscount: any;
  category_id: any;
  status: any;
  Ingredient: any;
  Extra: any;

  createProduct1() {
    const image = this.addfileInput.nativeElement.files[0];
    const formData = new FormData();
    formData.set('productName', this.productName);
    formData.set('productDescription', this.productDescription);
    formData.set('productDiscount', this.productDiscount);
    formData.set('image', image);
    formData.set('category_id', this.category_id);
    formData.set('status', this.status);
    formData.set('Ingredient', this.Ingredient);
    formData.set('Extra', this.Extra);
    // console.log(formData.get('productName'));
    // console.log(formData.get('productDescription'));
    // console.log(formData.get('productDiscount'));
    // console.log(formData.get('status'));
    // console.log(formData.get('image'));
    // console.log(formData.get('category_id'));
    // console.log(formData.get('Ingredient'));
    // console.log(formData.get('Extra'));
    // this.addService.createBook(formData).subscribe((res) => console.log(res));
    // this.getAllBook();
    // console.log(data);
    // window.location.reload();
  }

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
