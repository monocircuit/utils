/** @format */

import Stack from "../Stack";

const stack = new Stack();

test("stack.push()", () => {
    expect(stack.push(0).toArray()).toStrictEqual([0]);
});

test("stack.toArray()", () => {
    expect(stack.push(1).toArray()).toStrictEqual([1, 0]);
});

test("stack.length", () => {
    expect(stack.length).toBe(2);
});

test("stack.pop()", () => {
    expect(stack.pop()).toBe(1);
    expect(stack.toArray()).toStrictEqual([0]);
});

test("stack.isEmpty()", () => {
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
});

test("stack.peek()", () => {
    expect(stack.peek()).toBe(null);
    stack.push(3);
    expect(stack.peek()).toBe(3);
});

test("stack.toString()", () => {
    expect(stack.toString()).toBe("3");
    stack.push(2);
    expect(stack.toString()).toBe("2,3");
});

test("stack.fromArray()", () => {
    expect(stack.fromArray([1, 2, 3]).toArray()).toStrictEqual([1, 2, 3, 2, 3]);
});

test("stack.constructor.fromArray()", () => {
    const stack = new Stack({ array: [1, 2, 3] });
    expect(stack.toArray()).toStrictEqual([1, 2, 3]);
});
