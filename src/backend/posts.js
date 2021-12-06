import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  where,
  getDocs,
  onSnapshot,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { firebaseDateNow, firebaseDocToObject } from "../libs/helpers";
import _ from "lodash";
import { normalizeUsers } from "./users";
import { v4 as uuidv4 } from "uuid";

import store from "../store";

const preparePosts = async (posts) => {
  let postUsers = [];

  posts.forEach((d) => {
    postUsers = d.comments.reduce(
      (acc, curr) => [...acc, curr.uid, ...curr.likes.map((l) => l.uid)],
      [...postUsers, d.uid, ...d.likes.map((l) => l.uid)]
    );
  });

  await normalizeUsers(postUsers);

  const users = store.getState().users.users;
  return posts.map((p) => {
    p.user = users.find((u) => u.uid === p.uid);
    p.likes = p.likes
      .map((l) => {
        l.user = users.find((u) => u.uid === l.uid);
        l.createdAt = l.createdAt?.toDate();
        return l;
      })
      .sort((a, b) => a.createdAt - b.createdAt);
    p.comments = p.comments
      .map((c) => {
        c.createdAt = c.createdAt?.toDate();
        c.updatedAt = c.updatedAt?.toDate();
        c.user = users.find((u) => u.uid === c.uid);

        c.likes = c.likes
          .map((l) => {
            l.user = users.find((u) => u.uid === l.uid);
            l.createdAt = l.createdAt?.toDate();
            return l;
          })
          .sort((a, b) => a.createdAt - b.createdAt);

        return c;
      })
      .sort((a, b) => b.createdAt - a.createdAt);

    return p;
  });
};

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
      snapshot.forEach((doc) => {
        items.push(firebaseDocToObject(doc));
      });

      const posts = await preparePosts(items);

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

export const snapshotProfilePost = (uid, onSuccess, onError) => {
  const db = getFirestore();

  const q = query(
    collection(db, "posts"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    async (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(firebaseDocToObject(doc));
      });

      const posts = await preparePosts(items);

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

// export const getPostsProfile = (uid) => {
//   return new Promise((resolve, reject) => {
//     const db = getFirestore();
//     const q = query(
//       collection(db, "posts"),
//       where("uid", "==", uid),
//       orderBy("createdAt", "desc")
//     );

//     getDocs(q)
//       .then(async (querySnapshot) => {
//         const items = [];
//         querySnapshot.forEach((doc) => {
//           items.push(firebaseDocToObject(doc));
//         });

//         const posts = await preparePosts(items);
//         resolve(posts);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

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

export const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();

    deleteDoc(doc(db, "posts", postId))
      .then((docRef) => {
        resolve();
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

export const toggleLikeComment = (postId, commentId, uid, like = false) => {
  return new Promise((resolve, reject) => {
    const now = firebaseDateNow();
    const db = getFirestore();
    const ref = doc(db, "posts", postId);

    getDoc(ref).then((doc) => {
      const comments = doc.data().comments;
      const commentIndex = comments.findIndex((c) => c.id === commentId);
      const comment = comments.find((c) => c.id === commentId);

      const likes = comment.likes;
      const likesIndex = likes.findIndex((l) => l.uid === uid);

      if (like === true && likesIndex === -1) {
        likes.push({
          uid,
          createdAt: now,
        });
      } else if (like === false) {
        likes.splice(likesIndex, 1);
      }

      comment.likes = likes;
      comments[commentIndex] = comment;

      updateDoc(ref, {
        comments,
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

export const deleteComment = (postId, commentId, uid) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const ref = doc(db, "posts", postId);

    getDoc(ref).then((doc) => {
      const comments = doc.data().comments;
      const commentIndex = comments.findIndex((c) => c.id === commentId);

      if (commentIndex === -1) {
        resolve();
      } else {
        comments.splice(commentIndex, 1);

        updateDoc(ref, {
          comments,
        })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      }
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
