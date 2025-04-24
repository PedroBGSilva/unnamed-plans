import { Injectable } from '@angular/core';
import {
  getFirestore,
  getDocs,
  addDoc,
  collection,
  query,
  where,
  updateDoc,
  DocumentReference,
  orderBy
} from "firebase/firestore";

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
      const q = query(this.getCollection(collection), where(key, '==', value));
      getDocs(q)
        .then((snapshot: any) => {
          const ref = snapshot.empty ? [] : snapshot.docs[0].ref;
          const data = snapshot.empty ? [] : snapshot.docs[0].data();
          resolve({ ref: ref, data: data });
        }).catch((error: any) => {
          reject(error);
        });
    });
  }

  getDocuments(collection: string, key: string, value: string, isArray?: boolean, orderByKey?: string) {
    return new Promise((resolve, reject) => {
      const constraints: any = [where(key, isArray ? 'array-contains' : '==', value)];
      if (orderByKey) {
        constraints.push(orderBy(orderByKey));
      }
      const q = query(this.getCollection(collection), ...constraints);
      getDocs(q)
        .then((snapshot: any) => {
          const results = snapshot.docs.map((doc: any) => ({
            ref: doc.ref,
            data: doc.data()
          }));
          resolve(results);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateDocument(ref: DocumentReference, data: any) {
    return new Promise((resolve, reject) => {
      updateDoc(ref, data)
        .then(() => {
          resolve('Document updated successfully');
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addDocument(collection: string, document: {}) {
    const collectionRef = this.getCollection(collection);
    return new Promise((resolve, reject) => {
      addDoc(collectionRef, document)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  getUserName(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const q = query(this.getCollection('users'), where('email', '==', email));
      getDocs(q)
        .then((snapshot: any) => {
          if (snapshot.empty) {
            resolve('');
          } else {
            const data = snapshot.docs[0].data();
            const fullName = `${data.firstName} ${data.lastName}`;
            resolve(fullName);
          }
        }).catch((error: any) => {
          reject(error);
        });
    });
  }

  private getCollection(name: string) {
    return collection(this.db, name);
  }
}
