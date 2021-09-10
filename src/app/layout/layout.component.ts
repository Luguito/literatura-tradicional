import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  dummyData = [
    { name: 'Francsico', lastname: 'Gomez' },
    { name: 'Francsico', lastname: 'Gomez' },
    { name: 'Francsico', lastname: 'Gomez' },
    { name: 'Francsico', lastname: 'Gomez' },
    { name: 'Francsico', lastname: 'Gomez' },
    { name: 'Francsico', lastname: 'Gomez' },
    { name: 'Francsico', lastname: 'Gomez' },
  ]
  userForm: FormGroup = this.userGroup;
  constructor(private dialog: MatDialog, private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  openDialog(template) {
    this.getListUsers()
    this.dialog.open(template, {
      width: '800px'
    })
  }

  openCreateUser(template) {
    this.dialog.open(template, {
      width: '800px'
    })
  }

  async getListUsers() {
    this.userService.listUser().toPromise().then(v => console.log(v))
  }

  get userGroup() {
    return this.fb.group({
      'fullname': [],
      'email': [, Validators.email]
    })
  }
  saveUser(){
    this.userService.inviteUser(this.userForm.getRawValue()).subscribe(console.log)
  }
}

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'posts', component: PostsComponent },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.component').then(m => m.DashboardModule) },
      { path: 'nueva-obra', loadChildren: () => import('../new-book/new-book.component').then(m => m.NewBookModule) },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRouting { }


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core'
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { UserService } from '../services';
@NgModule({
  imports: [LayoutRouting, CommonModule, MatIconModule, MatInputModule,
    MatRippleModule, ReactiveFormsModule, MatSidenavModule, MatDialogModule],
  exports: [],
  declarations: [LayoutComponent]
})
export class LayoutModule { }