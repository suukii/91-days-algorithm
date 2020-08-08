# 47. 全排列 II

https://leetcode-cn.com/problems/permutations-ii

## 题目描述

```
给定一个可包含重复数字的序列，返回所有不重复的全排列。

示例:

输入: [1,1,2]
输出:
[
[1,1,2],
[1,2,1],
[2,1,1]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutations-ii
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
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    const backtrack = (nums, path, res, visited) => {
        if (path.length === nums.length) {
            res.push(path);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (
                visited[i] ||
                (i > 0 && nums[i] === nums[i - 1] && visited[i - 1])
            )
                continue;
            visited[i] = true;
            path.push(nums[i]);
            backtrack(nums, [...path], res, visited);
            path.pop();
            visited[i] = false;
        }
    };

    const res = [];
    nums.sort((a, b) => a - b);
    backtrack(nums, [], res, Array(nums.length));
    return res;
};
```
