const cache = new Map();

export const getFromCache = (text) => {
  return cache.get(text);
};

export const saveToCache = (text, result) => {
  cache.set(text, result);
};