import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() signup = new EventEmitter();

  dismissButton = [{ text: '', role: 'cancel' }];
  showToast: boolean = false;
  toastMessage: string = '';
  password2: string = '';
  password: string = '';
  email2: string = '';
  email: string = '';
  name2: string = '';
  name: string = '';
  birthday: Date = new Date();

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() { }

  regist() {
    if (this.email !== this.email2) {
      this.toastMessage = this.translateService.instant('SIGNUP.EMAIL_ERROR');
      this.showToast = true;
    } else if (this.password !== this.password2) {
      this.toastMessage = this.translateService.instant('SIGNUP.PASSWORD_ERROR');
      this.showToast = true;
    } else {
      this.signup.emit({ email: this.email, password: this.password });
    }
  }

}
