import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngridentsService } from './../../../services/ingridents.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-sub-ingredient',
  templateUrl: './add-sub-ingredient.component.html',
  styleUrls: ['./add-sub-ingredient.component.css'],
})
export class AddSubIngredientComponent {
  @Input() showIngredientsForm!: boolean;
  ingredientsForm!: FormGroup;
  ingredients!: any[];
  IngredientsList: any[] = [];
  isIngredientsListEmpty: boolean = true;

  constructor(
    private fb: FormBuilder,
    private IngridentsService: IngridentsService,
    private productsService: ProductsService
  ) {}
  ngOnInit() {
    this.ingredientsForm = this.fb.group({
      Ingredient_id: ['', [Validators.required]],
      Ingredient_Quantity: ['', [Validators.required]],
    });

    //call all ingredients
    this.getAllIngredients();
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
    let ingredientsExist = this.IngredientsList.find(
      (elem) => elem.id == newIngredient.id
    );
    if (!ingredientsExist) {
      //store the new ingredient in the IngredientsList {array}

      this.productsService.addIngredient(newIngredient);

      this.IngredientsList.push(newIngredient);
      Swal.fire({
        icon: 'success',
        title: 'Ingredient added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // if (
      //   confirm(
      //     'Ingredient already exists. Do you want to update the quantity?'
      //   )
      // ) {
      //   // Find the index of the existing ingredient in the array
      //   const index = this.IngredientsList.findIndex(
      //     (elem) => elem.id === newIngredient.id
      //   );
      //   // Update the quantity of the existing ingredient
      //   this.IngredientsList[index].quantity = newIngredient.quantity;
      //   // Recalculate the total price for the updated ingredient
      //   this.IngredientsList[index].total = (
      //     newIngredient.quantity *
      //     Ingredient_Price *
      //     (1 + +Ingredient_Profit)
      //   ).toFixed(2);
      // }
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

  closeIngredientForm() {
    //clear the data in form
    this.ingredientsForm.reset();
    //disappear the form after submit
    this.productsService.getFormStatus().subscribe((res) => {
      this.showIngredientsForm = res;
    });
    this.showIngredientsForm = false;
    this.productsService.setFormStatus(this.showIngredientsForm);
  }

  //Get All Ingredients
  getAllIngredients() {
    this.IngridentsService.getIngridents().subscribe(
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
}
