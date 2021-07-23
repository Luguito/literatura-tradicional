import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-nav-bar',
    styleUrls: ['./nav-bar.component.scss'],
    templateUrl: './nav-bar.component.html'
})
export class NavBar implements OnInit {
    constructor() { };

    ngOnInit() {

    };
}

@NgModule({
    imports: [RouterModule],
    declarations: [NavBar],
    exports: [NavBar]
})
export class NavBarModule { }