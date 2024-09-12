import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideAnimationsAsync(),
     provideFirebaseApp(() => initializeApp({"projectId":"saladejuegos-10683",
                                            "appId":"1:473787109319:web:0cf551dbf9a581a01453e2",
                                            "storageBucket":"saladejuegos-10683.appspot.com",
                                            "apiKey":"AIzaSyCR658FuB_5kXiAfDanyZKABUlLEtlrZh0",
                                            "authDomain":"saladejuegos-10683.firebaseapp.com",
                                            "messagingSenderId":"473787109319"})),
     provideAuth(() => getAuth()),
     provideFirestore(() => getFirestore())]
};
