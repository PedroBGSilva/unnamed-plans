import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set, get, onValue } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: Database;

  constructor() {
    this.db = getDatabase();
  }

  saveImage(filename: string, url: string) {
    set(ref(this.db, `images/${filename}`), {
      imageUrl: url
    });
  }

  getImage(filename: string) {
    const imageRef = ref(this.db, `images/${filename}`);
    get(imageRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          onValue(imageRef, (snapshot) => {
            return snapshot.val().imageUrl;
          });
        }
      });
    return null;
  }
}