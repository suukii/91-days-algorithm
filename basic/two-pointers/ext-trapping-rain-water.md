# 42.接雨水

https://leetcode-cn.com/problems/trapping-rain-water

- [42.接雨水](#42接雨水)
  - [题目描述](#题目描述)
  - [方法 1：暴力法](#方法-1暴力法)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)
  - [方法 2：空间换时间](#方法-2空间换时间)
    - [思路](#思路-1)
    - [复杂度分析](#复杂度分析-1)
    - [代码](#代码-1)
  - [方法 3：双指针](#方法-3双指针)
    - [思路](#思路-2)
    - [复杂度分析](#复杂度分析-2)
    - [代码](#代码-2)

## 题目描述

```
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

![](https://camo.githubusercontent.com/f6eb01ec1b0576df85acdf7258ddefac415dc63b/68747470733a2f2f747661312e73696e61696d672e636e2f6c617267652f30303753385a496c6c7931676737777961796d70766a333062673034687438712e6a7067)

上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢 Marcos 贡献此图。

示例:

输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/trapping-rain-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：暴力法

### 思路

如果一根柱子的左右两边有比它高的柱子的话，那这根柱子的位置就可以储存雨水，所以问题可以细化成：

**每根柱子所在的位置可以储存多少雨水**

要求这个问题的答案，只需分别找到这根柱子左右两侧出现的最高的柱子，取两者中较短的那根，减去当前柱子的高度，就是这个位置所能储存的雨水量了。

![](https://cdn.jsdelivr.net/gh/suukii/91-days-algorithm/assets/42_0.png)

### 复杂度分析

-   时间复杂度：$O(N^2)$，N 为数组长度，遍历数组求每根柱子的位置所能储存的雨水量是 $O(N)$，对于每根柱子，要分别向左和向右遍历找出最高的柱子，时间复杂度是 $O(N)$，所以总的时间复杂度是 $O(N^2)$。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} heights
 * @return {number}
 */
var trap = function (heights) {
    let water = 0;

    for (let i = 1, len = heights.length; i < len - 1; i++) {
        // 分别找左右两边最高的柱子
        const maxL = findMax(heights, 0, i - 1);
        const maxR = findMax(heights, i + 1, len - 1);

        // 如果左右两边有较高的柱子，就能储水
        if (maxL > 0 && maxR > 0) {
            const unit = Math.min(maxR, maxL) - heights[i];
            water += unit > 0 ? unit : 0;
        }
    }

    return water;

    // *************************************
    function findMax(heights, left, right) {
        let max = 0;
        for (let i = left; i <= right; i++) {
            if (heights[i] > max) max = heights[i];
        }
        return max;
    }
};
```

## 方法 2：空间换时间

### 思路

在方法 1 中，我们是分别寻找每根柱子左右两侧最高的柱子，时间复杂度是 $O(N^2)$。

但其实可以用空间换时间，先遍历一遍数组，记录下每根柱子左右最高的柱子分别是哪根。

### 复杂度分析

-   时间复杂度：$O(N)$，N 为数组长度，遍历一遍记录每根柱子左侧的最高柱子为 $O(N)$，遍历一遍记录每根柱子右侧的最高柱子为 $O(N)$，遍历一遍计算每根柱子位置能储存的雨水量为 $O(N)$，即 $O(3N)$，忽略常数，也就是 $O(N)$。
-   空间复杂度：$O(N)$，N 为数组长度，使用了两个数组来记录左右侧最高柱子，空间复杂度提高到了 $O(N)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} heights
 * @return {number}
 */
var trap = function (heights) {
    const len = heights.length;
    const maxL = Array(len).fill(0);
    const maxR = Array(len).fill(0);

    maxL[0] = heights[0];
    for (let i = 1; i < len; i++) {
        maxL[i] = Math.max(maxL[i - 1], heights[i]);
    }

    maxR[len - 1] = heights[len - 1];
    for (let i = len - 2; i > 0; i--) {
        maxR[i] = Math.max(maxR[i + 1], heights[i]);
    }

    let water = 0;
    for (let i = 1; i < len - 1; i++) {
        const unit = Math.min(maxR[i], maxL[i]) - heights[i];
        unit > 0 && (water += unit);
    }
    return water;
};
```

## 方法 3：双指针

### 思路

方法 2 使用了两个数组来记录左右侧的最高柱子，实际上，我们可以改用两个指针来记录。因为在计算雨水量的时候，我们只关心左右侧最高柱子中较短的那根，具体做法如下：

-   定义 low, high 指针分别从数组头尾开始遍历；
-   定义 maxL, maxR 分别记录当前左右侧最高的柱子；
-   当 low <= high 时重复：
    1. 我们只关心较低的那根柱子，如果 low 柱子低于 high 柱子：
        1. low 柱子高于 maxL，那 low 柱子储存不了雨水，不用管它，更新 maxL 为新高度；
        2. low 柱子低于 maxL，low 柱子能储水，加上储水量；
    2. 如果 high 柱子低于 low 柱子：
        1. high 柱子高于 maxR，那 high 柱子储存不了雨水，不用管它，更新 maxR 为新高度；
        2. high 柱子低于 maxR，high 柱子能储水，加上储水量；

### 复杂度分析

-   时间复杂度：$O(N)$，N 为数组长度。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} heights
 * @return {number}
 */
var trap = function (heights) {
    let water = 0,
        low = 0,
        high = heights.length - 1,
        maxL = 0,
        maxR = 0;

    while (low <= high) {
        if (heights[low] < heights[high]) {
            if (heights[low] > maxL) {
                maxL = heights[low];
            } else {
                water += maxL - heights[low];
            }
            low++;
        } else {
            if (heights[high] > maxR) {
                maxR = heights[high];
            } else {
                water += maxR - heights[high];
            }
            high--;
        }
    }

    return water;
};
```
