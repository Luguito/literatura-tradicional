import { Component, OnInit, Output, EventEmitter, NgModule, Input } from '@angular/core';
import { ObraService } from '../../services/obras/obras.service'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
    @Input() filters;
    @Input() showButton;
    @Output() locationOutput: EventEmitter<any> = new EventEmitter();
    @Output() clear: EventEmitter<any> = new EventEmitter();
    locationGroup: FormGroup = this.buildGroup;
    locationList: Object;
    showLoading: boolean = false;
    city: Array<any>;
    entireFilters: FormGroup = this.filtersForm;
    constructor(private ob: ObraService, private fb: FormBuilder) { }

    async ngOnInit() {
        await this.getLocationFilters();
        this.locationGroup.get('state').valueChanges.subscribe(city => {
            this.city = this.locationList['ciudades'].find(({ state }) => state == city).cities
        });
    }

    async getLocationFilters() {
        try {
            this.locationList = await (await this.ob.getLocationFilters().toPromise()).data;
        } catch (e) {
            console.error(e)
        }
    }

    get buildGroup(): FormGroup {
        return this.fb.group({
            'country': [],
            'state': [],
            'city': []
        });
    }

    saveFilters() {
        let obj = {};

        this.entireFilters.patchValue(this.filters);
        this.entireFilters.patchValue(this.locationGroup.getRawValue());

        for (let key in this.entireFilters.controls) {
            if (this.entireFilters.get(key).value !== null && this.entireFilters.get(key).value.length > 0) {
                obj[key] = this.entireFilters.get(key).value
            }
        }
        if (Object.keys(obj).length === 0) return;

        this.locationOutput.emit(obj)
    }

    clearFilters() {
        this.locationGroup.reset();
        this.clear.emit()
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
}

import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatRippleModule, MatProgressSpinnerModule, ReactiveFormsModule],
    exports: [LocationComponent],
    declarations: [LocationComponent]
})
export class LocationModule { }