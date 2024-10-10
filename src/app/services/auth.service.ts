import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, inMemoryPersistence} from 'firebase/auth';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private auth = getAuth();

    login(email: string, password: string) {

        return setPersistence(this.auth, browserLocalPersistence)
            .then(() => {
                
                // In memory persistence will be applied to the signed in Google user
                // even though the persistence was set to 'none' and a page redirect
                // occurred.
                return signInWithEmailAndPassword(this.auth, email, password)
                        
                
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
}
