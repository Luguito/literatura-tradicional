import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input('edit') filtersEdit;
  @Input('buttons') showButton;
  @Output() filtersApplied: EventEmitter<Object> = new EventEmitter();
  filterGroup: FormGroup = this.filtersForm;
  listFilters: any;
  constructor(private fb: FormBuilder, private obService: ObraService) { }

  async ngOnInit(): Promise<void> {
    await this.obService.getFilters().toPromise().then(filters => {
      this.listFilters = filters.data;
    });

    this.filtersEdit && this.setEditFilter();
  }

  get filtersForm(): FormGroup {
    return this.fb.group({
      'type': [null],
      'genre': [null],
      'genreType': [null],
      'narrativeProseType': [null],
      'lyricProseType': [null],
      'lyricVerseType': [null],
      'country': [null],
      'state': [null],
      'city': [null],
      'title': [null],
    });
  }

  setEditFilter() {
    this.filterGroup.patchValue(this.filtersEdit);
    this.filterGroup.get('country').reset(this.filtersEdit.country);
    this.filterGroup.get('state').setValue(this.filtersEdit.state);
    this.filterGroup.get('city').setValue(this.filtersEdit.city);
  }

  saveFilters(filters){
    this.filtersApplied.next(filters)
  }

  clearFilters(){
    this.filterGroup.reset();
  }
}
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider'
import { ObraService } from '../services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { LocationModule } from './location/location.component';
@NgModule({
  imports: [MatProgressSpinnerModule, ReactiveFormsModule, MatDividerModule, CommonModule, LocationModule],
  exports: [FiltersComponent],
  declarations: [FiltersComponent]
})
export class FiltersModule { }