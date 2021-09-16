import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  dummyData;
  userForm: FormGroup = this.userGroup;
  userDialogRef: MatDialogRef<any>;
  usersDialogRef: MatDialogRef<any>;
  user: string = localStorage.user ?? 'Camilo Sanchez';
  panelOpenState: boolean = false;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  openDialog(template) {
    this.getListUsers()
    this.usersDialogRef = this.dialog.open(template, {
      width: '800px'
    })
  }

  openCreateUser(template) {
    this.userDialogRef = this.dialog.open(template, {
      width: '800px'
    })
  }

  async getListUsers() {
    this.userService.listUser().toPromise().then(v => {
      this.dummyData = v['data'];
    })
  }

  get userGroup() {
    return this.fb.group({
      'fullname': [],
      'email': [, Validators.email]
    })
  }
  saveUser() {
    this.userService.inviteUser(this.userForm.getRawValue()).subscribe(v => {
      this.userDialogRef.close();
      this.getListUsers();
    })
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'posts', component: PostsComponent },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.component').then(m => m.DashboardModule) },
      { path: 'nueva-obra', loadChildren: () => import('../new-book/new-book.component').then(m => m.NewBookModule) },
      { path: 'nuevo-post', loadChildren: () => import('../new-post/new-post.component').then(m => m.NewPostModule) }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRouting { }


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core'
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { UserService } from '../services';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [LayoutRouting, CommonModule, MatIconModule, MatInputModule, MatExpansionModule,
    MatRippleModule, ReactiveFormsModule, MatSidenavModule, MatDialogModule],
  exports: [],
  declarations: [LayoutComponent]
})
export class LayoutModule { }