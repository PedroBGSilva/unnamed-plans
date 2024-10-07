import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  showToast: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      }).catch(() => {
        this.showToast = true;
      })
  }
}