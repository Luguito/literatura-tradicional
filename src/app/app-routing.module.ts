import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from './login-guard.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'blog', loadChildren: () => import('./blog/blog.component').then(m => m.BlogModule) },
  { path: 'login', loadChildren: () => import('./login/login.component').then(m => m.LoginModule) },
  { path: 'app', canActivate: [LoginGuardGuard], loadChildren: () => import('./layout/layout.component').then(m => m.LayoutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
