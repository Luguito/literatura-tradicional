import { Component, OnInit, NgModule, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss']
})
export class PercentageComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() results: EventEmitter<any> = new EventEmitter()
  obras: Array<any>;
  select: Array<any>;
  constructor(private oService: ObraService, private router: Router,
    @Inject(MAT_DIALOG_DATA) private selecteds, private mat: MatSnackBar, private storage: StorageService) { }

  ngOnInit(): void { }

  filtrarObras(obj) {
    this.mat.open('Filtrando Obras...', '...')

    this.oService.postFilters(obj).toPromise().then(v => {
      this.obras = v.data;
      this.storage.emittedPieces(v.data);
    }).then(() => {
      this.mat.dismiss();
    })
  }

  selectOnePiece(obra) {
    this.select = [];

    this.select.push(obra);
  }

  async searchPercentaje() {
    this.mat.open("Analizando Obras...");

    try {
      let pieces = this.selecteds.map(({ _id }) => _id);
      let piece = this.select[0]._id;

      let res = await this.oService.getPercentagesMatch({ pieces, piece }).toPromise();

      localStorage.setItem('result', JSON.stringify({ results: res.data.computed, pieces: this.select }))
      this.storage.sendResults({ results: res.data.computed, pieces: this.select });
      this.router.navigate(["../app/analisis-obra/porcentaje-de-coincidencia"]).then(() => {
        this.closeModal.emit();
      })
    } catch (e) {
      console.error(e)
    } finally {
      this.mat.dismiss();
    }
  }
}

import { CommonModule } from '@angular/common';
import { FiltersModule } from '../filters/filters.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ObraService } from '../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, FiltersModule, ScrollingModule, MatButtonModule],
  declarations: [PercentageComponent],
  exports: [PercentageComponent]
})
export class PercentageModule { }