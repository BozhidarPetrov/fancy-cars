import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { emailValidator } from '../user-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  emailValidatorFn = emailValidator;



  onLoginSubmitHandler(form: NgForm): void {

    const email = form.value.email.trim();

    if (form.invalid || !this.emailValidatorFn(email)) {
      return;
    }

    console.log(form.value);
    form.reset();

  }

}
