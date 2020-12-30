# 543. 二叉树的直径

https://leetcode-cn.com/problems/diameter-of-binary-tree/

## 题目描述

```
给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

 

示例 :
给定二叉树

          1
         / \
        2   3
       / \     
      4   5    
返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

 

注意：两结点之间的路径长度是以它们之间边的数目表示。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/diameter-of-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法1: DFS

### 思路

题目的意思就是要找到一个子树，满足条件“其左子树高度+右子树高度值最大”，返回这个最大值。

要找到符合条件的子树，只需要在计算二叉树高度的同时用一个全局变量来记录就行。

### 复杂度分析

-   时间复杂度：$O(N)$，N 是二叉树节点数。
-   空间复杂度：$O(h)$，h 是二叉树的高度。

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
var diameterOfBinaryTree = function(root) {
    let max = 0
    dfs(root)
    return max

    // ****************************************
    function dfs(root) {
        if (!root) return 0
        if (!root.left && !root.right) return 1

        const leftH = dfs(root.left)
        const rightH = dfs(root.right)
        if (leftH + rightH > max) max = leftH + rightH

        return Math.max(leftH, rightH) + 1
    }
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)