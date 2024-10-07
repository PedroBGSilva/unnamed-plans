import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang?.match(/en|fr/) ? browserLang : 'en');
    initializeApp(firebaseConfig);
  }
}
