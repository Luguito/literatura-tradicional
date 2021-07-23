import {Component, OnInit, NgModule} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class Footer implements OnInit{
    constructor(){}

    ngOnInit(){
        console.log('Hola Footer')
    }
}