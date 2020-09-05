-   [95. 不同的二叉搜索树 II](#95.不同的二叉搜索树II)
-   [96. 不同的二叉搜索树](#96.不同的二叉搜索树)

# 95.不同的二叉搜索树 II

https://leetcode-cn.com/problems/unique-binary-search-trees-ii/

## 思路

先从 [1, n] 中选出一个数字 i 作为根元素，然后用剩下的数字去分别构建左右子树：

-   [1, i - 1] 的数字用于构建左子树
-   [i + 1, n] 的数字用于构建右子树

可以看出构建左右子树其实就是原题的子问题，只是规模减小了，我们可以再对子问题分别进行拆分，直到不能再拆，也就是没有数字了，这时候直接返回 null 即可。

假设我们已经实现了函数 `generateTrees`，`generateTrees([1, n])` 会返回 N 棵二叉搜索树，那么当我们选定一个数字 i 作为根节点时，问题可以拆分成：

-   `generateTrees([1, i - 1])` ，返回 L 棵左子树，
-   `generateTrees([i + 1, n])` ，返回 R 棵右子树，

那原问题的答案也很容易得出，就是将所有左子树和右子树进行排列组合，最终得到 I 棵二叉搜索树。

但 [1, n] 中任意一个数字都可以作为根节点，所以还要加一层循环。

## 复杂度

-   时间复杂度：
-   空间复杂度：

## 代码

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
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
    if (n === 0) return [];
    const dfs = ([start, end]) => {
        if (start > end) return [null];
        const res = [];
        for (let i = start; i <= end; i++) {
            // 用所有比 i 小的数字去建左子树，可以建 leftTrees 个左子树
            const leftTrees = dfs([start, i - 1]);
            // 用所有比 i 大的数字去建右子树，可以建 leftTrees 个右子树
            const rightTrees = dfs([i + 1, end]);
            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    // i 作为父节点，枚举所有左子树、右子树的排列组合
                    const root = new TreeNode(i, left, right);
                    res.push(root);
                }
            }
        }
        return res;
    };
    return dfs([1, n]);
};
```

# 96.不同的二叉搜索树

https://leetcode-cn.com/problems/unique-binary-search-trees/

## 思路

大概思路和 95 题差不多，不过要用记忆化递归才不会超时。

## 代码

Python Code

```py
class Solution:
    def numTrees(self, n):
        @lru_cache
        def dfs(start, end):
            if end <= start: return 1
            cnt = 0
            for i in range(start, end + 1):
                left = dfs(start, i - 1)
                right = dfs(i + 1, end)
                cnt += left * right
            return cnt
        return dfs(1, n)
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/115#issuecomment-682328630_
