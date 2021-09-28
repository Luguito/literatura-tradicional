import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ObraService } from '../services/obras/obras.service'
import { CommonModule } from '@angular/common';
import { StorageService } from '../storage.service';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  modalRef: MatDialogRef<any>;
  constructor(private route: ActivatedRoute, private oS: ObraService, private storage: StorageService,
    private mat: MatDialog, private router:Router) {
    this.route.params.subscribe(query => {
      this.title = (<string>query.type).split('-').join(' ');
    });
  }

  async ngOnInit() {
    this.storage.getResults().subscribe(v => {
      this.listPieces = v.pieces;
      this.listResults = v.results;
    });
  }

  goBack() {
    window.history.back();
  }

  openModal(template: TemplateRef<any>, data) {
    this.modalRef = this.mat.open(template, {
      data
    })
  }

  goToDetails(data){
    this.router.navigateByUrl('app/details/'+ data._id).then(() => {
      this.modalRef.close()
    })
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