# 98. 验证二叉搜索树

https://leetcode-cn.com/problems/validate-binary-search-tree/

- [98. 验证二叉搜索树](#98-验证二叉搜索树)
  - [题目描述](#题目描述)
  - [方法 1：递归](#方法-1递归)
    - [思路](#思路)
    - [复杂度](#复杂度)
    - [代码](#代码)
  - [方法 2：中序遍历](#方法-2中序遍历)
    - [思路](#思路-1)
    - [复杂度](#复杂度-1)
    - [代码](#代码-1)

## 题目描述

```
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
示例 1:

输入:
    2
   / \
  1   3
输出: true
示例 2:

输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/validate-binary-search-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：递归

### 思路

- `root`的**左子树**所有节点值必须**小于**`root.val`
- `root`的**右子树**所有节点值必须**大于**`root.val`
- 在递归时需要将 `root.val` 这个信息传递下去，作为左子树节点值的 upperBound 以及右子树节点值的 lowerBound
- 递归出口：
  - 空节点
  - 不符合要求的节点(值不在 (lowerBound, upperBound) 范围内的节点)

### 复杂度

- 时间复杂度: $O(N)$，N 为二叉树节点数。
- 空间复杂度: $O(h)$，h 为二叉树高度。

### 代码

JavaScript Code

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (
  root,
  lowerBound = -Infinity,
  upperBound = Infinity
) {
  if (!root) return true;
  if (root.val <= lowerBound || root.val >= upperBound) return false;
  return (
    isValidBST(root.left, lowerBound, root.val) &&
    isValidBST(root.right, root.val, upperBound)
  );
};
```

## 方法 2：中序遍历

### 思路

二叉搜索树的中序遍历结果是一个递增数组，只需检查给定二叉树的中序遍历结果是否符合要求即可。

### 复杂度

- 时间复杂度: $O(N)$，N 为二叉树节点数。
- 空间复杂度: $O(h)$，h 为二叉树高度。

### 代码

JavaScript Code

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    const res = [];
    inorder(root);

    for (let i = 1; i < res.length; i++) {
        if (res[i] <= res[i - 1]) return false;
    }
    return true;

    // ***************

    function inorder(root) {
        if (!root) return;
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)
