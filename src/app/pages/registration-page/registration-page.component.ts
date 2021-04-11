import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Regex } from "../../models/regex";
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  submitted: boolean;
  token: string;

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private regex: Regex, private userService: UserService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(this.regex.nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(this.regex.nameRegex)]],
      username: ['', [Validators.required, Validators.pattern(this.regex.nameRegex)]],
      email: ['', [Validators.required, Validators.pattern(this.regex.emailRegex)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      { validator: this.MustMatch("password", "confirmPassword") });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.userService.register(this.registrationForm.getRawValue()).subscribe(
        (response) => {
          this.token = response.body;
        },
        (error) => {
          window.alert("email or username is already taken");
        }
      );
    }
    window.alert("You have registered, check email");
    this.registrationForm.reset();
  }

  get firstName() {
    return this.registrationForm.get("firstName");
  }
  get lastName() {
    return this.registrationForm.get("lastName");
  }
  get username() {
    return this.registrationForm.get("username");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  get confirmPassword() {
    return this.registrationForm.get("confirmPassword");
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}


