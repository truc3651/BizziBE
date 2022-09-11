Array.prototype.customFilter = function (length, fn) {
  const filtered = [];

  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      filtered.push(this[i]);
    }
    if (filtered.length === length) return filtered;
  }

  return filtered;
};
