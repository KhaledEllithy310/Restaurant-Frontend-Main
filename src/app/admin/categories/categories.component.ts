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
  idCategory!: number;
  selectedCategory: any = {};
  imageUrl: any;
  selectedFile: File | undefined;
  categoryForm!: FormGroup;
  updateCategoryForm!: FormGroup;
  searchTerm: string = '';
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;
  searchForm!: FormGroup;

  // category!: any;
  // nameControl: FormControl;
  @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('updatefileInput', { static: false }) updatefileInput!: ElementRef;

  constructor(
    private getCatService: GetDataService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });

    this.searchForm.controls['searchTerm'].valueChanges.subscribe(
      (term: string) => {
        this.search(term);
      }
    );
    // call the all categories
    this.getAllCategory();
    //form group for add categoryForm
    this.categoryForm = this.fb.group({
      name: [
        this.selectedCategory.name,
        [Validators.required, Validators.minLength(2)],
      ],
      image: [''],
    });
    //form group for update categoryForm
    this.updateCategoryForm = this.fb.group({
      name_updated: ['', [Validators.required, Validators.minLength(2)]],
      image_updated: [''],
    });
  }

  //create form control for input {name}
  get nameControl() {
    return this.categoryForm.controls['name'];
  }

  //Create a New Category
  createCategory() {
    const image = this.addfileInput.nativeElement.files[0];
    const newCategory = new FormData();
    newCategory.append('name', this.categoryForm.value.name);
    newCategory.append('image', image);
    console.log(newCategory);

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
    window.location.reload();
  }

  //Get All Categories
  getAllCategory() {
    this.categoryService.getCategoryPagination(this.pageNumber).subscribe(
      (response: any) => {
        this.categories = response.data;
        this.totalItems = response.meta.total;
        this.pageSize = response.meta.per_page;
        console.log(response);
        // console.log('   this.totalItems', this.totalItems);
        // console.log('   this.pageSize', this.pageSize);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
  }

  onPageChange(event: any) {
    // this.pageSize = event.pageSize;
    console.log(event);

    this.pageNumber = event;
    // this.pageNumber = event.page;
    this.getAllCategory();
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
    // window.location.reload();
  }

  //GET THE ID OF THE OBJECT
  getIdCategory(idCategory: any) {
    console.log(idCategory);

    //Call The Old Category
    this.categoryService
      .getOldCategory(idCategory)
      .subscribe((Response: any) => {
        this.selectedCategory = Response.data;
        console.log(this.selectedCategory.name);
        //set the image of the old category to  {this.imageUrl} to display it in modal
        this.imageUrl = 'http://127.0.0.1:8000' + this.selectedCategory.image;
        //set the name of the old category to the input field value {name_updated}
        name_updated.value = this.selectedCategory.name;
      });

    //store the idCategory in {this.idCategory} to pass it to the modal
    this.idCategory = idCategory;

    //Select the input field name_updated
    let name_updated = document.getElementById(
      'name_updated'
    ) as HTMLInputElement;

    console.log(name_updated);
  }

  //set the selected image next to the input
  onImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = file;
      this.imageUrl = reader.result as string;
    };
  }

  //Update Category
  updateCategory(idCategory: any) {
    //Call The Old Category
    this.categoryService
      .getOldCategory(idCategory)
      .subscribe((Response: any) => {
        this.selectedCategory = Response.data;
        console.log(this.selectedCategory.name);
        // Set the image URL to display the old image
        this.imageUrl = 'http://127.0.0.1:8000' + this.selectedCategory.image;
      });

    // Selected The New Image For Category
    const image = this.updatefileInput.nativeElement.files[0];
    console.log(image);
    //Create Object And Append in it form data
    const updateCategory = new FormData();
    // if the user didn't enter new name => set the old name
    updateCategory.set(
      'name',
      this.updateCategoryForm.value.name_updated || this.selectedCategory.name
    );
    // Set the image URL to display the old image
    if (image) {
      updateCategory.set('image', image);
    }
    updateCategory.set('_method', 'put');
    updateCategory.set('status', '1');
    // console.log(this.updateCategoryForm.value);
    console.log(updateCategory.get('name'));
    console.log(updateCategory.get('image'));
    //Send the Request to the server
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
    window.location.reload();
  }

  onSearch() {
    // this.categoryService.onSearch(this.searchTerm).subscribe(
    //   (Response: any) => {
    //     this.categories = Response.data;
    //     console.log(Response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  //search function
  search(term: string) {
    // Perform search using the term
    this.categoryService.onSearch(term).subscribe(
      (Response: any) => {
        this.categories = Response.data;
        console.log(Response);
      },
      (error) => {
        this.categories = error.error.data;
        console.log(error);
      }
    );
  }
}
