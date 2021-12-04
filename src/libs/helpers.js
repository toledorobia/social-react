import { Timestamp } from "firebase/firestore";
import mime from "mime-types";
import { compress, compressAccurately } from "image-conversion";
import _ from "lodash";
import cryptojs from "crypto-js";

export const generateUniqueId = (suffix = "") => {
  const id = cryptojs
    .MD5(
      new Date().getTime().toString() +
        (Math.random() + 1).toString(36).substring(7)
    )
    .toString();
  return id + (isSomething(suffix) ? suffix : "");
};

export const publicUrl = (path) => {
  return process.env.PUBLIC_URL + path;
};

export const firebaseClearUser = (fbuser) => {
  if (fbuser == null) {
    return null;
  }

  return {
    uid: fbuser.uid,
    email: fbuser.email,
    displayName: fbuser.displayName,
    photoURL: fbuser.photoURL,
    phoneNumber: fbuser.phoneNumber,
  };
};

export const firebaseClearError = (error) => {
  return error == null ? null : { code: error.code, message: error.message };
};

export const firebaseTimestampToDates = (doc) => {
  console.log(doc);
  if (isSomething(doc.createdAt)) {
    doc.createdAt = doc.createdAt.toDate();
  }

  if (isSomething(doc.updateAt)) {
    doc.updateAt = doc.updateAt.toDate();
  }

  return doc;
};

export const firebaseDocToObject = (doc, extraData = {}) => {
  if (doc == null) {
    return null;
  }

  const d = firebaseTimestampToDates(doc.data());
  const id = doc.id;
  return { ...d, ...extraData, id };
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const firebaseDateNow = () => {
  return Timestamp.fromDate(new Date());
};

export const isNothing = (obj) => {
  return _.isUndefined(obj) || _.isNull(obj) || _.isNaN(obj);
};

export const isSomething = (obj) => {
  return !isNothing(obj);
};

export const imageValidation = (file, mimes = [], size = 1000) => {
  if (file == null) {
    return false;
  }

  if (_.indexOf(["image/jpeg", "image/png"], file.type) === -1) {
    return false;
  }

  const sizeFile = file.size / 1000;
  if (sizeFile > size) {
    return false;
  }

  return true;
};

export const imageProcessing = async (file, options) => {
  const opts = {
    type: "image/jpeg",
    quality: 0.8,
    width: 500,
    height: 500,
    scale: 1,
    ...options,
  };

  return compress(file, {
    quality: opts.quality,
    type: opts.mime,
    width: opts.width,
    height: opts.height,
    orientation: 1,
    scale: opts.scale,
  });
};
