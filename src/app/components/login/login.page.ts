import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: false
})

export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  toastMessage: string = '';
  showToast: boolean = false;
  resetting: boolean = false;
  signing: boolean = false;
  dismissButton = [{ text: '', role: 'cancel' }];

  constructor(
    private translateService: TranslateService,
    private firestoreService: FirestoreService,
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
        this.toastMessage = this.translateService.instant('LOGIN.INVALID');
        this.showToast = true;
      })
  }

  toggleReset() {
    this.resetting = true;
  }

  toggleSignUp() {
    this.signing = true;
  }

  resetPassword(email: string) {
    this.authService.resetPassword(email);
    this.toastMessage = this.translateService.instant('LOGIN.EMAIL_SENT');
    this.showToast = true;
    this.resetting = false;
  }

  signup(event: { email: string, password: string, firstName: string, lastName: string, birthday: string }) {
    this.authService.signup(event.email, event.password)
      .then(() => {
        const user = {
          email: event.email,
          firstName: event.firstName,
          lastName: event.lastName,
          birthday: event.birthday,
          phone: null
        }
        this.firestoreService.addDocument('users', user);
      }).catch(() => { });
  }

  back() {
    this.resetting = false;
    this.signing = false;
  }
}