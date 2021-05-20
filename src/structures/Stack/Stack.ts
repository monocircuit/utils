import LinkedList from '../LinkedList/LinkedList'
import Node from '../Node/Node'

/**
 * A representation of options that can be passed to the `Stack`
 * constructor.
 */
type StackConstructorOptions<D extends unknown = number> = Partial<{
  /**
   * An array that will be put in the form of a `Stack` and used as an
   * initial value of the instance.
   */
  array: Array<D>
}>

/**
 * A linear data structure that is build in a fashion that mostly exposes a
 * BigO notation of `O(1)`
 *
 * It follows the principle of LIFO (Last In First Out).
 *
 * @spacecomplexity `O(n)`
 */
class Stack<D extends unknown = number> {
  /**
   * The `LinkedList` that serves as a basis of all operations of the `Stack`.
   */
  private __linkedList: LinkedList<D>

  /**
   * @param options Options that affect the initialization process of the `Stack`.
   */
  constructor(options?: StackConstructorOptions<D>) {
    this.__linkedList = new LinkedList(options)
  }

  /**
   * Returns the amout of elements found on the `Stack`.
   * @returns The length of the `Stack`
   */
  get length(): number {
    return this.__linkedList.length
  }

  /**
   * Checks wether or not the `Stack` does not contain any elements. This
   * works based on the `LinkedList` implementation.
   *
   * @returns A boolean that indicates wether or not the `Stack` is empty
   */
  isEmpty(): boolean {
    return this.__linkedList.isEmpty()
  }

  /**
   * Fetches the element that currently sits on top of the `Stack`.
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
   * Adds a new element with some data to the top of the `Stack`.
   *
   * @param data A piece of data that will be held by the element on the `Stack`
   * @returns The `Stack` instance
   */
  push(data: D): this {
    this.__linkedList.prepend(data)

    return this
  }

  /**
   * Deletes the top most element of the `Stack`.
   *
   * @returns The data that the deleted element held, or nothing if the `Stack` was empty.
   */
  pop(): D | null {
    const removedHead = this.__linkedList.deleteHead()
    return removedHead ? removedHead.data : null
  }

  /**
   * Converts the `Stack` to an array. The indices are converted as to be
   * expected.
   *
   * @returns An array containing the elements of the `Stack`
   */
  toArray(): D[] {
    return this.__linkedList.toArray(false).map(node => node.data)
  }

  /**
   * Prepends an array to the `Stack` instance.
   *
   * @param data An array of data that will be put on the `Stack`
   * @returns The `Stack` instance
   */
  fromArray(data: D[]): this {
    for (let i = data.length - 1; i >= 0; i -= 1) {
      this.push(data[i])
    }

    return this
  }

  /**
   * Converts the `Stack` to string.
   *
   * @param callback A function that will handle the stringification
   * @returns A string containg the stringified data of the stack's elements.
   */
  toString(callback?: (data: D) => string): string {
    return this.__linkedList.toString(callback)
  }
}

export default Stack
