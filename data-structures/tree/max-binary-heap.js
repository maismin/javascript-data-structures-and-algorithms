/**
 * Class representing a max binary heap
 *
 * @class MaxBinaryHeap
 */
class MaxBinaryHeap {
  /**
   * Creates an instance of MaxBinaryHeap
   * 
   * @memberof MaxBinaryHeap
   */
  constructor() {
    this.arr = []
    this.length = this.arr.length
    this.heapSize = 0
  }

  /**
   * Returns the parent index of the given index
   *
   * @param {number} index
   * @returns {number}
   * @memberof MaxBinaryHeap
   */
  parent(index) {
    return Math.floor((index - 1) / 2)
  }

  /**
   * Returns the index of the left subtree of the given index
   *
   * @param {number} index
   * @returns {number}
   * @memberof MaxBinaryHeap
   */
  left(index) {
    return (2 * index) + 1
  }

  /**
   * Returns the index of the right subtree of the given index
   *
   * @param {number} index
   * @returns {number}
   * @memberof MaxBinaryHeap
   */
  right(index) {
    return (2 * index) + 2
  }

  /**
   * Maintain the max-heap property of the node at given index
   * Running time of O(h) where h is the height of the tree
   * 
   * @param {*} index
   * @memberof MaxBinaryHeap
   */
  maxHeapify(index) {
    /* Assume the binary trees rooted at left(index) and right(index)
     * are max-heaps, but arr[index] might be smaller than children, which
     * violates the max-heap property. This method lets the value at arr[index]
     * float down in the max-heap to maintain the property
     */
    const left = this.left(index)
    const right = this.right(index)
    let largest

    // Find which node is the largest
    if (left < this.heapSize && this.arr[left] > this.arr[index]) {
      largest = left
    } else {
      largest = index
    }
    if (right < this.heapSize && this.arr[right] > this.arr[largest]) {
      largest = right
    }

    // Swap the element at index position with the largest, and call maxHeapify to ensure
    // the max-heap property is maintained
    if (largest !== index) {
      const tmp = this.arr[index]
      this.arr[index] = this.arr[largest]
      this.arr[largest] = tmp
      this.maxHeapify(largest)
    }
  }

  /**
   * Builds the max-heap
   * Running time of O(n)
   *
   * @param {*} arr
   * @memberof MaxBinaryHeap
   */
  buildMaxHeap(arr) {
    this.arr = arr
    this.length = this.arr.length
    this.heapSize = this.arr.length
    for (let i = Math.floor(this.length/2) - 1; i >= 0; i--) {
      this.maxHeapify(i)
    }
  }

  /**
   * Return the maximum value in the heap
   *
   * @returns
   * @memberof MaxBinaryHeap
   */
  maximum() {
    if (this.heapSize === 0) {
      return undefined
    }
    return this.arr[0]
  }

  /**
   * Remove and return the element with the largest value
   * Running time  of O(log n)
   *
   * @returns 
   * @memberof MaxBinaryHeap
   */
  extractMax() {
    if (this.heapSize < 1) {
      throw new Error('heap underflow')
    }

    const max = this.maximum()

    this.arr[0] = this.arr[this.heapSize - 1]
    this.heapSize -= 1
    this.arr.pop()
    this.length = this.arr.length
    this.maxHeapify(0)

    return max
  }
  
  /**
   * Increase the value of element at index position
   * Running time of O(log n)
   *
   * @param {number} index
   * @param {*} value
   * @memberof MaxBinaryHeap
   */
  increaseValue(index, value) {
    if (value < this.arr[index]) {
      throw new Error('new value is smaller than current value')
    }
    this.arr[index] = value
    while (index > 0 && this.arr[this.parent(index)]  < this.arr[index]) {
      const tmp = this.arr[index]
      this.arr[index] = this.arr[this.parent(index)]
      this.arr[this.parent(index)] = tmp
      index = this.parent(index)
    }
  }

  /**
   * Add element into heap
   * Running time of O(log n)
   *
   * @param {*} value
   * @memberof MaxBinaryHeap
   */
  insert(value) {
    this.arr.push(-Infinity)
    this.length = this.arr.length
    this.heapSize += 1
    this.increaseValue(this.heapSize - 1, value)
  }
}

module.exports = MaxBinaryHeap