import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  logInForm: FormGroup;
  hasError: boolean = false;
  returnUrl: string;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.logInForm = this.fb.group({

      username: [''],
      password: ['']

    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.userService.logIn(this.logInForm.value as User).subscribe(
      (data) => {
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        this.hasError = true;
      }
    );
  }

}
