'use strict';

const keyPrefix = 'dough-web-app';

/* Get an item from local storage.
  ARGS:
    key: (string)
    defaultValue: (string) value to return if item not found

  RETURN:
    (string) return the item from local storage or defaultValue if specified ot null
*/
const getItem = (key, defaultValue) => {
  if (typeof defaultValue === 'undefined') defaultValue = null;
  let item = localStorage.getItem(keyPrefix + key);
  return item === null ? defaultValue : item;
};

/* Set an item in local storage.
  ARGS:
    key: (string)
    value: (string)
*/
const setItem = (key, value) => {
  localStorage.setItem(keyPrefix + key, value);
};

/* Remove an item from local storage.
  ARGS:
    key: (string)
*/
const removeItem = (key) => {
  localStorage.removeItem(keyPrefix + key);
};

export default {
  getItem,
  setItem,
  removeItem,
};
