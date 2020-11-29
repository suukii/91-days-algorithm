# 404.左叶子之和

https://leetcode-cn.com/problems/sum-of-left-leaves

- [404.左叶子之和](#404左叶子之和)
    - [题目描述](#题目描述)
  - [方法 1：递归](#方法-1递归)
    - [思路](#思路)
    - [复杂度](#复杂度)
    - [代码](#代码)
  - [方法 2：迭代+栈](#方法-2迭代栈)
    - [思路](#思路-1)
    - [复杂度](#复杂度-1)
    - [代码](#代码-1)

### 题目描述

```
计算给定二叉树的所有左叶子之和。

示例：

    3
   / \
  9  20
    /  \
   15   7

在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sum-of-left-leaves
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：递归

### 思路

根据题意，我们要找到所有 `左叶子节点`，并对它们的值求和。那怎样找到左叶子节点呢？

1. 首先，节点本身知道自己是不是叶子节点，只要判断 `!node.left && !node.right` 就好了，但它不知道自己是左/右子节点。
2. 然后，虽然节点自己不知道自己是左还是右子节点，但是它爸爸知道呀！所以，由它爸爸来告诉它就好了。

### 复杂度

-   时间复杂度：$O(N)$，N 为节点数。
-   空间复杂度：$O(h)$，h 为树的高度。

### 代码

Python Code

```py
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution(object):
    def sumOfLeftLeaves(self, root, left = False):
        """
        :type root: TreeNode
        :rtype: int
        """
        if not root: return 0
        if not root.left and not root.right: return root.val if left else 0
        return self.sumOfLeftLeaves(root.left, True) + self.sumOfLeftLeaves(root.right, False)
```

JavaScript Code

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function (root, isLeft = false) {
    if (!root) return 0;

    if (!root.left && !root.right && isLeft) return root.val;

    return (
        sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right, false)
    );
};
```

## 方法 2：迭代+栈

### 思路

其实只要知道怎么判断左叶子节点，剩下的就是遍历二叉树的模板了，爱怎么遍历都行。

### 复杂度

-   时间复杂度：$O(N)$，N 为节点数。
-   空间复杂度：$O(h)$，h 为树的高度。

### 代码

JavaScript Code

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
    if (!root) return 0;

    let sum = 0;
    const stack = [root];

    while (stack.length) {
        const node = stack.pop();

        if (!node.left && !node.right && node.isLeft) sum += node.val;
        delete node.isLeft;

        if (node.left) {
            node.left.isLeft = true;
            stack.push(node.left);
        }

        node.right && stack.push(node.right);
    }

    return sum;
};
```
