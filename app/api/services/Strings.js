/**
 * String.js
 *
 * @description :: Check, if a string starts with a certain word/string/charcter
 */
module.exports = {
  startWith: function(a, b){
    return (b.slice(0, a.length)) == a;
  },

  endWith: function(a, b){
    return (b.slice(-a.length)) == a;
  }
};
