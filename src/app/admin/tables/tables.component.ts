import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TablesService } from 'src/app/services/tables.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent {
  guest_numbers: any;
  TableNo!:any;
  status: any;
  tableForm!: FormGroup;
  idtable!: number;
  selectedtable: any = {};
  updatetableForm!: FormGroup;


  // @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('addTables', { static: false }) addTables!: ElementRef;

  constructor(
  private fb: FormBuilder,
  private tableService: TablesService,
    // private getCatService: GetDataService,
    ){}

  ngOnInit() {
    //call the all table
    this.getAllTable();
    // to add  tableForm
    this.tableForm = this.fb.group({
      TableNo:
       ['', [Validators.required]],
      guest_numbers: ['', [Validators.required]],
      status: [true],
    });
    this.updatetableForm = this.fb.group({
      TableNo_updated: ['', [Validators.required]],

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


    const newTable = new FormData();
    newTable.append('number', this.tableForm.value.TableNo);
    newTable.append('guest_numbers', this.tableForm.value.guest_numbers);
    newTable.append('status', this.tableForm.value.status);

    console.log(newTable);


    this.tableService.addTables(newTable).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
    // window.location.reload();

    console.log(this.tableForm.value);
  }

  //GET ALL CATEGORIES
  getAllTable() {
    this.tableService.getTable().subscribe({
    next: (res :any)=>{
      this.TableNo =res.data
    },
    error: (err:any)=>{
      console.log(err);
    }
      // (response: any) => {
      //   this.TableNo = response.data;
      //   console.log(response);
      // },
      // (error) => {
      //   console.log(error);
      //   // Handle error response
      // }
    });
  }

  // createTable(data: any) {
  //   this.addService.createCategory(data).subscribe((res) => console.log(res));
  //   this.getAllCategory();
  //   window.location.reload();
  // }

  // deleteTable(index: any) {
  //   let tables = document.getElementById(`cate${index}`);
  //   tables?.remove();
  //   let idtable = this.TableNo[index].id;
  //   this.tableService.Deletetable(idtable).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  //GET THE ID OF THE OBJECT
  getIdtable(idtable: any) {
    // this.idCategory = idCategory;
       //Call The Old Category
       this.tableService
       .getOldTable(idtable)
       .subscribe((Response: any) => {
         this.selectedtable = Response.data;
         console.log(this.selectedtable.TableNo);
         //set the image of the old category to  {this.imageUrl} to display it in modal
         //set the name of the old category to the input field value {name_updated}
         TableNo_updated.value = this.selectedtable.TableNo;
       });

     //store the idCategory in {this.idCategory} to pass it to the modal
     this.idtable = idtable;

     //Select the input field name_updated
     let TableNo_updated = document.getElementById(
       'TableNo_updated'
     ) as HTMLInputElement;

     console.log(TableNo_updated.value);

  }

  updatetable( idtable: any) {
    this.tableService
    .getOldTable(idtable)
    .subscribe((Response: any) =>{
      this.selectedtable = Response.data;
      console.log(this.selectedtable.TableNo);


    });
     const updatetable = new FormData();
     updatetable.set(
      'TableNo_updated',
      this.updatetableForm.value.TableNo_updated || this.selectedtable.TableNo
    );
    console.log(updatetable.get('TableNo_updated'));
    this.tableService.UpdateTable(updatetable, idtable).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
      );
      console.log(updatetable.get('TableNo'));
      this.tableService.UpdateTable(updatetable,idtable).subscribe(
        (response) =>{
          console.log(response);
        },
        (error =>{
          console.log(error);
        })
      );
      window.location.reload();
    //   .updateCategory(idCategory, data)
    //   .subscribe((res) => console.log(res));
    // window.location.reload();
  }

  //CREATE Table


  createTable1() {
    // const formData = new FormData();
    // formData.set('TableNo', this.TableNo);
    // formData.set('guest_numbers', this.guest_numbers);
    // formData.set('status', this.status);
    // console.log(formData.get('TableNo'));
    // console.log(formData.get('guest_numbers'));
    // console.log(formData.get('status'));

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
