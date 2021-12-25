import {
  getFirestore,
  doc,
  getDoc,
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import {
  firebaseDateNow,
  firebaseDocToObject,
  isSomething,
} from "../libs/helpers";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";


import { axios } from "../libs/http";


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

      // const posts = await preparePosts(items);

      if (_.isFunction(onSuccess)) {
        onSuccess([]);
      }
    },
    (err) => {
      if (_.isFunction(onError)) {
        onError(err);
      }
    }
  );
};

export const getFeed = () => {
  return new Promise((resolve, reject) => {
    axios.get("/api/posts/feed").then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};

export const newPost = (content = null, image = null) => {
  return new Promise((resolve, reject) => {
    const data = new FormData();

    if (isSomething(content)) {
      data.append("content", content);
    }

    if (isSomething(image)) {
      data.append("image", image);
    }

    axios.post("/api/posts", data, { 
      headers: {
        "Content-Type": "multipart/form-data",
      } 
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};

export const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/posts/${postId}`).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};

export const toggleLike = (postId) => {
  return new Promise((resolve, reject) => {
    axios.put(`/api/posts/${postId}/like`).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
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

export const deleteComment = (postId, commentId) => {
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
