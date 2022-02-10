export default function isSubObj(subObj, obj) {
  return Object.keys(subObj).every((e) => obj[e] == subObj[e]);
}
