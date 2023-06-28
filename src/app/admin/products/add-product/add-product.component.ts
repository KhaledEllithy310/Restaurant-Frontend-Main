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
  data!: any[];
  idCategory!: number;
  tableForm!: FormGroup;
  @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('updatefileInput', { static: false }) updatefileInput!: ElementRef;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.tableForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      productDescription: [''],
      status: [true],
      image: ['', [Validators.required]],
      productDiscount: [''],
      category_id: ['', [Validators.required]],
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
