import { isSomething } from "../libs/helpers";
import { axios } from "../libs/http";

export const getFeed = () => {
  return new Promise((resolve, reject) => {
    axios.get("/api/posts/feed").then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};

export const getProfileFeed = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/posts/profile/${userId}`).then((res) => {
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

export const postComments = (postId) => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/posts/${postId}/comments`).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
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

export const deletePostComment = (postId, commentId) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/posts/${postId}/comments/${commentId}`).then((res) => {
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