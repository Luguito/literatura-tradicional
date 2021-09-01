import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('HOLA')
  }

}

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'dashboard', component:LayoutComponent, loadChildren: () => import('../dashboard/dashboard.component').then(m => m.DashboardModule) },
    { path: 'nueva-obra', loadChildren: () => import('../new-book/new-book.component').then(m => m.NewBookModule) }
  ])],
  exports: [RouterModule]
})
export class LayoutRouting { }

@NgModule({
  imports: [LayoutRouting],
  exports: [],
  declarations: [LayoutComponent]
})
export class LayoutModule { }