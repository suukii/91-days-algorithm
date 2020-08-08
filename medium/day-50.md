# 40. 组合总和 II

https://leetcode-cn.com/problems/combination-sum-ii

## 题目描述

```
给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。
示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
[1, 7],
[1, 2, 5],
[2, 6],
[1, 1, 6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 思路

## 复杂度分析

-   时间复杂度：
-   空间复杂度：

## 代码

JavaScript Code

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    const helper = (candidates, arr, remain, cur, res) => {
        for (let i = cur; i < candidates.length; i++) {
            if (candidates[i] > remain) continue
            if (candidates[i] === candidates[i - 1] && i > cur) continue

            if (candidates[i] === remain) {
                res.push([...arr, candidates[i]])
                return
            }

            arr.push(candidates[i])
            helper(candidates, [...arr], remain - candidates[i], i + 1, res)
            arr.pop()
        }
    }

    const res = []
    candidates.sort((a, b) => a - b)
    helper(candidates, [], target, 0, res)
    return res
}
```
