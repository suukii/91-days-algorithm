# 881. 救生艇

## 题目描述

```
第 i 个人的体重为 people[i]，每艘船可以承载的最大重量为 limit。

每艘船最多可同时载两人，但条件是这些人的重量之和最多为 limit。

返回载到每一个人所需的最小船数。(保证每个人都能被船载)。



示例 1：

输入：people = [1,2], limit = 3
输出：1
解释：1 艘船载 (1, 2)
示例 2：

输入：people = [3,2,2,1], limit = 3
输出：3
解释：3 艘船分别载 (1, 2), (2) 和 (3)
示例 3：

输入：people = [3,5,3,4], limit = 5
输出：4
解释：4 艘船分别载 (3), (3), (4), (5)
提示：

1 <= people.length <= 50000
1 <= people[i] <= limit <= 30000
```

## 思路

-   先对所有人按体重从轻到重排序。
-   使用双指针从头尾同时遍历：
    -   如果较重的较轻的两个人可以坐同一艘船走，就一起走，boat++；
    -   如果不能一起走，那么较重的那个人自己坐一艘船走，boat++；

## 复杂度

-   时间复杂度：$O(nlogn)$，n 为总人数。
-   空间复杂度：$O(1)$。

## 代码

JavaScript Code

```js
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
    people.sort((a, b) => a - b);
    let l = 0,
        r = people.length - 1,
        ans = 0;
    while (l <= r) {
        // 最重的和最轻的一起走
        if (people[r] + people[l] <= limit) l++;
        // 最重的一个人走
        r--;
        ans++;
    }
    return ans;
};
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/118#issuecomment-683506861_
