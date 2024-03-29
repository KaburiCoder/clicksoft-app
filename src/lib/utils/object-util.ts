function _removeFalse(obj: any) {
  if (typeof obj === "object") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = removeFalse(obj[key]);
        if (
          !obj[key] ||
          (obj.hasOwnProperty(obj[key]) && Object.keys(obj[key]).length === 0)
        ) {
          delete obj[key];
        }
      }
    }
    if (Object.keys(obj).length === 0) {
      return undefined;
    }
  }
  return obj;
}

export function removeFalse(obj: any) {
  if (!obj) return obj;

  const cloneObj = JSON.parse(JSON.stringify(obj));
  const result = _removeFalse(cloneObj);

  return result;
}
