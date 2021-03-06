import LinkedList from '../LinkedList/LinkedList'
import Node from '../Node/Node'

/**
 * A representation of options that can be passed to the `Queue`
 * constructor.
 */
type QueueConstructorOptions<D extends unknown = number> = Partial<{
  /**
   * An array that will be put in the form of a `Queue` and used as an
   * initial value of the instance.
   */
  array: Array<D>
}>

/**
 * A linear data structure that is build in a fashion that mostly exposes a
 * BigO notation of `O(1)`
 *
 * It follows the principle of FIFO (First In First Out).
 *
 * @spacecomplexity `O(n)`
 */
class Queue<D extends unknown = number> {
  /**
   * The `LinkedList` that serves as a basis of all operations of the `Queue`.
   */
  private __linkedList: LinkedList<D>

  /**
   * @param options Options that affect the initialization process of the `Queue`.
   */
  constructor(options?: QueueConstructorOptions<D>) {
    this.__linkedList = new LinkedList(options)
  }

  /**
   * Returns the amout of elements found in the `Queue`.
   *
   * @returns The length of the `Queue`
   */
  get length(): number {
    return this.__linkedList.length
  }

  /**
   * Checks wether or not the `Queue` does not contain any elements. This
   * works based on the `LinkedList` implementation.
   *
   * @returns A boolean that indicates wether or not the `Queue` is empty
   */
  isEmpty(): boolean {
    return this.__linkedList.isEmpty()
  }

  /**
   * Fetches the element that currently sits on the end of the `Queue`.
   *
   * @returns The data that the top most element holds
   */
  peek(): D | null {
    if (this.isEmpty()) {
      return null
    }

    return (this.__linkedList.head as Node<D>).data
  }

  /**
   * Adds a new element with some data to the end of the `Queue`.
   *
   * @param data A piece of data that will be held by the element in the `Queue`
   * @returns The `Queue` instance
   */
  enqueue(data: D): this {
    this.__linkedList.append(data)

    return this
  }

  /**
   * Deletes the element at the front of the queue. Which is the head of the
   * internal `LinkedList`.
   *
   * @returns The data that the deleted element held, or nothing if the
   * `Queue` was empty.
   */
  dequeue(): D | null {
    const removedHead = this.__linkedList.deleteHead()
    return removedHead ? removedHead.data : null
  }

  /**
   * Converts the `Queue` to an array. The indices are converted as to be
   * expected.
   *
   * @returns An array containing the elements of the `Queue`
   */
  toArray(): D[] {
    return this.__linkedList.toArray(false).map(node => node.data)
  }

  /**
   * Appends an array to the `Queue` instance. This is done using the
   * `fromArray()` method of the `LinkedList`.
   *
   * @param data An array of data that will be enqueued
   * @returns The `Queue` instance
   */
  fromArray(data: D[]): this {
    this.__linkedList.fromArray(data)

    return this
  }

  /**
   * Converts the `Queue` to string.
   *
   * @param callback A function that will handle the stringification
   * @returns A string containg the stringified data of the queue's elements.
   */
  toString(callback?: (data: D) => string): string {
    return this.__linkedList.toString(callback)
  }
}

export default Queue
