export default function isSubArray(array, subArray) {
  // returns true if subArray is a subset of array
  return subArray.every(function (element) {
    return array.includes(element);
  });
}
