import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './nav-bar/nav-bar.component';
import { Footer } from './footer/footer.component';
import { InterceptorBlog } from '@services';

@NgModule({
  declarations: [
    AppComponent,
    Footer,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavBarModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorBlog,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
