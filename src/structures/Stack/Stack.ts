/** @format */

import LinkedList from "../LinkedList/LinkedList";

/**
 * A representation of options that can be passed to the `Stack`
 * constructor.
 *
 * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
 */
type StackConstructorOptions<D extends unknown = number> = Partial<{
    /**
     * An array that will be put in the form of a `Stack` and used as an
     * initial value of the instance.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    array: Array<D>;
}>;

/**
 * A linear data structure that is build in a fashion that mostly exposes a
 * BigO notation of `O(1)`
 *
 * It follows the principle of LIFO (Last In First Out).
 *
 * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
 * @spacecomplexity `O(n)`
 */
class Stack<D extends unknown = number> {
    /**
     * The `LinkedList` that serves as a basis of all operations of the `Stack`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    #__linkedList: LinkedList<D>;

    /**
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param options Options that affect the initialization process of the `Stack`.
     */
    constructor(options?: StackConstructorOptions<D>) {
        this.#__linkedList = new LinkedList(options);
    }

    /**
     * Checks wether or not the `Stack` does not contain any elements. This
     * works based on the `LinkedList` implementation.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns A boolean that indicates wether or not the `Stack` is empty
     */
    isEmpty(): boolean {
        return this.#__linkedList.isEmpty();
    }

    /**
     * Fetches the element that currently sits on top of the `Stack`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns The data that the top most element holds
     */
    peek(): D {
        if (this.isEmpty()) {
            return null;
        }

        return this.#__linkedList.head.data;
    }

    /**
     * Adds a new element with some data to the top of the `Stack`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    push(data: D): void {
        this.#__linkedList.prepend(data);
    }

    /**
     * Deletes the top most element of the `Stack`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns The data that the deleted element held, or nothing if the `Stack` was empty.
     */
    pop(): D | null {
        const removedHead = this.#__linkedList.deleteHead();
        return removedHead ? removedHead.data : null;
    }

    /**
     * Converts the `Stack` to an array. The indices are converted as to be
     * expected.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns An array containing the elements of the `Stack`
     */
    toArray(): D[] {
        return this.#__linkedList.toArray().map(linkedListNode => linkedListNode.data);
    }

    /**
     * Converts the `Stack` to string.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns A string containg the stringified data of the stack's elements.
     */
    toString(callback?: (data: D) => string): string {
        return this.#__linkedList.toString(callback);
    }
}

export default Stack;
