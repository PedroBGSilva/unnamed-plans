import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(getAuth(), (user) => { this.userSubject.next(user); });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      setPersistence(this.auth, browserLocalPersistence)
        .then(() => {
          signInWithEmailAndPassword(this.auth, email, password)
            .then((result) => {
              resolve(result);
            }).catch((error) => {
              reject(error);
            });
        }).catch((error) => {
          reject(error);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      signOut(this.auth)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    })
  }

  resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(this.auth, email)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  get user$() {
    return this.userSubject.asObservable();
  }
}
