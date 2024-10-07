import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './environments/environment';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);