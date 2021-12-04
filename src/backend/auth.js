import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut as signOutFirebase,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { firebaseDateNow, firebaseTimestampToDates } from "../libs/helpers";
import _ from "lodash";

export const snapshotAuthState = (callback) => {
  const auth = getAuth();

  return onAuthStateChanged(auth, (user) => {
    if (!_.isFunction(callback)) {
      return;
    }

    if (user == null) {
      callback(null);
    } else {
      getFirestoreUser(user.uid).then((userfs) => {
        if (user.emailVerified === true && userfs.emailVerified === false) {
          updateFirestoreUser(userfs.uid, { emailVerified: true }).then(() => {
            userfs.emailVerified = true;
            callback(user);
          });
        } else {
          callback(userfs);
        }
      });
    }
  });
};

export const signIn = (email, password, remember) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();

    setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    )
      .then(() => signInWithEmailAndPassword(auth, email, password))
      .then((user) => resolve(user))
      .catch((error) => reject(error));
  });
};

export const signUp = async (email, name, password) => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await sendEmailVerification(userCredential.user);
  await updateProfile(userCredential.user, { displayName: name });

  const uid = userCredential.user.uid;
  const db = getFirestore();
  const now = firebaseDateNow();

  await setDoc(doc(db, "users", uid), {
    name: name,
    email: email,
    emailVerified: false,
    photoUrl: null,
    updateAt: now,
    createdAt: now,
  });

  return signOutFirebase(auth);
};

export const signOut = () => {
  const auth = getAuth();
  return signOutFirebase(auth);
};

export const passwordResetEmail = (email) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

export const updateFirestoreUser = (uid, data = {}) => {
  const db = getFirestore();
  return updateDoc(doc(db, "users", uid), data);
};

export const getFirestoreUser = (uid) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    getDoc(docRef)
      .then((docSnap) => {
        const data = firebaseTimestampToDates(docSnap.data());
        resolve({ uid: docSnap.id, ...data });
      })
      .catch((error) => resolve(error));
  });
};
