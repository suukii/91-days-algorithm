# 435. 无重叠区间

https://leetcode-cn.com/problems/non-overlapping-intervals/

- [435. 无重叠区间](#435-无重叠区间)
  - [题目描述](#题目描述)
  - [方法 1: 贪心](#方法-1-贪心)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

注意:

可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
示例 1:

输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。
示例 2:

输入: [ [1,2], [1,2], [1,2] ]

输出: 2

解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
示例 3:

输入: [ [1,2], [2,3] ]

输出: 0

解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/non-overlapping-intervals
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1: 贪心

### 思路

因为需要**移除尽量少**的区间，换句话说，就是要**保留尽量多**的区间。在选择要保留的区间的时候，需要考虑的是区间的**结束时间**，因为结束时间越早，留给其他区间的空间就越多，就越有可能保留更多的区间。所以我们采取的贪心策略是：**优先保留结束时间小并且不与其他区间相交的区间**。

具体实现就是要按区间结束时间升序排序。

> 注意：需要根据实际情况判断按区间开头还是按区间结尾排序。

<!-- > 对于合并问题，可以考虑按区间开头排序。
> 对于覆盖问题，可以考虑按区间结尾排序。 -->

![](https://cdn.jsdelivr.net/gh/suukii/91-days-algorithm/assets/435_0.png)

### 复杂度分析

-   时间复杂度：$O(NlogN)$, N 为数组长度，排序的时间。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
    // 按区间结尾升序排序
    intervals.sort((a, b) => a[1] - b[1]);

    let ans = 0;
    let cur = 0,
        next = 1;

    while (next < intervals.length) {
        // 如果两个区间相交，则移除 next 区间 (next++，cur不动)
        if (intervals[cur][1] > intervals[next][0]) {
            ans++;
            next++;
        }
        // 如果两个区间不相交，则继续比较后面两个区间 (cur=next, next++)
        else {
            cur = next;
            next++;
        }
    }

    return ans;
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)
