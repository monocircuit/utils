/** @format */

import LinkedListNode from "./LinkedListNode";
import Comparator from "../../others/Comparator/Comparator";
import { CompareFunction } from "../../others/Comparator/Comparator";

/**
 * A linear data structure that is build in a fashion that mostly exposes a
 * BigO notation of `O(n)`
 *
 * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
 * @spacecomplexity `O(n)`
 */
class LinkedList<D extends unknown = number> {
    /**
     * The first node of the `LinkedList()`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    #__head: LinkedListNode<D> = null;

    /**
     * The last node of the `LinkedList()`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    #__tail: LinkedListNode<D> = null;

    /**
     * The `Comparator()` instance that powers all comparison tasks of this
     * `LinkedList()`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     */
    #__compare: Comparator<D>;

    /**
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param compareFunction The compare function that will be passed to a `Comparator()`.
     */
    constructor(compareFunction?: CompareFunction<D>) {
        this.#__compare = new Comparator(compareFunction);
    }

    /**
     * Adds a node to the start of the ``LinkedList()``.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param data A piece of data that will be held by the `LinkedListNode()`
     * @timecomplexity ``O(1)``
     */
    prepend(data: D) {
        const newNode = new LinkedListNode(data, this.#__head);
        this.#__head = newNode;

        if (!this.#__tail) {
            this.#__tail = this.#__head;
        }

        return this;
    }

    /**
     * Adds a node to the end of the ``LinkedList()``.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param data A piece of data that will be held by the `LinkedListNode()`
     * @timecomplexity ``O(1)``
     */
    append(data: D) {
        const newNode = new LinkedListNode(data);

        if (!this.#__head) {
            this.#__head = newNode;
            this.#__tail = newNode;

            return this;
        }

        this.#__tail.child = newNode;
        this.#__tail = newNode;

        return this;
    }

    /**
     * Removes all nodes that hold the same data passed as an argument.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param data A piece of data that the `LinkedListNode()` will be checked against
     * @timecomplexity `O(n)`
     */
    delete(data: D) {
        if (!this.#__head) {
            return null;
        }

        let deletedNode = null;

        while (this.#__head && this.#__compare.equalTo(this.#__head.data, data)) {
            deletedNode = this.#__head;
            this.#__head = this.#__head.child;
        }

        let currentNode = this.#__head;

        if (currentNode !== null) {
            while (currentNode.child) {
                if (this.#__compare.equalTo(currentNode.child.data, data)) {
                    deletedNode = currentNode.child;
                    currentNode.child = currentNode.child.child;
                } else {
                    currentNode = currentNode.child;
                }
            }
        }

        if (this.#__compare.equalTo(this.#__tail.data, data)) {
            this.#__tail = currentNode;
        }

        return deletedNode;
    }

    /**
     * Removes all nodes that hold the same data passed as an argument.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param data A piece of data that the `LinkedListNode()` will be checked against
     * @param callback A function that can filter the results
     * @timecomplexity `O(n)`
     */
    find({ data, callback }: { data: D; callback: (data: D) => boolean }) {
        if (!this.#__head) {
            return null;
        }

        let currentNode = this.#__head;

        while (currentNode) {
            if (callback && callback(currentNode.data)) {
                return currentNode;
            }

            if (data !== undefined && this.#__compare.equalTo(currentNode.data, data)) {
                return currentNode.data;
            }

            currentNode = currentNode.child;
        }

        return null;
    }

    /**
     * Deletes the last node on the `LinkedList()`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @timecomplexity ``O(n)``
     */
    deleteTail() {
        const deletedTail = this.#__tail;

        if (this.#__head === this.#__tail) {
            this.#__head = null;
            this.#__tail = null;

            return deletedTail;
        }

        let currentNode = this.#__head;

        while (currentNode.child) {
            if (!currentNode.child.child) {
                currentNode.child = null;
            } else {
                currentNode = currentNode.child;
            }
        }

        this.#__tail = currentNode;

        return deletedTail;
    }

    /**
     * Deletes the first node on the `LinkedList()`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @timecomplexity ``O(1)``
     */
    deleteHead() {
        if (!this.#__head) {
            return null;
        }

        const deletedHead = this.#__head;

        if (this.#__head.child) {
            this.#__head = this.#__head.child;
        } else {
            this.#__head = null;
            this.#__tail = null;
        }

        return deletedHead;
    }

    /**
     * Converts the an `Array()` to a `LinkedList()`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @param data An array containing the correct type of data
     * @timecomplexity ``O(n)``
     */
    fromArray(data: D[]) {
        data.forEach(d => this.append(d));

        return this;
    }

    /**
     * Converts the `LinkedList()` to an `Array()`.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @timecomplexity ``O(n)``
     */
    toArray() {
        const nodes = [];

        let currentNode = this.#__head;

        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.child;
        }

        return nodes;
    }

    /**
     * Converts the `LinkedList()` to an string.
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @timecomplexity ``O(n)``
     */
    toString(callback?: (data: D) => string) {
        return this.toArray()
            .map(node => node.toString(callback))
            .toString();
    }

    /**
     * Reverses the order of the `LinkedList()`
     *
     * @author lukasdiegelmann <lukas.j.diegelmann@gmail.com>
     * @timecomplexity ``O(n)``
     */
    reverse() {
        let currentNode = this.#__head;
        let previousNode = null;
        let nextNode = null;

        while (currentNode) {
            nextNode = currentNode.child;

            currentNode.child = previousNode;

            previousNode = currentNode;
            currentNode = nextNode;
        }

        this.#__tail = this.#__head;
        this.#__head = previousNode;

        return this;
    }
}

export default LinkedList;
