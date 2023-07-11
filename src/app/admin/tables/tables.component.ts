import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TablesService } from 'src/app/services/tables.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent {
  guest_numbers: any;
  Tables!: any;
  TableNo!: any;
  status: any;
  tableForm!: FormGroup;
  idtable!: number;
  selectedtable: any = {};
  updatetableForm!: FormGroup;
  tabless!: any[];
  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;
  
//   totalLength:any;
//   p:number=1;
//  itemsPerPage:number= 7
  // ngOnInit():void{

  // }

  // @ViewChild('addfileInput', { static: false }) addfileInput!: ElementRef;
  @ViewChild('addTables', { static: false }) addTables!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private tableService: TablesService, // private getCatService: GetDataService,
    private router: Router
  ) {}
   

  ngOnInit() {
    //call the all table
    this.getAllTable();
    // this.getAllTABLE();
    // to add  tableForm
    this.tableForm = this.fb.group({
      TableNo: ['', [Validators.required]],
      guest_numbers: ['', [Validators.required]],
      // status: [true],
    });

    this.updatetableForm = this.fb.group({
      TableNo_updated: ['', [Validators.required]],
      guest_numbers_updated: ['', [Validators.required]],
      // status_updated: ['', [Validators.required]],
    });
    
  

  }
 
    // loadData() {
    //   this.tableService.getData().subscribe((data) => {
    //     this.table = data;
    //   });
    // }
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
            this.tableService.getTable().subscribe({
              next: (res: any) => {
                (this.Tables = res.data), console.log(res);
                Swal.fire({
                  icon: 'success',
                  title: res.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.getAllTable()
              },
              error: (err: any) => {
                console.log(err);
                Swal.fire({
                  icon: 'error',
                  title: 'The number has already been taken',
                  showConfirmButton: false,
                  timer: 1500,
                });
              },
             
            });
          ;},
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
        this.TableNo = res.data;
        // this.totalLength=res.data.length;

      },
      error: (err: any) => {
        console.log(err);
      },
     
    });
   
  }

  //GET THE ID OF THE OBJECT
  getIdtable(idtable: any) {
    //Call The Old Category
    console.log(idtable);
    console.log('idtable',idtable);
    
    this.tableService.getOldTable(idtable).subscribe((Response: any) => {
      this.selectedtable = Response.data;
      console.log(this.selectedtable.number);
      TableNo_updated.value = this.selectedtable.number;
      guest_numbers_updated.value = this.selectedtable.guest_numbers;
    });

    this.idtable = idtable;

    let TableNo_updated = document.getElementById(
      'TableNo_updated'
    ) as HTMLInputElement;
    console.log(TableNo_updated);
    
    let guest_numbers_updated = document.getElementById(
      'guest_numbers_updated'
      ) as HTMLInputElement;
      console.log(guest_numbers_updated);
      
    console.log(TableNo_updated.value);
  }

  updatetable(idtable: any) {
    this.tableService.getOldTable(idtable).subscribe((Response: any) => {
      this.selectedtable = Response.data;
      console.log(this.selectedtable.TableNo);
    
    });
   
    const updatetable2 = {
      number:
        this.updatetableForm.value.TableNo_updated || this.selectedtable.number,
      guest_numbers:
        this.updatetableForm.value.guest_numbers_updated ||
        this.selectedtable.guest_numbers,
      status:
        this.updatetableForm.value.status_updated || this.selectedtable.status,
    };

    this.tableService.UpdateTable(updatetable2, idtable).subscribe(
      (response) => {
        console.log(response);
        this.getAllTable();
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });

      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  change_status(id_Product: any) {
    console.log(id_Product);

    this.tableService
      .change_status(id_Product)
      .subscribe((Response) => console.log(Response));
  }
  getAllTABLE() {
    this.tableService.getTablePagination(this.pageNumber).subscribe(
      (response: any) => {
        this.tabless = response.data;
        this.totalItems = response.total;
        this.pageSize = response.per_page;
        console.log(this.totalItems);

        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
     }
    // onPageChange(event: any) {
      
    //   console.log(event);
  
    //   this.pageNumber = event;
      
    //   this.getAllTABLE();
    // }
 

}
