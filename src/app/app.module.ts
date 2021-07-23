import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './nav-bar/nav-bar.component';
import { Footer } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
