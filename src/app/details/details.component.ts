import { Component, OnInit, NgModule, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObraService } from '../services/obras/obras.service';
import { CommonModule } from '@angular/common';
import { FiltersModule } from '../filters/filters.component'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() piece;
  pieceId: string;
  constructor(private route: ActivatedRoute, private ob: ObraService) {
    this.route.params.subscribe(async (param) => {
      this.pieceId = param.id
    })
  }

  ngOnInit(): void {
    !this.piece ? this.getDetail() : null;
  }

  async getDetail() {
    try {
      this.piece = await (await this.ob.getDetail(this.pieceId).toPromise()).data;
    } catch (e) {
      console.error(e)
    }
  }
}

@NgModule({
  imports: [CommonModule, FiltersModule],
  declarations: [DetailsComponent],
  exports: [DetailsComponent]
})
export class DetailsModule { }