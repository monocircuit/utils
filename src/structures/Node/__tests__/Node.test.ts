import Node from '../Node';

const node = new Node(0);

test('node.child', () => {
  expect(node.child).toBe(null);
  node.child = new Node(2);
  expect(node.child.data).toBe(2);
});

test('node.toChildrenArray', () => {
  expect(node.toChildrenArray()).toStrictEqual([2]);
  node.child = new Node(3);
  expect(node.toChildrenArray()).toStrictEqual([3]);
});

test('node.childrenPuffer', () => {
  node.childrenPuffer = true;
  node.child = new Node(4);
  expect(node.toChildrenArray()).toStrictEqual([3]);
});

test('node.childrenPufferSize', () => {
  node.childrenPufferSize = 2;
  node.child = new Node(5);
  expect(node.toChildrenArray()).toStrictEqual([5, 3]);
});

test('node.data', () => {
  expect(node.data).toBe(0);
});
