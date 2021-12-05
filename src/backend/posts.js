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
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { firebaseDateNow, firebaseDocToObject } from "../libs/helpers";
import _ from "lodash";
import { normalizeUsers } from "./users";
import { v4 as uuidv4 } from "uuid";

import store from "../store";

export const snapshotPosts = (uid, onSuccess, onError) => {
  const db = getFirestore();

  const q = query(
    collection(db, "posts"),
    // where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(
    q,
    async (snapshot) => {
      const items = [];
      let postUsers = [];

      snapshot.forEach((doc) => {
        const d = firebaseDocToObject(doc);

        postUsers = [
          ...postUsers,
          d.uid,
          ...d.likes.map((l) => l.uid),
          ...d.comments.map((c) => c.uid),
        ];

        items.push(d);
      });

      await normalizeUsers(postUsers);

      const users = store.getState().users.users;
      const posts = items.map((p) => {
        p.user = users.find((u) => u.uid === p.uid);
        p.likes = p.likes.map((l) => {
          l.user = users.find((u) => u.uid === l.uid);
          return l;
        });
        p.comments = p.comments.map((c) => {
          c.createdAt = c.createdAt?.toDate();
          c.updatedAt = c.updatedAt?.toDate();
          c.user = users.find((u) => u.uid === c.uid);
          return c;
        });

        return p;
      });

      if (_.isFunction(onSuccess)) {
        onSuccess(posts);
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

export const toggleLike = (postId, uid, like = false) => {
  return new Promise((resolve, reject) => {
    const now = firebaseDateNow();
    const db = getFirestore();
    const ref = doc(db, "posts", postId);

    getDoc(ref).then((doc) => {
      const likes = doc.data().likes;
      const likesIndex = likes.findIndex((l) => l.uid === uid);

      if (like === true && likesIndex === -1) {
        likes.push({
          uid,
          createdAt: now,
        });
      } else if (like === false) {
        likes.splice(likesIndex, 1);
      }

      updateDoc(ref, {
        likes,
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const newPostComment = (postId, uid, content) => {
  return new Promise((resolve, reject) => {
    const now = firebaseDateNow();
    const db = getFirestore();
    const ref = doc(db, "posts", postId);

    updateDoc(ref, {
      comments: arrayUnion({
        id: uuidv4(),
        uid,
        content,
        likes: [],
        createdAt: now,
        updatedAt: null,
      }),
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
