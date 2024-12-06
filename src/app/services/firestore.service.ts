import { Injectable } from '@angular/core';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private db: any;

  constructor() {
    this.db = getFirestore();
  }

  getDocument(collection: string, key: string, value: string) {
    return new Promise((resolve, reject) => {
      const q = query(this.getCollection(collection), where(key, '==', value))
      getDocs(q)
        .then((snapshot: any) => {
          const document = snapshot.empty ? [] : snapshot.docs[0].data();
          resolve(document);
        }).catch((error: any) => {
          reject(error);
        });
    });
  }

  private getCollection(name: string) {
    return collection(this.db, name);
  }
}
