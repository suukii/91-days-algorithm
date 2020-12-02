# 167.两数之和 II - 输入有序数组

https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted

- [167.两数之和 II - 输入有序数组](#167两数之和-ii---输入有序数组)
  - [题目描述](#题目描述)
  - [方法 1：双指针](#方法-1双指针)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

说明:

返回的下标值（index1 和 index2）不是从零开始的。
你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
示例:

输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：双指针

### 思路

使用 `left` 和 `right` 两个指针分别从数组的两端开始遍历数组；因为数组是升序排序的，所以：

-   当两指针的数字相加小于 `target` 时，我们要把两数中较小的数字换成一个更大的数字，`left` 指针右移一步；
-   当两指针的数字相加大于 `target` 时，我们要把两数中较大的数字换成一个更小的数字，`right` 指针需要左移一步；
-   当两指针的数字相加等于 `target` 时，返回两指针下标加一。

### 复杂度分析

-   时间复杂度：$O(N)$，N 为数组长度。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let l = 0,
        r = numbers.length - 1,
        sum = 0;

    while (l < r) {
        sum = numbers[l] + numbers[r];

        if (sum === target) {
            return [l + 1, r + 1];
        }

        sum < target ? l++ : r--;
    }
};
```

Python Code

```py
class Solution(object):
    def twoSum(self, numbers, target):
        """
        :type numbers: List[int]
        :type target: int
        :rtype: List[int]
        """
        l, r = 0, len(numbers) - 1
        while l < r:
            s = numbers[l] + numbers[r]
            if s < target: l += 1
            elif s > target: r -= 1
            else: return [l + 1, r + 1]
```
