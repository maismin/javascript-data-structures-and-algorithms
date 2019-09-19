const PriorityNode = require('../node/priority-node')
/**
 * Class representing a min binary heap
 *
 * @class MinBinaryHeap
 */
class MinBinaryHeap {
  /**
   * Creates an instance of MinBinaryHeap
   * 
   * @memberof MinBinaryHeap
   */
  constructor() {
    this.arr = []
    this.length = this.arr.length
    this.heapSize = 0
    this.pointer = {}
  }

  /**
   * Returns the parent index of the given index
   *
   * @param {number} index
   * @returns {number}
   * @memberof MinBinaryHeap
   */
  parent(index) {
    return Math.floor((index - 1) / 2)
  }

  /**
   * Returns the index of the left subtree of the given index
   *
   * @param {number} index
   * @returns {number}
   * @memberof MinBinaryHeap
   */
  left(index) {
    return (2 * index) + 1
  }

  /**
   * Returns the index of the right subtree of the given index
   *
   * @param {number} index
   * @returns {number}
   * @memberof MinBinaryHeap
   */
  right(index) {
    return (2 * index) + 2
  }

  /**
   * Maintain the max-heap property of the node at given index
   * Running time of O(h) where h is the height of the tree
   * 
   * @param {*} index
   * @memberof MinBinaryHeap
   */
  minHeapify(index) {
    /* Assume the binary trees rooted at left(index) and right(index)
     * are max-heaps, but arr[index] might be smaller than children, which
     * violates the max-heap property. This method lets the value at arr[index]
     * float down in the max-heap to maintain the property
     */
    const left = this.left(index)
    const right = this.right(index)
    let largest

    // Find which node is the largest
    if (left < this.heapSize && this.arr[left] < this.arr[index]) {
      largest = left
    } else {
      largest = index
    }
    if (right < this.heapSize && this.arr[right] < this.arr[largest]) {
      largest = right
    }

    // Swap the element at index position with the largest, and call minHeapify to ensure
    // the max-heap property is maintained
    if (largest !== index) {
      [this.arr[index], this.arr[largest]] = [this.arr[largest], this.arr[index]]

      this.pointer[this.arr[largest].name] = largest
      this.pointer[this.arr[index].name] = index

      this.minHeapify(largest)
    }
  }

  /**
   * Builds the max-heap
   * Running time of O(n)
   *
   * @param {*} arr
   * @memberof MinBinaryHeap
   */
  buildMinHeap(arr) {
    this.arr = arr

    this.pointer = {}
    for (let idx in arr) {
      this.pointer[this.arr[idx].name] = idx
    }

    this.length = this.arr.length
    this.heapSize = this.arr.length
    for (let i = Math.floor(this.length/2) - 1; i >= 0; i--) {
      this.minHeapify(i)
    }
  }

  /**
   * Return the minimum value in the heap
   *
   * @returns
   * @memberof MinBinaryHeap
   */
  minimum() {
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
   * @memberof MinBinaryHeap
   */
  extractMin() {
    if (this.heapSize < 1) {
      throw new Error('heap underflow')
    }

    const node = this.minimum()
    delete this.pointer[node.name]
    this.arr[0] = this.arr[this.heapSize - 1]
    this.pointer[this.arr[0].name] = 0
    this.heapSize -= 1
    this.arr.pop()
    this.length = this.arr.length
    this.minHeapify(0)

    return node
  }
  
  /**
   * Decrease the value of element at index position
   * Running time of O(log n)
   *
   * @param {number} index
   * @param {*} value
   * @memberof MinBinaryHeap
   */
  decreasePriority(index, value) {
    if (value > this.arr[index]) {
      throw new Error('new value is bigger than current value')
    }

    this.arr[index].priority = value
    while (index > 0 && this.arr[this.parent(index)] > this.arr[index]) {
      // swap
      [this.arr[index], this.arr[this.parent(index)]] = [this.arr[this.parent(index)], this.arr[index]]
      
      // update pointer
      this.pointer[this.arr[index].name] = index
      this.pointer[this.arr[this.parent(index)].name] = this.parent(index)

      index = this.parent(index)
    }
  }

  /**
   * Add element into heap
   * Running time of O(log n)
   *
   * @param {String} name
   * @param {number} value
   * @memberof MinBinaryHeap
   */
  insert(name, value) {
    this.arr.push(new PriorityNode(name, Infinity))
    this.length = this.arr.length
    this.heapSize += 1
    this.pointer[name] = this.heapSize - 1
    this.decreasePriority(this.heapSize - 1, value)
  }
}

module.exports = MinBinaryHeap