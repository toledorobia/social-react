import { saveToken, removeToken, axios } from "../libs/http";

export const check = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/auth/check")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/signin", { email, password }, { withoutToken: true })
      .then((response) => {
        // console.log("response", response);
        saveToken(response.data.token);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/signout", {})
      .then((response) => {
        removeToken();
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signUp = (name, email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/api/auth/signup",
        { name, email, password },
        { withoutToken: true }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyEmail = (id, hash) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/auth/email/verify/${id}/${hash}`, { withoutToken: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendPasswordResetEmail = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/reset/send`, { email }, { withoutToken: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyPasswordResetHash = (id, hash) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/auth/reset/verify/${id}/${hash}`, { withoutToken: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resetPassword = (id, hash, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/reset`, { id, hash, password }, { withoutToken: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};