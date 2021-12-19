import {
  getFirestore,
  doc,
  getDoc,
  collection,
  where,
  query,
  getDocs,
  documentId,
} from "firebase/firestore";
import { firebaseTimestampToDates } from "../libs/helpers";

import { mergeUsers } from "../features/users/usersSlice";
import store from "../store";

export const normalizeUsers = async (uids) => {
  const _uids = [...new Set(uids)];

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

export const getUser = (uid) => {
  console.log("getUser", uid);
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const ref = doc(db, "users", uid);

    getDoc(ref)
      .then((doc) => {
        const u = firebaseTimestampToDates(doc.data());
        resolve({ uid: doc.id, ...u });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
