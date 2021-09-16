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
  @Output() filtersApplied: EventEmitter<Object> = new EventEmitter();
  filterGroup: FormGroup = this.filtersForm;
  listFilters: any;
  citys: any;
  constructor(private fb: FormBuilder, private obService: ObraService) { }

  ngOnInit(): void {
    this.obService.getFilters().toPromise().then(filters => {
      this.listFilters = filters.data;
    });

    this.filterGroup.get('state').valueChanges.subscribe(city => {
      this.citys = this.listFilters['ciudades'].find(({ state }) => state == city).cities
    })
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
    });
  }

  saveFilter(type: string, { target: { value } }) {
    this.filterGroup.get(type).setValue(value);
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
@NgModule({
  imports: [MatProgressSpinnerModule, MatDividerModule, CommonModule],
  exports: [FiltersComponent],
  declarations: [FiltersComponent]
})
export class FiltersModule { }