import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
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
  dismissButton = [{ text: '', role: 'cancel' }];

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.dismissButton[0].text = this.translateService.instant('DISMISS');
  }

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