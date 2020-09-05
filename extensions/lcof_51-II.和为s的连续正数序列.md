# 剑指 Offer 57 - II. 和为 s 的连续正数序列

https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/

## 题目描述

```
输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

 

示例 1：

输入：target = 9
输出：[[2,3,4],[4,5]]
示例 2：

输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]]
 

限制：

1 <= target <= 10^5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 代码

JavaScript Code

```js
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
    const ans = [];

    const dfs = (n, sum, path) => {
        if (sum === target) path.length > 1 && ans.push([...path]);
        if (sum >= target) return;
        n++;
        dfs(n, sum + n, [...path, n]);
    };

    for (let i = 1; i < target; i++) {
        dfs(i, i, [i]);
    }
    return ans;
};
```
