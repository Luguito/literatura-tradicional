import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'inicio', component: HomeComponent },
  //{ path: 'proyecto', component: ProjectComponent },
  { path: 'login', loadChildren: () => import('./login/login.component').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.component').then(m => m.DashboardModule) },
  { path: 'nueva-obra', loadChildren: () => import('./new-book/new-book.component').then(m => m.NewBookModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
