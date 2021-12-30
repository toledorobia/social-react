import {
  getFirestore,
  doc,
  getDoc,
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  firebaseDocToObject,
  isSomething,
} from "../libs/helpers";
import _ from "lodash";


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

export const toggleCommentLike = (postId, commentId) => {
  return new Promise((resolve, reject) => {
    axios.put(`/api/posts/${postId}/comments/${commentId}/like`).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
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

export const newPostComment = (postId, content) => {
  return new Promise((resolve, reject) => {
    axios.post(`/api/posts/${postId}/comments`, { content }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};

export const postComments = (postId) => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/posts/${postId}/comments`).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};

export const likePostComment = (postId, commentId) => {
  return new Promise((resolve, reject) => {
    axios.put(`/api/posts/${postId}/comments/${commentId}/like`).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};

