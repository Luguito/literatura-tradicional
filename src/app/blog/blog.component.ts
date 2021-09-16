import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { HomeComponent } from '../home/home.component';
import { ProjectComponent } from '../project/project.component';
import { NavBarModule } from '../nav-bar/nav-bar.component';
import { Footer } from '../footer/footer.component';
const routes: Routes = [
  {
    path: '', component: BlogComponent, children: [
      { path: '', redirectTo: 'inicio' },
      { path: 'inicio', component: HomeComponent },
      { path: 'proyecto', component: ProjectComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

@NgModule({
  imports: [BlogRoutingModule, NavBarModule],
  declarations: [BlogComponent, Footer],
  exports: [BlogComponent]
})
export class BlogModule { }