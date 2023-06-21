import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'student-form', component: StudentFormComponent },
  { path: `student-form/:id`, component: StudentFormComponent },
  { path: 'productList', component: ProductListComponent },
  { path: 'productList/product-form', component: ProductFormComponent },
  { path: 'productList/product-form/:id', component: ProductFormComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/order-form', component: OrderFormComponent },
  { path: 'orders/order-form/:id', component: OrderFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
