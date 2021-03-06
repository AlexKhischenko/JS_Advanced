/*
Task
Intermediate Algorithm Scripting: Sum All Numbers in a Range
We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them. The lowest number will not always come first.
For example, sumAll([4,1]) should return 10 because sum of all the numbers between 1 and 4 (both inclusive) is 10.
*/

/* ---------- Imperative method ---------- */

function sumAll(arr) {
  var min = Math.min(arr[0], arr[1]),
      max = Math.max(arr[0], arr[1]),
      i = min,
      sum = 0;
  for (i; i <= max; i += 1) {
    sum += i;
  }
  return sum;
}

console.log(sumAll([1, 4])); /* should return 10 */
console.log(sumAll([4, 1])); /* should return 10 */
console.log(sumAll([5, 10])); /* should return 45 */
console.log(sumAll([10, 5])); /* should return 45 */
