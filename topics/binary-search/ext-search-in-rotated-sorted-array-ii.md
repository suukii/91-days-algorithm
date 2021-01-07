# 81. 搜索旋转排序数组 II

https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/

- [81. 搜索旋转排序数组 II](#81-搜索旋转排序数组-ii)
  - [题目描述](#题目描述)
  - [方法 1：二分法](#方法-1二分法)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。

编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。

示例 1:

输入: nums = [2,5,6,0,0,1,2], target = 0
输出: true
示例 2:

输入: nums = [2,5,6,0,0,1,2], target = 3
输出: false
进阶:

这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。
这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：二分法

### 思路

跟 [33. 搜索旋转排序数组](./ext-search-in-rotated-sorted-array.md) 的思路差不多，只不过多了重复元素这一条件。

```js
// 将重复元素排除在搜索区间外
while (l < m && nums[l] === nums[m]) {
  l++;
}
```

### 复杂度分析

- 时间复杂度：$O(nlogn)$。
- 空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const m = l + ((r - l) >> 1);
    if (nums[m] === target) return true;

    // 将重复元素排除在搜索区间外
    while (l < m && nums[l] === nums[m]) {
      l++;
    }

    // m 位于左侧有序部分
    if (nums[l] <= nums[m]) {
      // m 大于 target，并且 target 大于左侧最小值，才缩小右边界
      if (nums[m] > target && target >= nums[l]) r = m - 1;
      else l = m + 1;
    }
    // m 位于右侧有序部分
    else {
      // m 小于 target，并且 target 小于右侧最大值，才缩小左边界
      if (nums[m] < target && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return false;
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)
