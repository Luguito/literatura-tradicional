import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

declare let Quill;
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  newPost: FormGroup = this.newPostGroup;
  showLoading: boolean = false;
  editor;
  file;
  fruits: Fruit[] = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  constructor(private fb: FormBuilder, private blogS: BlogService) { }

  get newPostGroup() {
    return this.fb.group({
      'title': [],
      'image': [],
      'status': [],
      'type': [],
      'tags': this.fb.array([]),
      'content': []
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
    this.newPost.get('image').setValue(this.file);

    this.blogS.createPost(this.newPost.getRawValue()).toPromise().then(v => {
      this.showLoading = false;
      console.log(v)
    })
  }

  uploadFile() {
    let input = document.createElement('input');
    input.type = 'file';

    input.click();

    input.onchange = (e) => {
      this.file = (<HTMLInputElement>e['path'][0]).files[0];
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
      (this.newPost.get('tags') as FormArray).push(this.fb.control(value));
    }

    // Clear the input value
    event.input!.value = '';
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      (this.newPost.get('tags') as FormArray).removeAt(index);
    }
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
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { BlogService } from '../services';
@NgModule({
  imports: [CommonModule, MatChipsModule, MatIconModule, NewPostRouting, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatRippleModule, ReactiveFormsModule],
  declarations: [NewPostComponent],
  exports: [NewPostComponent]
})
export class NewPostModule { }

export interface Fruit {
  name: string;
}