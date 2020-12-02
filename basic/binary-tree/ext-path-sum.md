# 112.路径总和

https://leetcode-cn.com/problems/path-sum/

- [112.路径总和](#112路径总和)
  - [题目描述](#题目描述)
  - [方法 1：递归](#方法-1递归)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)
  - [迭代+队列](#迭代队列)
    - [思路](#思路-1)
    - [复杂度分析](#复杂度分析-1)
    - [代码](#代码-1)

## 题目描述

```
给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明: 叶子节点是指没有子节点的节点。

示例: 
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：递归

### 思路

**大问题**

`F(root, sum)`

**小问题**

`F(root.left, sum - root.val)` 和 `F(root.right, sum - root.val)`

**大问题和小问题的关系**

`F(root, sum) = F(root.left, sum - root.val) or F(root.right, sum - root.val)`

**递归出口**

1. 空节点：返回 false
2. 到达叶子节点：
    - `leaf.val == sum`: 返回 true
    - `leaf.val != sum`: 返回 false

> 注意节点的值和 sum 都可能是负数。

### 复杂度分析

-   时间复杂度：$O(N)$，N 为二叉树的节点总数。
-   空间复杂度：$O(H)$，H 为二叉树的高度。

### 代码

TypeScript Code

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function hasPathSum(root: TreeNode | null, sum: number): boolean {
    if (!root) return false;
    if (!root.left && !root.right) return root.val === sum;
    return (
        hasPathSum(root.left, sum - root.val) ||
        hasPathSum(root.right, sum - root.val)
    );
}
```

## 迭代+队列

### 思路

使用迭代+队列的方式对二叉树进行 BFS，用另一个队列同时记录根节点到当前层次节点的路径和。

### 复杂度分析

-   时间复杂度：$O(N)$，N 为二叉树的节点数。
-   空间复杂度：$O(N)$，N 为二叉树的节点数。空间复杂度主要是队列的开销，队列中的元素个数最多不会超过二叉树的节点数。

### 代码

TypeScript Code

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function hasPathSum(root: TreeNode | null, sum: number): boolean {
    if (!root) return false;

    const queue: TreeNode[] = [root];
    const sums: number[] = [root.val];

    while (true) {
        let len: number = queue.length;
        if (len === 0) break;
        while (len > 0) {
            len--;
            const node: TreeNode = queue.shift() as TreeNode;
            const temp: number = sums.shift() as number;

            if (!node.left && !node.right) {
                if (temp === sum) return true;
                continue;
            }
            if (node.left) {
                queue.push(node.left);
                sums.push(node.left.val + temp);
            }
            if (node.right) {
                queue.push(node.right);
                sums.push(node.right.val + temp);
            }
        }
    }
    return false;
}
```
