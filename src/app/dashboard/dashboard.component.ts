import { Component, NgModule, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
    displayedColumns = ['code', 'title', 'corpus', 'state', 'city', 'type'];
    loadingFilter: boolean = false;
    obrasSeletec: Array<any> = [];
    citys: Array<any>;
    checkAll: boolean = false;
    @ViewChild('details', { static: true }) details: TemplateRef<any>;
    constructor(private obService: ObraService, private dialog: MatDialog,
        private storage: StorageService, private mat: MatSnackBar, private fb: FormBuilder) { }

    ngOnInit() {
        this.storage.getPieces().subscribe(v => {
            this.listFiltered = v;
        })
     }

    filtrarObras(obj) {
        this.loadingFilter = true;

        this.mat.open('Filtrando Obras...', '...')

        this.obService.postFilters(obj).toPromise().then(v => {
            this.listBlog = v.data;
            this.listFiltered = v.data;
            this.storage.emittedPieces(v.data);
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

        this.storage.sendPieces({ pieces: this.obrasSeletec });
    }

    selectAllPieces() {
        let exist = this.listFiltered.length === this.obrasSeletec.length;

        this.mat.open(`${exist ? 'Deseleccionando' : 'Seleccionando'} Obras...`)

        this.listFiltered.map(piece => {
            piece.select = !exist;
        });

        !exist ? this.obrasSeletec.push(...this.listFiltered) : this.obrasSeletec = [];
        this.checkAll = !exist;

        this.storage.sendPieces({ pieces: this.obrasSeletec });
        setTimeout(() => { this.mat.dismiss(); }, 2000)
    }

    existPieceInArray(piece) {
        return { index: this.obrasSeletec.indexOf(piece), exist: this.obrasSeletec.indexOf(piece) !== -1 }
    }

    openDetails(piece) {
        this.dialog.open(this.details, {
            height: '800px',
            data: piece
        });
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
import { MatDividerModule } from '@angular/material/divider'
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FiltersModule } from '../filters/filters.component';
import { NewBookModule } from '../new-book/new-book.component';
import { StorageService } from '../storage.service';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
    declarations: [DashboardComponent],
    imports: [ScrollingModule, DashboardRouting, CommonModule, MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule, FiltersModule,
        NewBookModule, MatRippleModule, MatProgressSpinnerModule, MatSnackBarModule, ReactiveFormsModule, FormsModule, MatTableModule],
    exports: [DashboardComponent]
})
export class DashboardModule { }