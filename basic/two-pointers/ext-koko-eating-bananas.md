# 875.爱吃香蕉的珂珂

https://leetcode-cn.com/problems/koko-eating-bananas

- [875.爱吃香蕉的珂珂](#875爱吃香蕉的珂珂)
  - [题目描述](#题目描述)
  - [方法 1：二分法](#方法-1二分法)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。

珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。

珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。



示例 1：

输入: piles = [3,6,7,11], H = 8
输出: 4
示例 2：

输入: piles = [30,11,23,4,20], H = 5
输出: 30
示例 3：

输入: piles = [30,11,23,4,20], H = 6
输出: 23


提示：

1 <= piles.length <= 10^4
piles.length <= H <= 10^9
1 <= piles[i] <= 10^9

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/koko-eating-bananas
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：二分法

### 思路

题目要求我们找到珂珂在规定时间内吃完香蕉的最小速度 K。那我们要如何确定 K 的范围呢？

显然，珂珂吃香蕉的速度最小应该是 1，而最快则是最大堆香蕉的数量，再快也没有意义了，即 K 的取值范围是 [1, maxPile]。

那接下来，符合直觉的做法是，在这个范围内，从 1 开始逐一尝试，看 K 取哪个值的时候珂珂正好能在规定时间内吃完香蕉。这样线性查找的时间复杂度是 $O(N)$，N 等于 maxPile。

不过，因为 1 ～ maxPile 是连续递增的，要在一个有序的范围内查找一个值的话，很容易就想到了二分查找。

-   在范围 [1, maxPile] 中使用二分查找寻找最小速度 K；
-   如果当前速度不够珂珂吃完香蕉，左指针右移，继续寻找；
-   如果当前速度足够珂珂吃完香蕉，记录当前速度，然后右指针左移，继续寻找是否存在满足条件的更小速度；

### 复杂度分析

-   时间复杂度：$O(mlogN)$，N 是最大堆香蕉的数量，m 是香蕉的堆数。二分查找的时间复杂度是 $O(logN)$，检查当前 K 值是否符合要求时遍历 piles 数组的时间复杂度是 $O(m)$。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function (piles, H) {
    let l = 0,
        r = Math.max(...piles),
        mid = 0,
        res = 0;

    while (l <= r) {
        mid = ((l + r) / 2) << 0;
        if (isPossible(piles, H, mid)) {
            res = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    return res;

    // ********************************
    function isPossible(piles, H, K) {
        let time = 0;
        piles.forEach(p => {
            time += Math.ceil(p / K);
        });
        return time <= H;
    }
};
```
