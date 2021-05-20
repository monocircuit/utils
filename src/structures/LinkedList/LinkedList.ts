import Node from '../Node/Node'
import Comparator, { CompareFunction } from '../../others/Comparator/Comparator'

/**
 * A representation of options that can be passed to the `LinkedList`
 * constructor.
 *
 * @param D The type of data that will be stored in the `LinkedList`
 */
type LinkedListConstructorOptions<D extends unknown = number> = Partial<{
  /**
   * A custom compare function that will be used to make comparisons to the
   * objects stored in the `LinkedList`.
   */
  compareFunction: CompareFunction<D>

  /**
   * An array that will be put in the form of a `LinkedList` and used as an
   * initial value of the instance.
   */
  array: Array<D>
}>

/**
 * A linear data structure that is build in a fashion that mostly exposes a
 * BigO notation of `O(n)`
 *
 * @spacecomplexity `O(n)`
 */
class LinkedList<D extends unknown = number> {
  /**
   * The first node of the `LinkedList`.
   */
  head: Node<D> | null = null

  /**
   * The last node of the `LinkedList`.
   */
  tail: Node<D> | null = null

  /**
   * The internal length counter that will be linked to by the `length` getter
   * property of `LinkedList`.
   */
  private __length = 0

  /**
   * The `Comparator` instance that powers all comparison tasks of this
   * `LinkedList`.
   */
  private __compare: Comparator<D>

  /**
   * @param compareFunction The compare function that will be passed to a `Comparator`.
   */
  constructor(options?: LinkedListConstructorOptions<D>) {
    this.__compare = new Comparator((options ?? {}).compareFunction)

    if (options && options.array) this.fromArray(options.array)
  }

  /**
   * The length of the `LinkedList`. Behaves exactly like the `length`
   * property of an array.
   */
  get length(): number {
    return this.__length
  }

  /**
   * Checks if the `LinkedList` does not contain any `Node`s. In
   * other words returns a boolean that indicates wether or not the
   * `LinkedList` is empty.
   *
   * @returns A boolean that indicates wether or not the `LinkedList` is empty
   */
  isEmpty(): boolean {
    return !this.head
  }

  /**
   * Adds a node to the start of the `LinkedList`.
   *
   * @param data A piece of data that will be held by the `Node`
   * @timecomplexity ``O(1)``
   * @returns The `LinkedList` instance
   */
  prepend(data: D): this {
    const newNode = new Node(data, this.head)
    this.head = newNode

    if (!this.tail) {
      this.tail = this.head
    }

    this.__length += 1

    return this
  }

  /**
   * Adds a node to the end of the `LinkedList`.
   *
   * @param data A piece of data that will be held by the `Node`
   * @timecomplexity ``O(1)``
   * @returns The `LinkedList` instance
   */
  append(data: D): this {
    const newNode = new Node(data)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      this.__length += 1

      return this
    }

    ;(this.tail as Node<D>).child = newNode
    this.tail = newNode

    this.__length += 1

    return this
  }

  /**
   * Removes all nodes that hold the same data passed as an argument.
   *
   * @param data A piece of data that the `Node` will be checked against
   * @timecomplexity `O(n)`
   * @returns The deleted `Node`
   */
  delete(data: D): Node<D> | null {
    if (!this.head) {
      return null
    }

    let deletedNode = null

    while (this.head && this.__compare.equalTo(this.head.data, data)) {
      deletedNode = this.head
      this.head = this.head.child

      this.__length -= 1
    }

    let currentNode = this.head

    if (currentNode !== null) {
      while (currentNode.child) {
        if (this.__compare.equalTo(currentNode.child.data, data)) {
          deletedNode = currentNode.child
          currentNode.child = currentNode.child.child

          this.__length -= 1
        } else {
          currentNode = currentNode.child
        }
      }
    }

    if (this.__compare.equalTo((this.tail as Node<D>).data, data)) {
      this.tail = currentNode

      this.__length -= 1
    }

    return deletedNode
  }

  /**
   * Removes all nodes that hold the same data passed as an argument.
   *
   * @param data A piece of data that the `Node` will be checked against
   * @param callback A function that can filter the results
   * @timecomplexity `O(n)`
   * @returns The seeked data, or if it could not find anything `null`
   */
  find({ data, callback }: { data?: D; callback?: (d: D) => boolean }): Node<D> | D | null {
    if (!this.head) {
      return null
    }

    let currentNode = this.head as Node<D> | null

    while (currentNode) {
      if (callback && callback(currentNode.data)) {
        return currentNode
      }

      if (data !== undefined && this.__compare.equalTo(currentNode.data, data)) {
        return currentNode.data
      }

      currentNode = currentNode.child
    }

    return null
  }

  /**
   * Deletes the last node on the `LinkedList`.
   *
   * @timecomplexity `O(n)`
   * @returns The deleted `Node`
   */
  deleteTail(): Node<D> | null {
    const deletedTail = this.tail

    if (this.head === this.tail) {
      this.head = null
      this.tail = null

      return deletedTail
    }

    let currentNode = this.head

    if (currentNode) {
      while (currentNode.child) {
        if (!currentNode.child.child) {
          currentNode.child = null
        } else {
          currentNode = currentNode.child
        }
      }

      this.tail = currentNode

      this.__length -= 1

      return deletedTail
    }

    return null
  }

  /**
   * Deletes the first node on the `LinkedList`.
   *
   * @timecomplexity `O(1)`
   * @returns The deleted `Node`
   */
  deleteHead(): Node<D> | null {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.child) {
      this.head = this.head.child
    } else {
      this.head = null
      this.tail = null
    }

    this.__length -= 1

    return deletedHead
  }

  /**
   * Converts the an `Array()` to a `LinkedList`.
   *
   * @param data An array containing the correct type of data
   * @timecomplexity ``O(n)``
   * @returns The `LinkedList` instance
   */
  fromArray(data: D[]): this {
    data.forEach(d => this.append(d))

    return this
  }

  /**
   * Converts the `LinkedList` to an `Array()`.
   *
   * @param dataOnly Specifies if only the data of the `Nodes` should be put into the array
   * @timecomplexity `O(n)`
   * @returns The `LinkedList` as an array
   */
  toArray<B extends boolean>(dataOnly?: B): B extends true ? D[] : Node<D>[] {
    const nodes = []

    let currentNode = this.head

    while (currentNode) {
      if (dataOnly) nodes.push(currentNode.data)
      else nodes.push(currentNode)

      currentNode = currentNode.child
    }

    return nodes as B extends true ? D[] : Node<D>[]
  }

  /**
   * Converts the `LinkedList` to an string.
   *
   * @timecomplexity ``O(n)``
   * @returns The `LinkedList` as a string
   */
  toString(callback?: (data: D) => string): string {
    return this.toArray(false)
      .map(node => node.toString(callback))
      .toString()
  }

  /**
   * Reverses the order of the `LinkedList`
   *
   * @timecomplexity ``O(n)``
   * @returns The `LinkedList` instance
   */
  reverse(): this {
    let currentNode = this.head
    let previousNode = null
    let nextNode = null

    while (currentNode) {
      nextNode = currentNode.child

      currentNode.child = previousNode

      previousNode = currentNode
      currentNode = nextNode
    }

    this.tail = this.head
    this.head = previousNode

    return this
  }
}

export default LinkedList
