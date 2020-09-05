# 322. 零钱兑换

https://leetcode-cn.com/problems/coin-change

## 题目描述

```
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。



示例 1:

输入: coins = [1, 2, 5], amount = 11
输出: 3
解释: 11 = 5 + 5 + 1
示例 2:

输入: coins = [2], amount = 3
输出: -1


说明:
你可以认为每种硬币的数量是无限的。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/coin-change
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 思路

以输入 `coins = [1, 2, 5], amount = 11` 为例，

假设我们先选了第一枚硬币 `1`，那子问题就变成了 `coins = [1, 2, 5], amount = (11 - 1)`，我们只要求出这个子问题的最优解，也就能求出原题的最优解。

但假如我们是先选了第二枚硬币，那子问题就变成了 `coins = [1, 2, 5], amount = (11 - 2)`。

由于我们并不确定先选哪枚硬币可以得到最优解，所以需要每枚硬币都试一次。

```js
for (const coin of coins) {
    // 假设我们先拿了面值为 coin 的硬币，
    // 接下来求总金额为 amount - coin 时问题的最优解
}
```

另外我们用一个一维数组 dp 来记录问题的解，dp[i] 表示**总金额为 i 时兑换零钱所需最少硬币个数**。

前面已经提到过子问题是什么了。当总金额为 i 的时候，如果我们选了面值为 coin 的硬币，那问题就变成了求总金额为 i - coin 时的最优解，得到这个解再加上 1 (当前选的这枚硬币)就是总金额为 i 时问题的最优解。

```js
dp[i] = dp[i - coin] + 1;
```

如果不选眼前这枚硬币，那就更简单了，要兑换零钱的总金额还是 i。

```js
dp[i] = dp[i];
```

因为是求最优解，所以我们也要从这两种情况中选择最优解。

```js
dp[i] = min(dp[i - coin] + 1, dp[i]);
```

因为总金额为零时不需要零钱，所以 `dp[0] = 0`，接着我们就可以自底向上地填充 dp 数组了。

## 复杂度

-   时间复杂度：$O(coins*amount)$，coins 是硬币种数。
-   空间复杂度：$O(amount)$。

## 代码

JavaScript Code

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/107#issuecomment-676260687_
