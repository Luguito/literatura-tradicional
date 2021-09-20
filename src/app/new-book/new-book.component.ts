import { Component, OnInit, NgModule, Input } from '@angular/core';
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
  showLoading: boolean = false;
  pieceForm: FormGroup = this.pieceGroup;
  $context = {}
  @Input() piece;
  title: string; 
  constructor(private fb: FormBuilder, private blog:ObraService) { }

  ngOnInit(): void {
    this.title = this.piece ? 'Editar' : 'Agregar';
    this.initEdit();
    this.piece && this.editMode();
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

  get pieceGroup() {
    return this.fb.group({
      "type": [],
      "genre": [],
      "genreType": [],
      "title": [],
      "corpus": [],
      "informant": this.fb.group({
        "name": [],
        "age": [],
        "location": this.fb.group({
          "country": [],
          "state": [],
          "city": []
        })
      }),
      "gatherer": [localStorage.getItem('user')],
      "location": {
        "country": [],
        "state": [],
        "city": []
      },
      "source": this.fb.group({
        "type": [],
        "isText": this.fb.group({
          "reference": [],
          "volume": [],
          "title": [],
          "author": [],
          "year": [],
          "editorial": [],
          "link": []
        }),
        "isDigital": this.fb.group({
          "title": [],
          "author": [],
          "year": [],
          "publicationPlace": [],
          "link": []
        })
      }),
      "isLyric": true,
      "lyricVerseType": [""],
      "lyricProseType": [""],
      "isNarrative": true,
      "narrativeVerseType": [""]
    })
  }

  settingTypePiece(event) {
    this.pieceForm.patchValue(event);
    this.pieceForm.get('location').setValue({
      'city': event.city,
      'state': event.state,
      'country': event.country
    });

    if (event.genre !== 'Lírica') {
      this.pieceForm.get('isNarrative').setValue(true)
      this.pieceForm.get('isLyric').setValue(false)
    } else {
      this.pieceForm.get('isNarrative').setValue(false)
      this.pieceForm.get('isLyric').setValue(true)
    }
  }

  editMode(){
    this.piece && this.pieceForm.patchValue(this.piece);
    this.editor.setText(this.piece['corpus']);

    console.log(this.pieceForm.getRawValue())
  }

  savePiece() {
    this.showLoading = true;

    this.pieceForm.get('corpus').setValue(this.editor.getText());
    if(this.pieceForm.get('source.type').value !== 'Texto'){
      this.pieceForm.get('title').setValue(this.pieceForm.get('source.isDigital.title').value)
    } else {
      this.pieceForm.get('title').setValue(this.pieceForm.get('source.isText.title').value)
    }
    this.pieceForm.get('lyricProseType').setValue("")
    this.blog.createPiece(this.pieceForm.getRawValue()).subscribe(v => {
      console.log(v)
      this.showLoading = false;
    })
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
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { BlogService } from '../services';
@NgModule({
  imports: [NewBookRouting, CommonModule, FiltersModule, MatProgressSpinnerModule, ReactiveFormsModule, FormsModule],
  exports: [NewBookComponent],
  declarations: [NewBookComponent]
})
export class NewBookModule { }