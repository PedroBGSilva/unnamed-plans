import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private translate: TranslateService,private router: Router) {
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang?.match(/en|fr/) ? browserLang : 'en');

    initializeApp(firebaseConfig);
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, navigate to home page
        this.router.navigate(['home']);
      } else {
        // No user is logged in, navigate to login page
        this.router.navigate(['login']);
      }
    });
  }
}
