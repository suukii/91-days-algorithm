# 33. 搜索旋转排序数组

https://leetcode-cn.com/problems/search-in-rotated-sorted-array/

- [33. 搜索旋转排序数组](#33-搜索旋转排序数组)
  - [题目描述](#题目描述)
  - [方法 1: 二分法](#方法-1-二分法)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)

## 题目描述

```
升序排列的整数数组 nums 在预先未知的某个点上进行了旋转（例如， [0,1,2,4,5,6,7] 经旋转后可能变为 [4,5,6,7,0,1,2] ）。

请你在数组中搜索 target ，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

 

示例 1：

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
示例 2：

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
示例 3：

输入：nums = [1], target = 0
输出：-1
 

提示：

1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
nums 中的每个值都 独一无二
nums 肯定会在某个点上旋转
-10^4 <= target <= 10^4

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1: 二分法

### 思路

旋转数组其实可以分为两个有序的数组，从旋转点切分开，前半部分和后半部分都是有序的。我们按正常的二分法思路，先确定一个中点 mid 的话，那么

- 如果 mid 位于 `左侧有序部分`，则从 mid 切分数组后，`左侧是有序的`，右侧是无序的
- 如果 mid 位于 `右侧有序部分`，则从 mid 切分数组后，`右侧是有序的`，左侧是无序的

也就是说我们选定一个中点之后，数组总会被分为有序和无序两个部分，对于有序部分，我们很容易能判断是否需要继续搜索，如果有序部分不满足搜索条件，那我们就将搜索区间缩小为数组无序部分。

![](https://cdn.jsdelivr.net/gh/suukii/91-days-algorithm/assets/33_0.png)

### 复杂度分析

- 时间复杂度：$O(logn)$，n 为数组长度。
- 空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const m = l + ((r - l) >> 1);
    if (nums[m] === target) return m;

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
  return -1;
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)
