import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const uploadImage = (file, folder, name) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const url = folder + "/" + name;
    const storageRef = ref(storage, url);

    uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .then((url) => resolve(url))
      .catch((error) => reject(error));
  });
};
