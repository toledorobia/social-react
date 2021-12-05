import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  where,
  orderBy,
  query,
  getDocs,
  onSnapshot,
  documentId,
} from "firebase/firestore";
import {
  firebaseDateNow,
  firebaseDocToObject,
  firebaseTimestampToDates,
} from "../libs/helpers";

import { mergeUsers } from "../features/users/usersSlice";
import store from "../store";

export const normalizeUsers = async (uids) => {
  const _uids = [...new Set(uids)];
  // console.log("normalizeUsers", _uids);

  const currentUids = store.getState().users.users.map((u) => u.uid);
  const newUids = _uids.filter((uid) => !currentUids.includes(uid));

  if (newUids.length === 0) {
    return Promise.resolve();
  }

  const db = getFirestore();
  const q = query(collection(db, "users"), where(documentId(), "in", newUids));
  const querySnapshot = await getDocs(q);

  const newUsers = [];
  querySnapshot.forEach((doc) => {
    const u = firebaseTimestampToDates(doc.data());
    newUsers.push({ uid: doc.id, ...u });
  });

  store.dispatch(mergeUsers(newUsers));
};
