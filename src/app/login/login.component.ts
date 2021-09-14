import { Component, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { LoginService } from '@services'
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    logInForm: FormGroup = this.initForm;
    loadingLogin:boolean = false;
    constructor(private LS: LoginService, private fb: FormBuilder, private router: Router) { }

    sendLogIn() {
        this.loadingLogin = true;
        let user = this.logInForm.getRawValue();
        this.LS.userLogin(user).subscribe((data: any) => {
            sessionStorage.setItem("token", data.token)
            this.loadingLogin = false;
            this.router.navigate(['/app/dashboard']);
        });
    }

    get initForm() {
        return this.fb.group({
            'username': ['afreja'],
            'password': ['123456']
        })
    }
}

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from "@angular/common";
@NgModule({
    declarations: [LoginComponent],
    imports: [ReactiveFormsModule, RouterModule.forChild([
        { path: '', component: LoginComponent }
    ]), MatProgressSpinnerModule, CommonModule],
    exports: [LoginComponent]
})
export class LoginModule { }

interface IUser {
    username: string
    password: string
}