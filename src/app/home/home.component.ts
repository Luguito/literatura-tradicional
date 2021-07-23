import { Component, OnInit, NgModule } from '@angular/core';

@Component({
    selector: 'app-home',
    styleUrls: ['home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor() { };

    ngOnInit() {
        console.log('hola')
    };
}


/**
 * 
 * Modules
 * 
 */

import { NavBarModule } from '../nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [NavBarModule, RouterModule],
    declarations: [HomeComponent],
    exports: [],
})
export class HomeModule { }