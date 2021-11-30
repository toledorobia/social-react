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

export const firebaseDocToObject = (doc, extraData = {}) => {
  if (doc == null) {
    return null;
  }

  let d = doc.data();
  let id = doc.id;
  return { ...d, ...extraData, id };
};
