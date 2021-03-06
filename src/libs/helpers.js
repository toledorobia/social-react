import { compress } from "image-conversion";
import _ from "lodash";
import cryptojs from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import dayjs from "./dayjs";

export const dateFromNow = (date) => {
  return dayjs(date).fromNow();
};

export const dateFormat = (date, format = "LLLL") => {
  return dayjs(date).format(format);
};

export const generateUniqueId = (suffix = "") => {
  const id = cryptojs
    .MD5(new Date().getTime().toString() + uuidv4())
    .toString();
  return id + (isSomething(suffix) ? suffix : "");
};

export const publicUrl = (path) => {
  // eslint-disable-next-line no-undef
  return process.env.PUBLIC_URL + path;
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isEmptyString = (str) => {
  return (
    _.isUndefined(str) || _.isNull(str) || !_.isString(str) || str.length === 0
  );
};

export const isNothing = (obj) => {
  return _.isUndefined(obj) || _.isNull(obj) || _.isNaN(obj);
};

export const isSomething = (obj) => {
  return !isNothing(obj);
};

export const imageValidation = (file, size = 1000) => {
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
