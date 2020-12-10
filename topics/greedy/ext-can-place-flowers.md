# 605. 种花问题

https://leetcode-cn.com/problems/can-place-flowers/

- [605. 种花问题](#605-种花问题)
  - [题目描述](#题目描述)
  - [方法 1: 贪心](#方法-1-贪心)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

示例 1:

输入: flowerbed = [1,0,0,0,1], n = 1
输出: True
示例 2:

输入: flowerbed = [1,0,0,0,1], n = 2
输出: False
注意:

数组内已种好的花不会违反种植规则。
输入的数组长度范围为 [1, 20000]。
n 是非负整数，且不会超过输入数组的大小。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/can-place-flowers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1: 贪心

### 思路

如果有一个 `0` 坑，并且它旁边两个坑都是 `0`，那我们就可以种下一朵花。

需要能种至少 n 朵花，贪心策略很简单：就是遇到一个能种花的坑就把花种下，然后继续去找下一个坑。如果种完了 n 朵花就可以提前返回结果了。

### 复杂度分析

-   时间复杂度：$O(N)$，N 为数组长度。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
    let i = 0;

    while (i < flowerbed.length) {
        // 如果找到一个 0，并且它前后都是 0，就可以种一朵花
        if (!flowerbed[i] && !flowerbed[i - 1] && !flowerbed[i + 1]) {
            n--;
            // 因为它旁边不能再种花了，所以 i+=2 跳过一个坑
            i += 2;
        } else {
            i++;
        }
        if (n <= 0) return true;
    }

    return false;
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)
