import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
declare let Quill;
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  newPost: FormGroup = this.newPostGroup;
  showLoading:boolean = false;
  editor;
  constructor(private fb: FormBuilder, private blogS: BlogService) { }

  get newPostGroup() {
    return this.fb.group({
      'title': ['asdasd'],
      'image': ['asdasd'],
      'status': ['post'],
      'type': ['active'],
      'tags': this.fb.array(['asdas']),
      'content': ['asdasd']
    })
  }

  ngOnInit(): void {
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
    this.editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      }
    });
  }

  savePost() {
    this.showLoading = true;
    this.newPost.get('content').setValue(this.editor.getText());
    console.log(this.newPost.getRawValue())
    this.blogS.createPost(this.newPost.getRawValue()).toPromise().then(v => {
      this.showLoading = false;
      console.log(v)
    })
  }
}

const routes: Routes = [
  {
    path: '', component: NewPostComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPostRouting { }

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { BlogService } from '../services';
@NgModule({
  imports: [CommonModule, NewPostRouting, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatRippleModule, ReactiveFormsModule],
  declarations: [NewPostComponent],
  exports: [NewPostComponent]
})
export class NewPostModule { }