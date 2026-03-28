import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: false
})
export class ResetPasswordComponent  implements OnInit {
  @Output() resetPassword = new EventEmitter();

  email: string = '';

  constructor() { }

  ngOnInit() {}

  reset() {
    this.resetPassword.emit(this.email);
  }

}
