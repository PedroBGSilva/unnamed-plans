import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: false
})
export class SettingsComponent implements OnInit {
  toastMessage: string = '';
  showToast: boolean = false;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  logout() {
    this.authService.logout()
      .catch(() => {
        this.toastMessage = this.translateService.instant('SETTINGS.LOGOUT_ERROR');
        this.showToast = true;
      });
  }

}
