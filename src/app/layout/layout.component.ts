import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent } from '../posts/posts.component';
import { CommonModule } from '@angular/common';

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

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'posts', component: PostsComponent },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.component').then(m => m.DashboardModule) },
      { path: 'nueva-obra', loadChildren: () => import('../new-book/new-book.component').then(m => m.NewBookModule) },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRouting { }

@NgModule({
  imports: [LayoutRouting, CommonModule],
  exports: [],
  declarations: [LayoutComponent]
})
export class LayoutModule { }