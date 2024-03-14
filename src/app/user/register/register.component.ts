import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { emailValidator } from '../user-validators';
import { passwordValidator } from '../user-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  emailValidatorFn = emailValidator;
  passwordValidatorFn = passwordValidator;

  onLoginSubmitHandler(form: NgForm): void {
    const password = form.value.password.trim();
    const rePassword = form.value.rePassword.trim();

    if (form.invalid || !this.passwordValidatorFn(password, rePassword)) {
      return;
    }

    console.log(form.value);
    form.reset();
  }
}
