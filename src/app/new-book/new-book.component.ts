import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: NewBookComponent }
  ])],
  exports: [RouterModule]
})
export class NewBookRouting { }

@NgModule({
  imports: [NewBookRouting, CommonModule],
  exports: [],
  declarations: [NewBookComponent]
})
export class NewBookModule { }