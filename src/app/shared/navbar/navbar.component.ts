import { Component } from '@angular/core';
import { TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from 'src/app/services/register.service';
import { StorgeTokenService } from 'src/app/services/storge-token.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  
  loggedIn: any;


  constructor(
    private offcanvasService: NgbOffcanvas,
    private storageService: StorgeTokenService,
    private route: Router,
    private registerService: RegisterService
  ) {}
    
    login() {
      return this.storageService.isLoggedIn();
    }

    checkRole() {
      const user = this.storageService.getUser();
      let userRole = '';
      if (user && user.user && user.user.role) {
        switch(user.user.role) {
          case 'Admin':
            userRole = 'Admin';
            break;
            case 'Waiter':
            userRole = 'Waiter';
            break;
            case 'Cashier':
              userRole = 'Cashier';
            break;
          case 'Kitchen':
            userRole = 'Kitchen';
            break;
          default:
            console.log('Unknown role:', user.user.role);
            break;
        }
      }
      return userRole;
    }

    logout() {
      const user = this.storageService.getUser();
      if(user.user.role) {
        this.registerService.logoutStaff().subscribe({
          next: (res: any) => {
            this.route.navigate(['/register/staff-login']);
            this.storageService.logout();
            console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
      } else {
        this.registerService.logoutCustomer().subscribe({
          next: (res: any) => {
            this.route.navigate(['/register/login']);
              this.storageService.logout();
              console.log(res);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
      
    }


  //offcanvas ng-bootstrap
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
