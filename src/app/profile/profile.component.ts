import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() user: any;

  userBirthDay: Date = new Date();
  userEmail: string = '';
  userPhone: string = '';
  userName: string = '';

  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.userEmail = this.user.email;
    this.firestoreService.getDocument('users', 'email', this.userEmail)
      .then((result: any) => {
        this.userName = result.firstName + ' ' + result.lastName;
        this.userBirthDay = new Date(result.birthday.seconds * 1000 + Math.floor(result.birthday.nanoseconds / 1e6));
        this.userPhone = result.phone;
      }).catch((error) => {

      });
  }

  edit() {

  }

}
