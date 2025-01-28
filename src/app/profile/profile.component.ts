import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() user: any;

  selectedImage: string | ArrayBuffer | null = null;
  file: any;
  profile: any = {
    ref: '',
    image: '',
    firstName: '',
    lastName: '',
    birthday: new Date(),
    phone: '',
    email: '',
    edit: false
  }

  constructor(
    private firestoreService: FirestoreService,
    private databaseService: DatabaseService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.profile.email = this.user.email;
    this.firestoreService.getDocument('users', 'email', this.user.email)
      .then((result: any) => {
        this.profile.ref = result.ref;
        // this.profile.image = this.databaseService.getImage(result.data.email);
        this.profile.firstName = result.data.firstName;
        this.profile.lastName = result.data.lastName;
        this.profile.phone = result.data.phone;
        this.profile.email = result.data.email;
        this.profile.birthday = new Date(result.data.birthday.seconds * 1000 + Math.floor(result.data.birthday.nanoseconds / 1e6));
      }).catch(() => { });
  }

  edit() {
    this.profile.birthday = this.profile.birthday.toISOString();
    this.profile.edit = true;
  }

  save() {
    if (this.file) {
      const filename = this.profile.email;
      this.storageService.upload(this.file, filename)
        .then((url) => {
          this.databaseService.saveImage(filename, url);
        });
    }
    this.profile.birthday = new Date(this.profile.birthday);
    this.firestoreService.updateDocument(this.profile.ref, this.processData());
    this.profile.edit = false;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  private processData() {
    const data: any = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      birthday: this.profile.birthday,
      phone: this.profile.phone
    }
    return data;
  }

}
