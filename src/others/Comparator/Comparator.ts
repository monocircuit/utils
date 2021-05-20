/**
 * Represents a compare function, which is simply a logic function that returns
 * true, false or a neutral (equal) state depending on the input given.
 *
 * @format
 * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
 * @param V The type of the two parameter values
 */
export type CompareFunction<V extends unknown = number | string> = (x: V, y: V) => -1 | 0 | 1

/**
 * An abstraction of the common compare operations. It enables more complex
 * comparisons via a custom compare function.
 *
 * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
 */
class Comparator<V extends unknown = number | string> {
  /**
   * The default compare function treats the passed arguments as strings or as
   * numbers. For more complex values a custom comparison function needs to be
   * passed.
   *
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   * @param x The second comparison subject
   * @param y The second comparison subject
   * @returns A numeric value indicating the comparison result
   */
  static defaultCompare<T extends unknown = number | string>(x: T, y: T): -1 | 0 | 1 {
    if (x === y) return 0

    return x < y ? -1 : 1
  }

  /**
   * The compare function all other operations will be based on.
   *
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   */
  private __compare: CompareFunction<V>

  /**
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   * @param compareFunction An optional custom compare function
   */
  constructor(compareFunction?: CompareFunction<V>) {
    this.__compare = compareFunction ?? Comparator.defaultCompare
  }

  /**
   * Checks if the two arguments passed into the method are equal to each
   * other. This is completely dependend of the specified comparison function.
   *
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   * @param x The second comparison subject
   * @param y The second comparison subject
   * @returns A value indicating the result of the operation
   */
  equalTo(x: V, y: V): boolean {
    return this.__compare(x, y) === 0
  }

  /**
   * Checks if the two arguments passed into the method are less than each
   * other. This is completely dependend of the specified comparison function.
   *
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   * @param x The second comparison subject
   * @param y The second comparison subject
   * @returns A value indicating the result of the operation
   */
  lessThan(x: V, y: V): boolean {
    return this.__compare(x, y) < 0
  }

  /**
   * Checks if the two arguments passed into the method are greater than each
   * other. This is completely dependend of the specified comparison function.
   *
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   * @param x The second comparison subject
   * @param y The second comparison subject
   * @returns A value indicating the result of the operation
   */
  greaterThan(x: V, y: V): boolean {
    return this.__compare(x, y) > 0
  }

  /**
   * Checks if the two arguments passed into the method are less than or equal
   * to each other. This is completely dependend of the specified comparison
   * function.
   *
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   * @param x The second comparison subject
   * @param y The second comparison subject
   * @returns A value indicating the result of the operation
   */
  lessThanOrEqualTo(x: V, y: V): boolean {
    return this.lessThan(x, y) || this.equalTo(x, y)
  }

  /**
   * Checks if the two arguments passed into the method are greater than or
   * equal to each other. This is completely dependend of the specified
   * comparison function.
   *
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   * @param x The second comparison subject
   * @param y The second comparison subject
   * @returns A value indicating the result of the operation
   */
  greaterThanOrEqualTo(x: V, y: V): boolean {
    return this.greaterThan(x, y) || this.equalTo(x, y)
  }

  /**
   * Reverses the comparison function in a way that the two passed arguments
   * are switched.
   *
   * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
   */
  reverse() {
    const originalCompareFunction = this.__compare

    this.__compare = (x: V, y: V) => originalCompareFunction(y, x)
  }
}

export default Comparator
