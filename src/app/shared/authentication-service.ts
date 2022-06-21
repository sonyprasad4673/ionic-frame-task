import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  [x: string]: any;
  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  // Login in with email/password
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  // eslint-disable-next-line @typescript-eslint/naming-convention
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email,password);
  }
  // Email verification when new user register
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user) => user.sendEmailVerification().then(() => {
        this.router.navigate(['login']);
      }));
  }
  // Recover password
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Returns true when user's email is verified
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }
  // Sign in with Gmail
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth providers
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AuthLogin(provider) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['get-started']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign-out
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  logout() {
    return from(this.auth.signOut());
  }
}
