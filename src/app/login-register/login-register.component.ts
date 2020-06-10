import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from "../model/role.enum";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
 // registerForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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
          if(this.authenticationService.currentUserValue.roles.includes(Role.ADMIN)) {
            this.router.navigate(['/admin']);
          }
          else {
            this.router.navigate(['/user'])
          }

        },
        error => {
          this.error = error;
        });
  }
  }
