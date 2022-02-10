export default function gradeBalanceAggregate(array, grades) {
  // object to be returned
  const result = {};

  // set "result" key of [grade] to zero
  for (const key of grades) {
    result[key] = 0;
  }

  // sum current balances by grade
  while (grades.length > 0) {
    const key = grades.pop();
    for (const item of array) {
      if (item.grade === key) {
        result[key] += parseFloat(item.currentBalance);
      }
    }
  }

  return result;
}
