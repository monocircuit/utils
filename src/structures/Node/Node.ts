/**
 * Represents a function that converts data into a string. It is used as an
 * alternative string conversion method opposed to `${data}`.
 *
 * @generic `D` The type of data that will be stored in the `Node`
 */
export type ToStringCallback<D extends unknown> = (data: D) => string

/**
 * A simple node that holds a piece of data and an array of connected children.
 * It also possess a simple `toString` method.
 *
 * @generic `D` The type of data that will be stored in the `Node`
 */
class Node<D extends unknown> {
  /**
   * A piece of data. The type of which is determined by a generic (at least
   * in Typescript).
   */
  data: D

  /**
   * Connections to children that are also instances of `Node`.
   */
  children: (Node<D> | null)[] = []

  /**
   * Holds the value for wether or not the children puffer should be enabled.
   * Meaning if the array should expand when a child is added.
   *
   * The default value is false, since this is the way a `LinkedList` works.
   */
  childrenPuffer = false

  /**
   * Holds the size of the children puffer. Meaning the maximum size of the
   * children array.
   *
   * This is only relevant if the `childrenPuffer` is enabled.
   */
  childrenPufferSize = 1

  /**
   * @param data A piece of data that will be held by the `Node`
   * @param children A rest array that contains all connections to other `Nodes`
   */
  constructor(data: D, ...children: (Node<D> | null)[]) {
    this.data = data

    children.filter(child => child).forEach(child => this.children.push(child as Node<D>))
  }

  /**
   * Returns the first child that was specified in the children array.
   *
   * Sets the first element of the children array equal to the passed child.
   */
  get child(): Node<D> | null {
    return this.children[0] ?? null
  }

  set child(child: Node<D> | null) {
    if (!this.childrenPuffer) {
      this.children = [child]
    } else if (this.childrenPuffer && this.childrenPufferSize >= this.children.length + 1) {
      this.children = [child, ...this.children]
    }
  }

  /**
   * Converts the `Node` to a string. It simply takes the stored data to a
   * string and returns it.
   *
   * @param callback A function that takes data and converts it to a string
   * @returns The `Node` as a string
   */
  toString(callback?: ToStringCallback<D>): string {
    return callback ? callback(this.data) : `${this.data}`
  }

  /**
   * Converts the children array of instances of `Node` into an array that
   * only contains their data.
   *
   * @returns An array of the data the children contain
   */
  toChildrenArray(): (D | null)[] {
    return this.children.map(child => (child ? child.data : null))
  }
}

export default Node
