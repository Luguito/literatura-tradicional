import { Component, NgModule, OnInit} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BlogService } from '@services';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
    listBlog: Array<any>;
    constructor(private blog:BlogService) { }

    ngOnInit(){
        this.blog.getPost().toPromise().then(blog => {
            this.listBlog = blog.data['docs'];
            console.log(blog)
        })
    }
}

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'home', component: HomeComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRouting { }

@NgModule({
    declarations: [DashboardComponent],
    imports: [DashboardRouting, CommonModule],
    exports: [DashboardComponent]
})
export class DashboardModule { }