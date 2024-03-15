import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { emailValidator } from '../user-validators';
import { passwordValidator } from '../user-validators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  emailValidatorFn = emailValidator;
  passwordValidatorFn = passwordValidator;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onRegisterSubmitHandler(form: NgForm): void {
    const username = form.value.username.trim();
    const email = form.value.email.trim();
    const password = form.value.password.trim();
    const rePassword = form.value.rePassword.trim();

    const user = {};

    if (form.invalid || !this.passwordValidatorFn(password, rePassword)) {
      return;
    }

    this.userService
      .register(username, email, password, rePassword)
      .subscribe(() => {
        const token = this.userService.user?.accessToken;
        if (token) {
          this.cookieService.set('authToken', token);
        }

        this.router.navigate(['/']);
      });
  }
}
