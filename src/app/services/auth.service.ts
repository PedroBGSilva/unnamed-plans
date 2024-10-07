import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private auth = getAuth();

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, password)
                .then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                })
        })
    }
}
