// Assumes that the elements in arr are in the range from 0 to k
const countingSort = (arr, k) => {
  const sorted = []
  const freqCount = new Array(k + 1).fill(0)

  for (let value of arr) {
    freqCount[value] += 1
  }

  for (let idx in freqCount) {
    while (freqCount[idx]) {
      sorted.push(idx)
      freqCount[idx] -= 1
    }
  }

  return sorted
}

module.exports = countingSort