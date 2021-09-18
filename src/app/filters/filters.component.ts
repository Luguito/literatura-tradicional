import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() showButton: boolean;
  @Input('loading') showLoading: boolean;
  @Input('edit') filtersEdit;
  @Output() filtersApplied: EventEmitter<Object> = new EventEmitter();
  filterGroup: FormGroup = this.filtersForm;
  listFilters: any;
  citys: any;
  constructor(private fb: FormBuilder, private obService: ObraService) { }

  ngOnInit(): void {
    this.obService.getFilters().toPromise().then(filters => {
      console.log(filters)
      this.listFilters = filters.data;
    });

    this.filtersEdit && this.setEditFilter();

    this.filterGroup.get('state').valueChanges.subscribe(city => {
      this.citys = this.listFilters['ciudades'].find(({ state }) => state == city).cities
    });

    !this.showButton && this.filterGroup.get('city').valueChanges.subscribe(city => {
      this.filtersApplied.next(this.filterGroup.getRawValue());
    });
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

  saveFilter(type: string, { target: { value } }) {
    this.filterGroup.get(type).setValue(value);
  }

  setEditFilter(){
    this.filterGroup.patchValue(this.filtersEdit);
    this.filterGroup.get('country').reset(this.filtersEdit.country);
    this.filterGroup.get('state').setValue(this.filtersEdit.state);
    this.filterGroup.get('city').setValue(this.filtersEdit.city);
    console.log(this.filterGroup)
  }

  sendFilters() {
    let obj = {};

    for (let key in this.filterGroup.controls) {
      if (this.filterGroup.get(key).value !== null && this.filterGroup.get(key).value.length > 0) {
        obj[key] = this.filterGroup.get(key).value
      }
    }
    if (Object.keys(obj).length === 0) return;
    
    this.filtersApplied.next(obj);
  }
}
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ObraService } from '../services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
@NgModule({
  imports: [MatProgressSpinnerModule, ReactiveFormsModule, MatDividerModule, CommonModule],
  exports: [FiltersComponent],
  declarations: [FiltersComponent]
})
export class FiltersModule { }