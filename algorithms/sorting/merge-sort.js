const merge = (arr1, arr2) => {
  const merged = []
  let i = 0
  let j = 0

  while (i < arr1.length || j < arr2.length) {
    let isArr1Depleted = i >= arr1.length
    let isArr2Depleted = j >= arr2.length

    if (!isArr1Depleted && (isArr2Depleted || (arr1[i] < arr2[j]))) {
      merged.push(arr1[i])
      i += 1
    } else {
      merged.push(arr2[j])
      j += 1
    }
  }

  return merged
}

const mergeSort = arr => {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)

  const sortedArr1 = mergeSort(arr.slice(0, mid))
  const sortedArr2 = mergeSort(arr.slice(mid))

  return merge(sortedArr1, sortedArr2)
}

module.exports = mergeSort