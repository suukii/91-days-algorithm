# 494. 目标和

https://leetcode-cn.com/problems/target-sum

## 题目描述

```
给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。

返回可以使最终数组和为目标数 S 的所有添加符号的方法数。



示例：

输入：nums: [1, 1, 1, 1, 1], S: 3
输出：5
解释：

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

一共有5种方法让最终目标和为3。


提示：

数组非空，且长度不会超过 20 。
初始的数组的和不会超过 1000 。
保证返回的最终结果能被 32 位整数存下。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/target-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 思路 1: DP

简单理解一下题目就是，我们要从数组中选出一个正数集，然后剩下的数字自动变成了一个负数集，这两个集合的和要刚好等于目标数 S。

换句话说，我们要从原数组中选出一个子集，满足元素的和为 target(这个 target 不是原题中的 S)，只要确定这个 target，剩下就是 0-1 背包问题的套路了。

已知：

-   正数集 + 负数集 = S
-   正数集 - 负数集 = sum

sum 是原数组的和。

可得：

-   正数集 = (S + sum) / 2

所以 `(S + sum) / 2` 就是我们要找的 target。

### 复杂度

-   时间复杂度：$O(len*(sum+S)/2)$，len 是数组长度，sum 是数组元素和，S 是目标数。
-   空间复杂度：$O((sum+S)/2)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function (nums, S) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum < S) return 0;

    const sumOfPositives = (sum + S) / 2;
    if (sumOfPositives % 1 !== 0) return 0;

    const dp = Array(sumOfPositives + 1).fill(0);
    // target 为 0 时，正数集为空
    // 也就是只有给所有数字都加上 - 号这一种方法
    dp[0] = 1;
    for (const n of nums) {
        for (let i = sumOfPositives; i >= n; i--) {
            dp[i] = dp[i] + dp[i - n];
        }
    }
    return dp[sumOfPositives];
};
```

## 思路 2: DFS

DFS 枚举所有排列组合，计算组合的和，如果满足和等于 S 则结果++。

### 复杂度

-   时间复杂度：$O(2^n)$，n 是数组长度。
-   空间复杂度：$O(logn)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function (nums, S) {
    const dfs = (nums, i, sum) => {
        if (sum === S && i === nums.length) return 1;
        if (i > nums.length) return 0;
        return (
            dfs(nums, i + 1, sum + nums[i]) + dfs(nums, i + 1, sum - nums[i])
        );
    };
    return dfs(nums, 0, 0);
};
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/109#issuecomment-678378367_
