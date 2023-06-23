import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WaiterComponent } from "./waiter/waiter.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "register",
    pathMatch: "full",
  },
  {
    path: "home",
    component: WaiterComponent,
  },
  {
    path: "Waiter",
    loadChildren: () =>
      import("./waiter/waiter.module").then((m) => m.WaiterModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
