/** @format */

import LinkedList from "../LinkedList";

const linkedList = new LinkedList();

test("linkedList.append()", () => {
    expect(linkedList.append(1).append(2).toArray(true)).toStrictEqual([1, 2]);
});

test("linkedList.prepend()", () => {
    expect(linkedList.prepend(3).prepend(4).toArray(true)).toStrictEqual([4, 3, 1, 2]);
});

test("linkedList.find()", () => {
    expect(linkedList.find({ data: 1 }));
});

test("linkedList.isEmpty()", () => {
    expect(linkedList.isEmpty()).toBe(false);
});
