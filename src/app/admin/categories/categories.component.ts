import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { GetDataService } from 'src/app/services/get-data.service';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories!: any[];
  getcategories!: any;
  data!: any[];
  idCategory!: number;
  categoryForm!: FormGroup;
  updateCategoryForm!: FormGroup;
  // nameControl: FormControl;
  @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('updatefileInput', { static: false }) updatefileInput!: ElementRef;

  constructor(
    private getCatService: GetDataService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    // this.nameControl = new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(3),
    // ]);
    // this.categoryForm = new FormGroup({
    //   name: this.nameControl,
    //   image: new FormControl(),
    // });
  }

  ngOnInit() {
    // this.createCategory();
    this.getAllCategory();
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: [''],
    });
    this.updateCategoryForm = this.fb.group({
      name_updated: ['', [Validators.required, Validators.minLength(2)]],
      image_updated: [''],
    });
  }

  get nameControl() {
    return this.categoryForm.controls['name'];
  }

  //Create a New Category
  createCategory() {
    const image = this.addfileInput.nativeElement.files[0];
    const newCategory = new FormData();
    newCategory.append('name', this.categoryForm.value.name);
    newCategory.append('image', image);

    this.categoryService.AddCategory(newCategory).subscribe(
      (response) => {
        console.log(response);
        // Handle successful response
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
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

  deleteCategory(index: any) {
    let category = document.getElementById(`cate${index}`);
    category?.remove();
    let idCategory = this.categories[index].id;
    this.categoryService.DeleteCategory(idCategory).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
    console.log(this.categories);
    // window.location.reload();
  }

  //GET THE ID OF THE OBJECT
  getIdCategory(idCategory: any) {
    this.idCategory = idCategory;
    console.log(this.idCategory);
  }

  // updateCategory(data: any, idCategory: any) {
  //   this.categoryService
  //     .UpdateCategory(data, idCategory)
  //     .subscribe((res) => console.log(res));
  //   window.location.reload();
  // }

  //CREATE Category
  name: any;
  image: any;

  // createCategory() {
  //   const image = this.addfileInput.nativeElement.files[0];
  //   const formData = new FormData();
  //   formData.set('name', this.name);
  //   formData.append('image', image);
  //   console.log(formData.get('name'));
  //   console.log(formData.get('image'));

  //   // this.addService.createBook(formData).subscribe((res) => console.log(res));
  //   // this.getAllBook();
  //   // console.log(data);
  //   // window.location.reload();
  // }

  //Update Category
  name_updated: any;
  image_updated: any;

  updateCategory(idCategory: any) {
    console.log('aaaaa');

    const image = this.updatefileInput.nativeElement.files[0];
    const updateCategory = new FormData();
    updateCategory.append('name', this.updateCategoryForm.value.name_updated);
    updateCategory.append('image', image);
    console.log(updateCategory);

    this.categoryService.UpdateCategory(updateCategory, idCategory).subscribe(
      (response) => {
        console.log(response);
        // Handle successful response
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
    // window.location.reload();
  }

  //   updateCategory(idCategory: any) {
  //     console.log('aaaaa');

  //     const image = this.updatefileInput.nativeElement.files[0];
  //     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  //     if (image && allowedTypes.includes(image.type)) {
  //       const updateCategory = new FormData();
  //       updateCategory.append('name', this.updateCategoryForm.value.name_updated);
  //       updateCategory.append('image', image);
  //       // send the request with updateCategory data
  //     } else {
  //       console.log('Invalid file type');
  //     }
  //     // window.location.reload();
  //   }
}
