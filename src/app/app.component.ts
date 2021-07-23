import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: ` 
  <nav>
    <app-nav-bar></app-nav-bar>
  </nav>
  <main>
    <router-outlet></router-outlet>
  </main>
  <app-footer></app-footer>
 `
})
export class AppComponent {
  title = 'lit-universal';
}
