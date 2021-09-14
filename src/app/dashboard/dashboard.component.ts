import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogService, ObraService } from '../services';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    Object = Object;
    listBlog: Array<any>;
    listFiltered: Array<any>;
    listFilters: Array<any>;
    filterGroup: FormGroup = this.filtersForm;
    displayedColumns = ['code', 'title', 'corpus', 'state', 'city', 'type'];
    loadingFilter: boolean = false;
    obrasSeletec: Array<any> = [];
    constructor(private obService: ObraService,
        private mat: MatSnackBar, private fb: FormBuilder) { }

    ngOnInit() {
        this.obService.getFilters().toPromise().then(filters => {
            this.listFilters = filters.data;
        });
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
    }

    filtrarObras() {
        this.loadingFilter = true;
        this.mat.open('Filtrando Obras...', '...')
        let obj = {};
        for (let key in this.filterGroup.controls) {
            if (this.filterGroup.get(key).value !== null && this.filterGroup.get(key).value.length > 0) {
                obj[key] = this.filterGroup.get(key).value
            }
        }
        if (Object.keys(obj).length === 0) return;
        this.obService.postFilters(obj).toPromise().then(v => {
            this.listBlog = v.data;
            this.listFiltered = v.data;
        }).then(() => {
            this.loadingFilter = false;
            this.mat.dismiss();
        })
    }

    filterbySearch({ target: { value } }) {
        if (value === '') return this.listFiltered = this.listBlog;

        this.listFiltered = [...new Set([
            ...this.listBlog.filter(obra => obra.title.toLowerCase().startsWith(value.toLowerCase())),
            ...this.listBlog.filter(obra => obra.code.toLowerCase().startsWith(value.toLowerCase()))
        ])]
    }

    selectOnePiece(piece) {
        let { exist, index } = this.existPieceInArray(piece);

        piece.select = !exist;

        !exist ? this.obrasSeletec.push(piece) : this.obrasSeletec.splice(index, 1);
    }

    selectAllPieces() {
        this.mat.open('Seleccionando obras...', '...')
        let exist = this.listFiltered.length === this.obrasSeletec.length;

        this.listFiltered.map(piece => {
            piece.select = !exist;
        });

        !exist ? this.obrasSeletec.push(...this.listFiltered) : this.obrasSeletec = [];

        setTimeout(() => { this.mat.dismiss(); }, 2000)
    }

    existPieceInArray(piece) {
        return { index: this.obrasSeletec.indexOf(piece), exist: this.obrasSeletec.indexOf(piece) !== -1 }
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


import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [DashboardComponent],
    imports: [DashboardRouting, CommonModule, MatButtonModule, MatIconModule,
        MatRippleModule, MatProgressSpinnerModule, MatSnackBarModule, ReactiveFormsModule, FormsModule, MatTableModule],
    exports: [DashboardComponent]
})
export class DashboardModule { }