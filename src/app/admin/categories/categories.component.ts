import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories!: any[];
  data!: any[];
  idCategory!: number;
  categoryForm: FormGroup;
  nameControl: FormControl;
  @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('updatefileInput', { static: false }) updatefileInput!: ElementRef;

  constructor() {
    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.categoryForm = new FormGroup({
      name: this.nameControl,
      image: new FormControl(),
    });
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

  //CREATE Category
  name: any;
  image: any;

  createCategory() {
    const image = this.addfileInput.nativeElement.files[0];
    const formData = new FormData();
    formData.set('name', this.name);
    formData.append('image', image);
    console.log(formData.get('name'));
    console.log(formData.get('image'));

    // this.addService.createBook(formData).subscribe((res) => console.log(res));
    // this.getAllBook();
    // console.log(data);
    // window.location.reload();
  }

  //Update Category
  name_updated: any;
  image_updated: any;

  updateCategory() {
    const image_updated = this.updatefileInput.nativeElement.files[0];
    console.log('image_updated', image_updated);
    const formData = new FormData();
    formData.set('name_updated', this.name_updated);
    formData.append('image_updated', image_updated);
    console.log(formData.get('name_updated'));
    console.log(formData.get('image_updated'));
    // this.addService.createBook(formData).subscribe((res) => console.log(res));
    // this.getAllBook();
    // console.log(data);
    // window.location.reload();
  }
}
