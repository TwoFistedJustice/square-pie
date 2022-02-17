const id_matching_regex = /(^\/[\w]*)?/i; // matches the `/${id}` portion

/** @function endpoint_id_replace
 *  replaces the `/${id}` portion of an endpoint. Enables rapid multiple actions with a single class using iteration.
 * @param {string} old_endpoint - the endpoint into which you would like to swap the new id
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */

const endpoint_id_replace = function (old_endpoint, id) {
  let replacement_id = "/" + id;
  return old_endpoint.replace(id_matching_regex, replacement_id);
};

module.exports = endpoint_id_replace;
