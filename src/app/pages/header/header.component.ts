import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  isLoggedIn() {
    return this.userService.getToken() ? true : false;
  }
  logOut() {
    this.userService.logOut();
    this.router.navigate(["home"]);
  }

  toggleMenu() {
    const element = document.getElementById("ftco-nav");
    if (element.classList.contains("show")) {
      element.classList.remove("show");
    }
    else if (!element.classList.contains("show")) {
      element.classList.add("show");
    }
  }

}
