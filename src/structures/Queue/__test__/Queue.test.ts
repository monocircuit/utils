/** @format */

import Queue from "../Queue";

const queue = new Queue();

test("queue.enqueue()", () => {
    expect(queue.enqueue(0).toArray()).toStrictEqual([0]);
});

test("queue.toArray()", () => {
    expect(queue.enqueue(1).toArray()).toStrictEqual([0, 1]);
});

test("queue.length", () => {
    expect(queue.length).toBe(2);
});

test("queue.dequeue()", () => {
    expect(queue.dequeue()).toBe(0);
    expect(queue.toArray()).toStrictEqual([1]);
});

test("queue.isEmpty()", () => {
    expect(queue.isEmpty()).toBe(false);
    queue.dequeue();
    expect(queue.isEmpty()).toBe(true);
});

test("queue.peek()", () => {
    expect(queue.peek()).toBe(null);
    queue.enqueue(3);
    expect(queue.peek()).toBe(3);
    queue.enqueue(4);
    expect(queue.peek()).toBe(3);
});

test("queue.toString()", () => {
    expect(queue.toString()).toBe("3,4");
});

test("queue.fromArray()", () => {
    expect(queue.fromArray([1, 2, 3]).toArray()).toStrictEqual([3, 4, 1, 2, 3]);
});

test("stack.constructor.fromArray()", () => {
    const queue = new Queue({ array: [1, 2, 3] });
    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
});
