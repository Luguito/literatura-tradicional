import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ObraService } from '../services/obras/obras.service'
import { CommonModule } from '@angular/common';
import { take, takeLast } from 'rxjs/operators';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  piecesId: any = []
  title: string;
  listPieces:Array<any>;
  listResults;
  constructor(private route: ActivatedRoute, private oS: ObraService) {
    this.route.params.subscribe(query => {
      this.title = (<string>query.type);
    });
    this.oS.researchPiece$.asObservable().pipe(take(1)).subscribe((pieces:Array<any>) => {
      this.listPieces = pieces;

      pieces.map(piece => {
        this.piecesId.push(piece._id)
      });
      
    });

    this.oS.getCountWords(this.piecesId).toPromise().then(v => {
      this.listResults = v.data.computed;
      console.log(this.listResults)
    });
  }

  ngOnInit(): void {
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