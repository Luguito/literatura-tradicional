import { Component, OnInit, NgModule, TemplateRef, OnDestroy} from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ObraService } from '../services/obras/obras.service'
import { CommonModule } from '@angular/common';
import { StorageService } from '../storage.service';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { take, takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  piecesId: any = []
  title: string;
  listPieces = [];
  listResults = [];
  modalRef: MatDialogRef<any>;
  constructor(private route: ActivatedRoute, private oS: ObraService, private storage: StorageService,
    private mat: MatDialog, private router: Router) {
    this.route.params.subscribe(query => {
      this.title = (<string>query.type).split('-').join(' ');
    });
    window.addEventListener('clearResults', () => {
      this.listPieces = [];
      this.listResults = [];
    })
  }

  async ngOnInit() {
    this.storage.getResults().subscribe(v => {
      this.listPieces = v.pieces;
      this.listResults = v.results;
    });
    if(localStorage.getItem('result')) {
      let result = JSON.parse(localStorage.getItem('result'));
      this.listResults = result['results'];
      this.listPieces = result['pieces'];
    }
  }

  ngOnDestroy() {
    if(localStorage.getItem('result')) {
      localStorage.removeItem('result');
    }
  }

  goBack() {
    window.history.back();
  }

  openModal(template: TemplateRef<any>, data) {
    this.modalRef = this.mat.open(template, {
      data
    })
  }

  goToDetails(data) {
    this.router.navigateByUrl('app/details/' + data._id).then(() => {
      this.modalRef.close()
    })
  }

  /**
   * @description Download results of pieces analized
   */
  exportResults() {
    let csvResult = [...this.listResults.map(result => [
      result.item,
      result.frequency
    ])]

    let csvContent = "data:text/csv;charset=utf-8," + csvResult.map(e => e.join(",")).join("\n");

    let encoded = encodeURI(csvContent);

    var link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", "resultados.csv");
    document.body.appendChild(link);

    link.click();
  }
}

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ResultsComponent }
  ])],
  exports: [RouterModule]
})
export class ResultsRouting { }

@NgModule({
  imports: [ResultsRouting, CommonModule, MatDialogModule, MatButtonModule],
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
})
export class ResultsModule { }