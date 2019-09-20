const swap = (arr, i, j) => {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomPartition = (arr, left, right) => {
  const i = getRandomIntInclusive(left, right)
  swap(arr, i, right)
  return partition(arr, left, right)
}

const partition = (arr, left, right) => {
  // pick pivot from the end
  const pivot = arr[right]
  
  // i is the index that increases as we find elements <= pivot
  let i = left - 1
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i += 1
      swap(arr, i, j)
    }
  }
  const pivotIndex = i + 1
  swap(arr, pivotIndex, right)
  return pivotIndex
}

const quickSortHelper = (arr, left, right) => {
  if (left < right) {
    const pivotIndex = randomPartition(arr, left, right)
    quickSortHelper(arr, left, pivotIndex - 1)
    quickSortHelper(arr, pivotIndex + 1, right)
  }
}

const quickSort = (arr) => {
  quickSortHelper(arr, 0, arr.length - 1)
}

module.exports = quickSort