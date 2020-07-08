# 100.相同的树

https://leetcode-cn.com/problems/same-tree/

## 题目描述

```
给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:

输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
示例 2:

输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
示例 3:

输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/same-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：递归

#### 思路

来练习一下 lucifer 的[《产品经理法》](https://github.com/leetcode-pp/91alg-1/issues/32#issuecomment-643620727)吧。

1. 定义函数功能，先不用管其具体实现。

我们需要一个函数，给定两个二叉树的根节点，返回这两个二叉树是否相同的判断结果。假设我们已经有这个函数 `F`，那问题就转化为 `F(root1, root2)` 了。

2. 确定大问题和小问题的关系。

要解决 `F(root1, root2)`，明显需要先解决 `F(root1.left, root2.left)` 和 `F(root1.right, root2.right)`，而它们之间的关系也是显而易见的，两个二叉树要相等的话，当然其根节点和左右子节点都要相等，所以：
`F(root1, root2) = root1 === root2 && F(root1.left, root2.left) && F(root1.right, root2.right)`

3. 补充递归终止条件

比较的两个节点不相等的话返回 `false`，两个节点都递归到 `null` 的时候返回 `true`。

#### 伪代码

```
如果两个节点都存在：
  1) 俩节点值相等：
    返回 F(左子节点, 左子节点) and F(右子节点, 右子节点)

  2) 俩节点值不等：
    返回 false

如果两个节点都不存在：
  返回 true

如果两个节点一个存在一个不存在：
  返回 false
```

#### 复杂度分析

- 时间复杂度：O(N)，N 为节点数，每个节点都要比较一次。
- 空间复杂度：O(h), h 为树的高度。

#### 代码

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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p && q) {
    if (p.val === q.val) return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    else return false
  } else if (!p && !q) return true
  else return false
}
```

Python Code

```py
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution(object):
    def isSameTree(self, p, q):
        """
        :type p: TreeNode
        :type q: TreeNode
        :rtype: bool
        """
        if p is not None and q is not None:
            if p.val == q.val:
                return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
            else: return False
        elif p is None and q is None:
            return True
        else: return False
```

## 方法 2：比较遍历结果

#### 思路

如果两个二叉树相同，那它们的前/中/后/层级遍历的结果也是一样的。所以我们只需要同时遍历这两棵树，如果遍历途中遇到了不相同的节点，直接返回 false，如果能遍历到最后，说明两棵树相同，返回 true。

#### 复杂度分析

- 时间复杂度：O(N)，N 为二叉树的节点数，最坏的情况是两个二叉树相同，所以每个节点都经历一次入栈出栈的操作，是 O(4N)，忽略常数也就是 O(N)。
- 空间复杂度：O(N)，N 为二叉树的节点数。

#### 代码

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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const sp = [],
    sq = []
  p && sp.push(p)
  q && sq.push(q)

  while (sp.length || sq.length) {
    p = sp.pop()
    q = sq.pop()

    if (p && q) {
      if (p.val !== q.val) return false
      sp.push(p.left, p.right)
      sq.push(q.left, q.right)
    } else if (p !== q) {
      return false
    }
  }
  return true
}
```

**官方题解**

### 前置知识

- 递归
- 层序遍历
- 前中序确定一棵树

### 思路

#### 递归

最简单的想法是递归，这里先介绍下递归三要素

- 递归出口，问题最简单的情况
- 递归调用总是去尝试解决更小的问题，这样问题才会被收敛到最简单的情况
- 递归调用的父问题和子问题没有交集

尝试用递归去解决相同的树

1.  分解为子问题，相同的树分解为左子是否相同，右子是否相同
2.  递归出口: 当树高度为 1 时，判断递归出口

```js
var isSameTree = function (p, q) {
  if (!p || !q) {
    return !p && !q
  }
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}
```

#### 层序遍历

判断两棵树是否相同，只需要判断树的整个结构相同, 判断树的结构是否相同，只需要判断树的每层内容是否相同。

```js
var isSameTree = function (p, q) {
  let curLevelA = [p]
  let curLevelB = [q]

  while (curLevelA.length && curLevelB.length) {
    let nextLevelA = []
    let nextLevelB = []
    const isOK = isSameCurLevel(curLevelA, curLevelB, nextLevelA, nextLevelB)
    if (isOK) {
      curLevelA = nextLevelA
      curLevelB = nextLevelB
    } else {
      return false
    }
  }

  return true
}

function isSameCurLevel(curLevelA, curLevelB, nextLevelA, nextLevelB) {
  if (curLevelA.length !== curLevelB.length) {
    return false
  }
  for (let i = 0; i < curLevelA.length; i++) {
    if (!isSameNode(curLevelA[i], curLevelB[i])) {
      return false
    }
    curLevelA[i] && nextLevelA.push(curLevelA[i].left, curLevelA[i].right)
    curLevelB[i] && nextLevelB.push(curLevelB[i].left, curLevelB[i].right)
  }
  return true
}

function isSameNode(nodeA, nodeB) {
  if (!nodeA || !nodeB) {
    return nodeA === nodeB
  }
  return nodeA.val === nodeB.val
  // return nodeA === nodeB || (nodeA && nodeB && nodeA.val === nodeB.val);
}
```

#### 前中序确定一棵树

前序和中序的遍历结果确定一棵树，那么当两棵树前序遍历和中序遍历结果都相同，那是否说明两棵树也相同

```js
var isSameTree = function (p, q) {
  const preorderP = preorder(p, [])
  const preorderQ = preorder(q, [])
  const inorderP = inorder(p, [])
  const inorderQ = inorder(q, [])
  return preorderP.join('') === preorderQ.join('') && inorderP.join('') === inorderQ.join('')
}

function preorder(root, arr) {
  if (root === null) {
    arr.push(' ')
    return arr
  }
  arr.push(root.val)
  preorder(root.left, arr)
  preorder(root.right, arr)
  return arr
}

function inorder(root, arr) {
  if (root === null) {
    arr.push(' ')
    return arr
  }
  inorder(root.left, arr)
  arr.push(root.val)
  inorder(root.right, arr)
  return arr
}
```

_Originally posted by @feikerwu in https://github.com/leetcode-pp/91alg-1/issues/34#issuecomment-643746888_
