import { isSomething } from "../libs/helpers";
import { axios } from "../libs/http";

export const getProfile = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/users/${id}`).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
};

export const updateProfile = (id, { name, avatar }) => {
  return new Promise((resolve, reject) => {
    const data = new FormData();

    if (isSomething(name)) {
      data.append("name", name);
    }

    if (isSomething(avatar)) {
      data.append("avatar", avatar);
    }

    axios.put(`/api/users/${id}`, data, { 
      headers: {
        "Content-Type": "multipart/form-data",
      } 
    }).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
};
