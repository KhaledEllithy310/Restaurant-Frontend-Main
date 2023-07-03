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
  Tables!: any;
  status: any;
  tableForm!: FormGroup;
  idtable!: number;
  selectedtable: any = {};
  updatetableForm!: FormGroup;

  // @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('addTables', { static: false }) addTables!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private tableService: TablesService // private getCatService: GetDataService,
  ) {}

  ngOnInit() {
    //call the all table
    this.getAllTable();
    // to add  tableForm
    this.tableForm = this.fb.group({
      TableNo: ['', [Validators.required]],
      guest_numbers: ['', [Validators.required]],
      status: [true],
    });

    this.updatetableForm = this.fb.group({
      TableNo_updated: ['', [Validators.required]],
      guest_numbers_updated: ['', [Validators.required]],
      status_updated: ['', [Validators.required]],
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

  get guest_numbers_updated_Control() {
    return this.updatetableForm.controls['guest_numbers_updated'];
  }
  get TableNo_updated_Control() {
    return this.updatetableForm.controls['TableNo_updated'];
  }
  get status_updated_Control() {
    return this.updatetableForm.controls['status_updated'];
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

  //GET ALL TABLES
  getAllTable() {
    this.tableService.getTable().subscribe({
      next: (res: any) => {
        (this.Tables = res.data), console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
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

  //GET THE ID OF THE OBJECT
  getIdtable(idtable: any) {
    //Call The Old Category
    console.log(idtable);
    this.tableService.getOldTable(idtable).subscribe((Response: any) => {
      this.selectedtable = Response.data;
      console.log(this.selectedtable.number);
      //set the image of the old category to  {this.imageUrl} to display it in modal
      //set the name of the old category to the input field value {name_updated}
      TableNo_updated.value = this.selectedtable.number;
      guest_numbers_updated.value = this.selectedtable.guest_numbers;
    });

    //store the idCategory in {this.idCategory} to pass it to the modal
    this.idtable = idtable;

    //Select the input field name_updated
    let TableNo_updated = document.getElementById(
      'TableNo_updated'
    ) as HTMLInputElement;
    let guest_numbers_updated = document.getElementById(
      'guest_numbers_updated'
    ) as HTMLInputElement;

    console.log(TableNo_updated.value);
  }

  updatetable(idtable: any) {
    this.tableService.getOldTable(idtable).subscribe((Response: any) => {
      this.selectedtable = Response.data;
      console.log(this.selectedtable.TableNo);
    });
    // const updatetable = new FormData();
    // updatetable.append(
    //   'number',
    //   this.updatetableForm.value.TableNo_updated || this.selectedtable.number
    // );
    // updatetable.append(
    //   'guest_numbers',
    //   this.updatetableForm.value.guest_numbers_updated ||
    //     this.selectedtable.guest_numbers
    // );
    // updatetable.append(
    //   'status',
    //   this.updatetableForm.value.status_updated || this.selectedtable.status
    // );
    ////console.log(updatetable.get('TableNo_updated'));

    const updatetable2 = {
      number:
        this.updatetableForm.value.TableNo_updated || this.selectedtable.number,
      guest_numbers:
        this.updatetableForm.value.guest_numbers_updated ||
        this.selectedtable.guest_numbers,
      status:
        this.updatetableForm.value.status_updated || this.selectedtable.status,
    };

    // console.log(updatetable.get('number'));
    // console.log(updatetable.get('guest_numbers'));
    // console.log(updatetable.get('status'));

    this.tableService.UpdateTable(updatetable2, idtable).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    // window.location.reload();
  }

  change_status(id_Product: any) {
    console.log(id_Product);

    this.tableService
      .change_status(id_Product)
      .subscribe((Response) => console.log(Response));
  }
}