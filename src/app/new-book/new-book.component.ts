import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObraService } from '../services/obras/obras.service';
import { FiltersModule } from '../filters/filters.component';
declare let Quill;
@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {
  editor;
  showLoading:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.initEdit()
  }

  initEdit() {
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // toggled buttons
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ];
    this.editor = new Quill('#editor2', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      }
    });
  }

  savePiece() {
    this.showLoading = true;

    // setTimeout(()=> {
    //   this.showLoading = false
    // },3000)
  }
}

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: NewBookComponent }
  ])],
  exports: [RouterModule]
})
export class NewBookRouting { }

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  imports: [NewBookRouting, CommonModule, FiltersModule, MatProgressSpinnerModule],
  exports: [NewBookComponent],
  declarations: [NewBookComponent]
})
export class NewBookModule { }