import { Component, OnInit, NgModule, NgZone } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ObraService } from '../services/obras/obras.service'
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';
import { StorageService } from '../storage.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  piecesId: any = []
  title: string;
  listPieces = [];
  listResults = [];
  constructor(private route: ActivatedRoute, private oS: ObraService, private storage: StorageService, private ngZone: NgZone) {
    this.route.params.subscribe(query => {
      this.title = (<string>query.type).split('-').join(' ');
    });
  }

  async ngOnInit() {
    this.storage.getResults().subscribe(v => {
      this.listPieces = v.pieces;
      this.listResults = v.results;
    })
  //   this.storage.getResults().subscribe(async ({ pieces, count, method, text }) => {
  //     console.log(
  //       JSON.stringify(pieces)
  //     )
  //     this.listPieces = pieces;

  //   pieces.pieces.map(piece => {
  //     this.piecesId.push(piece._id)
  //   });

  //   await this.oS[method]({ pieces: this.piecesId, count: Number(count), text }).toPromise().then(v => {
  //     this.listResults = v.data.computed;
  //     console.log(this.listResults)
  //   });
  //   console.log(this.listResults)
  // });
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
  imports: [ResultsRouting, CommonModule],
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
})
export class ResultsModule { }