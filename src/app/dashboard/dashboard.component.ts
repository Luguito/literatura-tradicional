import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogService, ObraService } from '../services';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms'
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    Object = Object;
    listBlog: Array<any>;
    listFilters: Array<any>;
    filterGroup: FormGroup = this.filtersForm;
    constructor(private blog: BlogService, private obService: ObraService, private fb: FormBuilder) { }

    ngOnInit() {
        this.obService.getFilters().toPromise().then(filters => {
            this.listFilters = filters.data;
            console.log(this.listFilters)
        });
        this.blog.getPost().toPromise().then(blog => {
            this.listBlog = blog.data['docs'];
        })
    }

    get filtersForm(): FormGroup {
        return this.fb.group({
            'type': [''],
            'genre': [''],
            'genreType': [],
            'narrativeProseType': [],
            'lyricProseType': [],
            'lyricVerseType': [],
            'country': [],
            'state': [],
            'city': [],
            'title': [],
        })
    }

    saveFilter(type: string, { target: { value } }) {
        this.filterGroup.get(type).setValue(value);
        console.log(this.filterGroup)
    }

    filtrarObras() {
        let obj = {};
        for (let key in this.filterGroup.controls) {
            if (this.filterGroup.get(key).value !== null && this.filterGroup.get(key).value.length > 0) {
                obj[key] = this.filterGroup.get(key).value
            }
        }
        console.log(obj)
        this.obService.postFilters(obj).subscribe(v => console.log(v))
    }
}

const routes: Routes = [
    { path: '', component: DashboardComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRouting { }

@NgModule({
    declarations: [DashboardComponent],
    imports: [DashboardRouting, CommonModule, ReactiveFormsModule, FormsModule],
    exports: [DashboardComponent]
})
export class DashboardModule { }