export default function typesPossibleGenerate(array, keys) {
  // object to be returned
  const result = {};

  // collect types possible into sets to prevent duplicates
  const typesPossible = {};
  for (const key of keys) {
    typesPossible[key] = new Set();
  }

  // add options to their respective types possible set
  while (keys.length > 0) {
    const key = keys.pop();
    for (const item of array) {
      typesPossible[key].add(item[key].trim());
    }
  }

  // extend types possible sets to arrays and sort
  // then add to results
  for (const [key, val] of Object.entries(typesPossible)) {
    result[key] = [...val].sort();
  }

  return result;
}
