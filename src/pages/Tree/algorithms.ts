import { TreeNode } from './tree-node'

export type Traversal = {
  preOrder: string[]
  inOrder: string[]
  postOrder: string[]
}

export type TreeResult = {
  zoom: number
  nodes: TreeNode<string>[]
  traversal: Traversal | null
}

const SPACED = 3
const TOP = 10
const ZOOM_DEFAULT = 75

const precedence = (c: string): number =>
  c === '+' || c === '-' ? 1 : c === '*' || c === '/' ? 2 : c === '^' ? 3 : 0

const isOperand = (c: string): boolean => /^[a-z0-9]$/.test(c)

function infixToPostfix(expression: string): TreeNode<string>[] {
  const chars = expression.split('').filter((c) => c !== ' ')
  const postfix: TreeNode<string>[] = []
  const stack: TreeNode<string>[] = []
  let column = 0

  for (const char of chars) {
    column += 1

    if (isOperand(char)) {
      postfix.push(new TreeNode({ value: char, column }))
    } else if (char === '(') {
      column -= 1
      stack.push(new TreeNode({ value: char }))
    } else if (char === ')') {
      column -= 1
      while (stack[stack.length - 1]?.value !== '(') postfix.push(stack.pop()!)
      stack.pop()
    } else {
      while (stack.length && precedence(char) <= precedence(stack[stack.length - 1].value!)) {
        postfix.push(stack.pop()!)
      }
      stack.push(new TreeNode({ value: char, column }))
    }
  }

  while (stack.length) postfix.push(stack.pop()!)
  return postfix
}

function postfixToTree(postfix: TreeNode<string>[]): TreeNode<string> {
  const stack: TreeNode<string>[] = []
  for (const node of postfix) {
    if (isOperand(node.value!)) {
      stack.push(node)
    } else {
      node.right = stack.pop()
      node.left = stack.pop()
      stack.push(node)
    }
  }
  return stack.pop()!
}

function findDistance<T>(root: TreeNode<T> | undefined, id: string): number {
  if (!root) return -1
  if (root.column?.toString() === id) return 0
  const left = findDistance(root.left, id)
  if (left >= 0) return left + 1
  const right = findDistance(root.right, id)
  if (right >= 0) return right + 1
  return -1
}

function updatePosition<T>(
  root: TreeNode<T>,
  node: TreeNode<T>,
  leftBoundary: number,
): TreeNode<T> {
  const distance = findDistance(root, node.column!.toString())
  return node.copy({
    row: distance,
    position: {
      x: leftBoundary + node.column! * SPACED,
      y: TOP - distance * SPACED,
    },
  })
}

function applyPositions<T>(root: TreeNode<T>, node: TreeNode<T> | undefined, lb: number): void {
  if (!node) return
  if (node.left) node.left = updatePosition(root, node.left, lb)
  applyPositions(root, node.left, lb)
  if (node.right) node.right = updatePosition(root, node.right, lb)
  applyPositions(root, node.right, lb)
}

export function preOrder(root: TreeNode<string> | undefined, cb: (n: TreeNode<string>) => void): void {
  if (!root) return
  cb(root)
  preOrder(root.left, cb)
  preOrder(root.right, cb)
}

export function inOrder(root: TreeNode<string> | undefined, cb: (n: TreeNode<string>) => void): void {
  if (!root) return
  inOrder(root.left, cb)
  cb(root)
  inOrder(root.right, cb)
}

export function postOrder(root: TreeNode<string> | undefined, cb: (n: TreeNode<string>) => void): void {
  if (!root) return
  postOrder(root.left, cb)
  postOrder(root.right, cb)
  cb(root)
}

export function buildTree(rawExpression: string): TreeResult {
  const parens = rawExpression.match(/[()]/g)
  const cleaned = rawExpression.replace(/[()]/g, '')
  const balanced = parens === null || parens.length % 2 === 0

  if (cleaned.length < 3 && !balanced) return { zoom: 0, nodes: [], traversal: null }
  if (cleaned.length === 0) return { zoom: 0, nodes: [], traversal: null }

  const leftBoundary = -(cleaned.length * 3.25) / 2

  const tree = postfixToTree(infixToPostfix(rawExpression))
  applyPositions(tree, tree, leftBoundary)
  const positioned = updatePosition(tree, tree, leftBoundary)

  const pre: string[] = [], inO: string[] = [], post: string[] = []
  preOrder(positioned, (n) => pre.push(n.value!))
  inOrder(positioned, (n) => inO.push(n.value!))
  postOrder(positioned, (n) => post.push(n.value!))

  const nodes: TreeNode<string>[] = []
  inOrder(positioned, (n) => nodes.push(n))

  const zoomCalc = (cleaned.length / (ZOOM_DEFAULT * 1.3)) * 100
  const zoom = zoomCalc < ZOOM_DEFAULT ? ZOOM_DEFAULT : zoomCalc

  return { zoom, nodes, traversal: { preOrder: pre, inOrder: inO, postOrder: post } }
}
