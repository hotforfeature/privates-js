(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.createPrivates = factory();
  }
})(this, function() {
  'use strict';

  function clone(obj) {
    const copy = Array.isArray(obj) ? [] : {};
    for (let prop in obj) {
      let value = obj[prop];
      if (typeof value !== 'undefined') {
        if (Array.isArray(value) || typeof value === 'object') {
          value = clone(value);
        }
        copy[prop] = value;
      }
    }
    return copy;
  }

  return function createPrivates(defaults) {
    defaults = defaults || {};

    const map = new WeakMap();
    return function privates(obj) {
      if (!map.has(obj)) {
        map.set(obj, clone(defaults));
      }
      return map.get(obj);
    };
  };
});
