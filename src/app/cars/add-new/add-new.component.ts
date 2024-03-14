import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css',
})
export class AddNewComponent {
  onAddNewCarSubmitHandler(form: NgForm): void {
    console.log(form.value);
    form.reset();
  }

  carImageValidator(imageUrl: string): boolean {
    const pattern = /^https?:\/\/(.+)$/;

    return pattern.test(imageUrl);
  }
}
