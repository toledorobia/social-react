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
} from "firebase/firestore";
import { firebaseDateNow, firebaseDocToObject } from "../libs/helpers";
import _ from "lodash";

export const snapshotPostsTimeline = (uid, onSuccess, onError) => {
  const db = getFirestore();

  const q = query(
    collection(db, "posts"),
    // where("uid", "==", uid),
    orderBy("name")
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const items = [];

      snapshot.forEach((doc) => {
        items.push(firebaseDocToObject(doc));
      });

      if (_.isFunction(onSuccess)) {
        onSuccess(items);
      }
    },
    (err) => {
      if (_.isFunction(onError)) {
        onError(err);
      }
    }
  );
};

export const getPostsTimeline = (uid) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const q = query(
      collection(db, "posts"),
      // where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );

    getDocs(q)
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(firebaseDocToObject(doc));
        });

        resolve(posts);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const newPost = (uid, content, image = null) => {
  return new Promise((resolve, reject) => {
    const now = firebaseDateNow();
    const db = getFirestore();

    addDoc(collection(db, "posts"), {
      uid,
      content,
      image,
      video: null,
      likes: [],
      comments: [],
      createdAt: now,
      updatedAt: now,
    })
      .then((docRef) => {
        resolve({ id: docRef.id });
      })
      .catch((error) => resolve(error));
  });
};
