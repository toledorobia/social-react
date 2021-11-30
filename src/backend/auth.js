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
import _ from "lodash";

export const snapshotAuthState = (callback) => {
  const auth = getAuth();

  return onAuthStateChanged(auth, (user) => {
    if (_.isFunction(callback)) {
      callback(user);
    }
  });
};

export const signIn = async (email, password, remember) => {
  const auth = getAuth();
  await setPersistence(
    auth,
    remember ? browserLocalPersistence : browserSessionPersistence
  );
  return signInWithEmailAndPassword(auth, email, password);
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
