import { CashierModule } from './cashier/cashier.module';
import { CustomerModule } from './customer/customer.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WaiterModule } from './waiter/waiter.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterModule } from './register/register.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';
import { HomeModule } from './home/home.module';
import { HttpInterceptorInterceptor } from './helpers/http.interceptor';
import { NotfoundComponent } from './notfound/notfound.component';
import { StripesystemModule } from './stripesystem/stripesystem.module';

import { TextMutedPipe } from './pipes/text-muted.pipe';
@NgModule({
  declarations: [AppComponent, NotfoundComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    RegisterModule,
    NgbModule,
    WaiterModule,
    RegisterModule,
    AdminModule,
    CustomerModule,
    CashierModule,
    HomeModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true
    }
    // NgxPaginationModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
