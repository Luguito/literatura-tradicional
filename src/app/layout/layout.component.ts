import { Component, OnInit, NgModule, ViewChild, TemplateRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert2';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  pieces;
  userForm: FormGroup = this.userGroup;
  usersList: Array<any>;
  userDialogRef: MatDialogRef<any>;
  usersDialogRef: MatDialogRef<any>;
  user: string = localStorage.user ?? 'Camilo Sanchez';
  panelOpenState: boolean = false;
  modalCount: MatDialogRef<any>;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private router: Router, private oService: ObraService,
    private storage: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.storage.getSelectPieces().pipe().subscribe(pieces => {
      this.pieces = pieces;
    })
  }

  async openDialog(template) {
    await this.getListUsers()
    this.usersDialogRef = this.dialog.open(template, {
      width: '800px',
    });
  }

  openCreateUser(template) {
    this.userDialogRef = this.dialog.open(template, {
      width: '800px'
    })
  }

  async getListUsers() {
    await this.userService.listUser().toPromise().then(v => {
      this.usersList = v['data'];
    })
  }

  get userGroup() {
    return this.fb.group({
      'fullname': [],
      'email': [, Validators.email]
    })
  }

  deleteUser(id) {
    this.userService.deleteUser(id).toPromise().then(() => {
      swal.fire('Usuario Eliminado', 'El usuario ha sido eliminado', 'success');
      this.getListUsers();
    })
  }

  saveUser() {
    this.userService.inviteUser(this.userForm.getRawValue()).subscribe(v => {
      this.userDialogRef.close();
      this.getListUsers();
    })
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/'])
  }

  openModal(template: TemplateRef<any>, method: string, link: string) {
    let nameTemplate = (<string>template['_declarationTContainer'].localNames[0]).split('_')[1]

    this.modalCount = this.dialog.open(template, {
      data: {
        name: nameTemplate,
        method,
        link
      }
    });
  }

  goToSearch(count, method, link) {
    if (!this.pieces) return swal.fire('Seleccione alguna obra', 'Para usar las opciones de analisis debe seleccionar alguna obra previamente', 'info')
    if (['getWordMonit'].includes(method)) {
      let pieces = [];

      this.pieces.pieces.map(v => {
        pieces.push(v)
      })

      this.oService[method]({ pieces, text: count.value, method }).toPromise().then((v) => {
        this.storage.sendResults(v.data.computed);
      })
      // this.storage.sendResults({ pieces: this.pieces, text: count.value, method });
    } else {
      let pieces = [];

      this.pieces.pieces.map(v => {
        pieces.push(v)
      })

      this.oService[method]({ pieces, count: Number(count.value), method }).toPromise().then((v) => {
        this.storage.sendResults({ results: v.data.computed, pieces: this.pieces.pieces });
      })
      // this.storage.sendResults({ pieces: this.pieces, count: count.value, method });
    }

    this.router.navigate([`../app/analisis-obra/${link}`]).then(() => {
      this.modalCount ? this.modalCount.close() : null;
    }).catch(e => console.error(e))
  }
}

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'posts', component: PostsComponent },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.component').then(m => m.DashboardModule) },
      { path: 'nueva-obra', loadChildren: () => import('../new-book/new-book.component').then(m => m.NewBookModule) },
      { path: 'nuevo-post', loadChildren: () => import('../new-post/new-post.component').then(m => m.NewPostModule) },
      { path: 'analisis-obra/:type', loadChildren: () => import('../results/results.component').then(m => m.ResultsModule) }
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
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { UserService, ObraService } from '../services';
import { MatExpansionModule } from '@angular/material/expansion';
import { StorageService } from '../storage.service';
import { switchAll } from 'rxjs/operators';

@NgModule({
  imports: [MatButtonModule, LayoutRouting, CommonModule, MatIconModule, MatInputModule, MatExpansionModule,
    MatRippleModule, ReactiveFormsModule, MatSidenavModule, MatDialogModule],
  exports: [],
  declarations: [LayoutComponent]
})
export class LayoutModule { }