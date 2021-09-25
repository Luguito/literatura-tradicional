import { Component, NgModule, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../services/login/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    logInForm: FormGroup = this.initForm;
    loadingLogin: boolean = false;
    forgotUser: FormControl = new FormControl();
    forgetRef: MatDialogRef<any>;
    constructor(private LS: LoginService, private fb: FormBuilder,
        private router: Router, private dialog: MatDialog) { }

    sendLogIn() {
        this.loadingLogin = true;
        let user = this.logInForm.getRawValue();
        this.LS.userLogin(user).subscribe((data: any) => {
            sessionStorage.setItem("token", data.data.access_token)
            localStorage.setItem('user', data.data.username);
            this.loadingLogin = false;
            this.router.navigate(['/app/dashboard']);
        },
        (err) => swal.fire('Error', err, 'error'));
    }
    //afreja
    //123456
    get initForm() {
        return this.fb.group({
            'username': [],
            'password': []
        })
    }

    openForgotPassword(template: TemplateRef<any>) {
        this.forgetRef = this.dialog.open(template, {
            width: '500px'
        });
    }

    async forgetPassword() {
        let value = { 
            'username':this.forgotUser.value
        };
        try {
            let res = await this.LS.forgotPassword(value).toPromise();
            console.log(res)
        } catch (e) {
            swal.fire('Error', e.error.message.message[0], 'error')
            console.error(e)
        }
    }
}

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from "@angular/common";
@NgModule({
    declarations: [LoginComponent],
    imports: [ReactiveFormsModule, RouterModule.forChild([
        { path: '', component: LoginComponent }
    ]), MatProgressSpinnerModule, CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    exports: [LoginComponent]
})
export class LoginModule { }

interface IUser {
    username: string
    password: string
}