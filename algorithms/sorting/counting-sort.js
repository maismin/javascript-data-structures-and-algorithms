// Assumes that the elements in arr are in the range from 0 to k
// Not stable
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

// Stable version of counting sort
const countingSortStable = (arr, k) => {
  const sorted = []
  const freqCount = new Array(k + 1).fill(0)

  // freqCount[i] contains number of elements equal to i
  for (let value of arr) {
    freqCount[value] += 1
  }

  // freqCount[i] contains number of elements less than or equal to i
  for (let i = 1; i < freqCount.length; i++) {
    freqCount[i] += freqCount[i - 1]
  }

  // Loop through elements from array arr backwards and assign based on freqCount
  for (let j = arr.length - 1; j >= 0; j--) {
    sorted[freqCount[arr[j]] - 1]  = arr[j]
    freqCount[arr[j]] -= 1
  }

  return sorted
}

module.exports = countingSort