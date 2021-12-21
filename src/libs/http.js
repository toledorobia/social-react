import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "./dayjs";

let token = null;

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use(async function (config) {
  config.withCredentials = true;

  if (config.withoutToken === true) {
    return config;
  }

  let needRefresh = true;

  if (token != null) {
    const decode = jwt_decode(token);
    // console.log("decode", decode);
    needRefresh = dayjs.unix(decode.exp).diff(dayjs()) < 1;
  }

  // console.log("needRefresh", needRefresh);

  if (needRefresh) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    );

    // console.log("response", response);
    token = response.data.token;
  }

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(null, function (error) {
  if (error.response) {
    const message = error.response.data?.message;
    if (message) {
      error.message = message;
    }
  }

  return Promise.reject(error);
});

export { instance as axios };

export const url = (path = "") => {
  return `${process.env.REACT_APP_API_URL}${path}`;
};

export const get = (path, params = {}) => {
  return request(path, "GET", params);
};

export const post = (path, params = {}) => {
  return request(path, "POST", params);
};

export const saveToken = (newToken) => {
  token = newToken;
};

export const removeToken = () => {
  token = null;
};

const headers = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token == null ? null : `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const refreshToken = () => {
  return new Promise((resolve, reject) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return reject("No refresh token");
    }

    fetch(url("/api/auth/refresh"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          removeToken();
          reject();
        }
      })
      .then((data) => {
        saveToken(data.token, data.refreshToken);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const request = (path, method = "GET", params = {}) => {
  return new Promise((resolve, reject) => {
    const options = {
      body: method !== "GET" ? JSON.stringify(params) : null,
      method: method,
      headers: headers(),
    };

    fetch(url(path), options)
      .then((response) => {
        if (response.status === 401) {
          return refreshToken()
            .then(() => {
              options.headers = headers();
              return fetch(url(path), options);
            })
            .then((response) => response.json())
            .catch(() => {
              reject("No token");
            });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
