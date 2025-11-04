import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: false
})
export class SignUpComponent implements OnInit {
  @Output() signup = new EventEmitter();

  dismissButton = [{ text: '', role: 'cancel' }];
  calendarToggled: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  profile = {
    firstName: '',
    lastName: '',
    birthday: new Date().toISOString(),
    email: '',
    email2: '',
    password: '',
    password2: ''
  }

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() { }

  regist() {
    if (this.profile.email !== this.profile.email2) {
      this.toastMessage = this.translateService.instant('SIGNUP.EMAIL_ERROR');
      this.showToast = true;
    } else if (this.profile.password !== this.profile.password2) {
      this.toastMessage = this.translateService.instant('SIGNUP.PASSWORD_ERROR');
      this.showToast = true;
    } else {
      this.signup.emit({
        email: this.profile.email,
        password: this.profile.password,
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        birthday: new Date(this.profile.birthday)
      });
    }
  }

  toggleCalendar() {
    this.calendarToggled = !this.calendarToggled;
  }

}
