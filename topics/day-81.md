# 416.分割等和子集

https://leetcode-cn.com/problems/partition-equal-subset-sum

## 题目描述

```
给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

注意:

每个数组中的元素不会超过 100
数组的大小不会超过 200
示例 1:

输入: [1, 5, 11, 5]

输出: true

解释: 数组可以分割成 [1, 5, 5] 和 [11].


示例 2:

输入: [1, 2, 3, 5]

输出: false

解释: 数组不能分割成两个元素和相等的子集.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/partition-equal-subset-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 思路 1: DP

**题目理解**

一开始看到题目提到两个子数组，还有点不知道怎么跟 DP 扯上关系。

但其实题目可以换一个说法：**给定数组 nums，是否存在一个子数组，该子数组的和等于 nums 元素和的一半**。

这样就清晰多了。

**解题**

我们还是用一个一维数组 dp 来记录题目的解，dp[i] 表示**是否存在元素和为 i 的子数组**。

对于 nums 中的每个数字 n 来说，都有**选**和**不选**两种选择，选的话问题变成 dp[i - n]，不选的话问题还是 dp[i]，所以：

```
dp[i] = dp[i - n] or dp[i]
```

### 复杂度

-   时间复杂度：$O(len*target)$, len 是 nums 的长度，target 是 nums 元素和的一半。
-   空间复杂度：$O(target)$, target 是 nums 数组元素和的一半。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    const target = nums.reduce((a, b) => a + b) / 2;
    if (target % 1 !== 0) return false; // nums 和为奇数

    const dp = Array(target + 1).fill(false);
    dp[0] = true;
    for (const n of nums) {
        for (let i = target; i >= n; i--) {
            // 逆向填充
            if (dp[target]) return true; // 提前返回结果
            dp[i] = dp[i] || dp[i - n];
        }
    }
    return dp[target];
};
```

## 思路 2: DFS

将两个子数组 a 和 b 分别初始化为 nums 和 []，然后不断从 a 中取出数字放到 b 中，当两个子数组的和相等时，返回 true。

对于 a 中的每个数字，都有**选**与**不选**两种选择。

p.s. 要使用记忆化递归才不会超时

### 复杂度

-   时间复杂度：$O(2^n)$，n 为数组 nums 长度，可以看成是二叉树的遍历。
-   空间复杂度：$O(logn)$，n 为数组 nums 长度，递归栈消耗的空间。

### 代码

Python Code

```py
class Solution(object):
    def canPartition(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """
        @lru_cache
        def dfs(i, sum1, sum2):
            if sum1 == sum2: return True
            if sum2 > sum1 or i >= len(nums): return False
            return dfs(i + 1, sum1 - nums[i], sum2 + nums[i]) or dfs(i + 1, sum1, sum2)

        total = sum(nums)
        if total % 2 == 1: return False
        return dfs(0, total, 0)
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/108#issuecomment-677698946_
