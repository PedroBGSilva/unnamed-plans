import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Email:any;
  constructor() {
    const auth = getAuth();
    this.Email = auth.currentUser?.email
  }


}
