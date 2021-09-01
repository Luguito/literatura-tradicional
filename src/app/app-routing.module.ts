import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'inicio', component: HomeComponent },
  //{ path: 'proyecto', component: ProjectComponent },
  { path: 'login', loadChildren: () => import('./login/login.component').then(m => m.LoginModule) },
  { path: 'app', loadChildren: () => import('./layout/layout.component').then(m => m.LayoutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
