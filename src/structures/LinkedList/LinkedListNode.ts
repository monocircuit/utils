/**
 * A simple node that holds a piece of data and a connection to its child
 * (neighbour below, to the right).
 *
 * It also possesses a simple `toString()` method to make it simpler to display it
 * on terminal.
 *
 * @format
 * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
 */

class LinkedListNode<D extends unknown> {
    /**
     * A piece of data. The type of which is determined by a generic parameter
     * (in TypeScript).
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    data: D;

    /**
     * The next neighbour below, to the right. This is also an instance of
     * `LinkedListNode()`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    child: LinkedListNode<D>;

    /**
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param data A piece of data that will be held by the node
     * @param child The next node of this one (default value is `null`)
     */
    constructor(data: D, child: LinkedListNode<D> = null) {
        this.data = data;
        this.child = child;
    }

    /**
     * Converts the `LinkedListNode` to a string.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param callback A function that takes data and converts it to a string
     * @returns The `LinkedListNode` as a string
     */
    toString(callback?: (data: D) => string): string {
        return callback ? callback(this.data) : `${this.data}`;
    }
}

export default LinkedListNode;
