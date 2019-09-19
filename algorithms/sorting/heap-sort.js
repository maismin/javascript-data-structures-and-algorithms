const MaxBinaryHeap = require('../../data-structures/tree/max-binary-heap')


const heapSort = arr => {
  const maxBinaryHeap = new MaxBinaryHeap()
  maxBinaryHeap.buildMaxHeap(arr)
  for (let i = maxBinaryHeap.length - 1; i >= 1; i--) {
    const tmp = maxBinaryHeap.arr[0]
    maxBinaryHeap.arr[0] = maxBinaryHeap.arr[i]
    maxBinaryHeap.arr[i] = tmp
    maxBinaryHeap.heapSize -= 1
    maxBinaryHeap.maxHeapify(0)
  }
  arr = maxBinaryHeap.arr
}

module.exports = heapSort