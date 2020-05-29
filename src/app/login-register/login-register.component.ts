import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginUser() {

    if(this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.controls.username.value + " " + this.loginForm.controls.password.value )
    this.authenticationService
      .login(this.loginForm.controls.username.value,this.loginForm.controls.password.value)
      .subscribe( data => {
          console.log("Zalogowano");
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });
  }
}
