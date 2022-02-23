/** @function clone_object - simple cloner using Object.assign
 * @param {object} william - an object you want to clone
 * @return{object} thomas - a perfect copy of william
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign | MDN Docs}<br>
 * */
const clone_object = function (william) {
  const thomas = Object.assign({}, william);
  return thomas;
};

module.exports = clone_object;
