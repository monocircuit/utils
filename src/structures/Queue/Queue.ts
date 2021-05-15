/** @format */

import LinkedList from "../LinkedList/LinkedList";

/**
 * A representation of options that can be passed to the `Queue`
 * constructor.
 *
 * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
 */
type QueueConstructorOptions<D extends unknown = number> = Partial<{
    /**
     * An array that will be put in the form of a `Queue` and used as an
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
 * It follows the principle of FIFO (First In First Out).
 *
 * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
 * @spacecomplexity `O(n)`
 */
class Queue<D extends unknown = number> {
    /**
     * The `LinkedList` that serves as a basis of all operations of the `Queue`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    #__linkedList: LinkedList<D>;

    /**
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param options Options that affect the initialization process of the `Queue`.
     */
    constructor(options?: QueueConstructorOptions<D>) {
        this.#__linkedList = new LinkedList(options);
    }

    /**
     * Returns the amout of elements found in the `Queue`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns The length of the `Queue`
     */
    get length(): number {
        return this.#__linkedList.length;
    }

    /**
     * Checks wether or not the `Queue` does not contain any elements. This
     * works based on the `LinkedList` implementation.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns A boolean that indicates wether or not the `Queue` is empty
     */
    isEmpty(): boolean {
        return this.#__linkedList.isEmpty();
    }

    /**
     * Fetches the element that currently sits on the end of the `Queue`.
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
     * Adds a new element with some data to the end of the `Queue`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    enqueue(data: D): void {
        this.#__linkedList.append(data);
    }

    /**
     * Deletes the element at the front of the queue. Which is the head of the
     * internal `LinkedList`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns The data that the deleted element held, or nothing if the
     * `Queue` was empty.
     */
    dequeue(): D | null {
        const removedHead = this.#__linkedList.deleteHead();
        return removedHead ? removedHead.data : null;
    }

    /**
     * Converts the `Queue` to an array. The indices are converted as to be
     * expected.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns An array containing the elements of the `Queue`
     */
    toArray(): D[] {
        return this.#__linkedList.toArray().map(linkedListNode => linkedListNode.data);
    }

    /**
     * Converts the `Queue` to string.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @returns A string containg the stringified data of the queue's elements.
     */
    toString(callback?: (data: D) => string): string {
        return this.#__linkedList.toString(callback);
    }
}

export default Queue;
