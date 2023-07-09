import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CategoryService } from 'src/app/services/category.service';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-statistcs',
  templateUrl: './statistcs.component.html',
  styleUrls: ['./statistcs.component.css']
})
export class StatistcsComponent {

  users: any;
  products: any;
  reservation: any;
  customers: any;
  categories: any;
  tables: any;
  errors: any = [];

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private reservationService: ReservationService,
    private customerService: CustomerService,
    private categoryService: CategoryService,
    private tablesService: TablesService
  ){}


  ngOnInit() {
    this.getProducts();
    this.getReservation();
    this.getUsers();
    this.getCategories();
    this.getTables();
  }

  getProducts() {
    this.productsService.getAllProduct().subscribe({
      next: (res: any) => {
        this.products = res.total;
        console.log(res.total);
      },
      error: (err: any) => {
        this.errors = err
      }
    })
  }
  getReservation() {
    this.reservationService.getAllResevations().subscribe({
      next: (res: any) => {
        this.reservation = res.data.total;
        console.log(res.data.total);
      },
      error: (err: any) => {
        this.errors = err
      }
    })
  }
  // getCustomers() {
  //   this.customerService..subscribe({
  //     next: (res: any) => {
  //       this.reservation = res.data.data.length;
  //       console.log(res.data.data.length);
  //     },
  //     error: (err: any) => {
  //       this.errors = err
  //     }
  //   })
  // }
  getUsers() {
    this.usersService.listUsers().subscribe({
      next: (res: any) => {
        this.users = res.meta.total;
        console.log(res.meta.total);
      },
      error: (err: any) => {
        this.errors = err
      }
    })
  }


  getCategories() {
    this.categoryService.getCategory().subscribe({
      next: (res: any) => {
        this.categories = res.meta.total;
        console.log(res.meta.total);
      },
      error: (err: any) => {
        this.errors = err
      }
    })
  }

  getTables() {
    this.tablesService.getTable().subscribe({
      next: (res: any) => {
        this.tables = res.meta.total;
        console.log(res.meta.total);
      },
      error: (err: any) => {
        this.errors = err
      }
    })
  }
}
