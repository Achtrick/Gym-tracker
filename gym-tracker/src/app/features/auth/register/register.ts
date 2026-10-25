import { Component, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { SvgIcon } from '../../../shared/components/svg-icon/svg-icon';
import { TextBox } from '../../../shared/components/text-box/text-box';

interface RegisterUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  imports: [RouterLink, SvgIcon, FormField, TextBox],
  selector: 'gym-tracker-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  protected registerUserInfoModel = signal<RegisterUserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  protected passwordVisible = signal(false);

  protected togglePasswordVisibility = () => {
    this.passwordVisible.update((_) => !_);
  };

  protected form = form(this.registerUserInfoModel, (fields) => {
    const requiredMsg = { message: 'This field is required' };
    required(fields.firstName, requiredMsg);
    required(fields.lastName, requiredMsg);
    required(fields.email, requiredMsg);
    email(fields.email, { message: 'Invalid email address' });
    required(fields.password, requiredMsg);
    minLength(fields.password, 8, { message: 'At least 8 characters' });
    required(fields.confirmPassword, requiredMsg);

    validate(fields.confirmPassword, ({ value, valueOf }) =>
      value() === valueOf(fields.password)
        ? undefined
        : { kind: 'passwordMismatch', message: 'Passwords do not match' },
    );
  });

  protected register = (event: Event) => {
    event.preventDefault();
    submit(this.form, async (form) => {
      console.log(form().value());
    });
  };
}
