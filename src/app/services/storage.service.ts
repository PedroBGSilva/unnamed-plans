import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  upload(file: any, filename: string) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${filename}.jpg`);
    uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
}
