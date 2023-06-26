import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent {
  categories!: any[];
  data!: any[];
  idCategory!: number;
  tableForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.tableForm = this.fb.group({
      TableNo: ['', [Validators.required, Validators.minLength(2)]],
      guest_numbers: ['', [Validators.required, Validators.minLength(2)]],
      status: [true],
    });
  }
  get guest_numbers_Control() {
    return this.tableForm.controls['guest_numbers'];
  }
  get TableNo_Control() {
    return this.tableForm.controls['TableNo'];
  }
  get status_Control() {
    return this.tableForm.controls['status'];
  }

  createTable() {
    console.log(this.tableForm.value);
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
  guest_numbers: any;
  TableNo: any;
  status: any;

  createTable1() {
    const formData = new FormData();
    formData.set('TableNo', this.TableNo);
    formData.set('guest_numbers', this.guest_numbers);
    formData.set('status', this.status);
    console.log(formData.get('TableNo'));
    console.log(formData.get('guest_numbers'));
    console.log(formData.get('status'));

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
