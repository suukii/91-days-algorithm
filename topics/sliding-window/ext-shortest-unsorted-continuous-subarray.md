# 581.最短无序连续子数组

https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray

- [581.最短无序连续子数组](#581最短无序连续子数组)
  - [题目描述](#题目描述)
  - [方法 1：滑动窗口](#方法-1滑动窗口)
    - [思路](#思路)
    - [代码](#代码)

## 题目描述

```
给定一个整数数组，你需要寻找一个连续的子数组，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。

你找到的子数组应是最短的，请输出它的长度。

示例 1:

输入: [2, 6, 4, 8, 10, 9, 15]
输出: 5
解释: 你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
说明 :

输入的数组长度范围在 [1, 10,000]。
输入的数组可能包含重复元素 ，所以升序的意思是<=。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：滑动窗口

### 思路

-   先找出数组两端已经排好序的两个子数组，剩下的中间那段就是**可能的** `最短无序连续子数组`；
-   但由于这个 `无序子数组` 中可能会出现需要插入 `有序子数组` 中的元素，比如图中的数字 4，
-   我们可以把 `无序子数组` 看作一个滑动窗口，当出现了上面出现的这种元素时，就扩大窗口的范围；

![](https://cdn.jsdelivr.net/gh/suukii/91-days-algorithm/assets/581_0.png)

### 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    if (nums.length === 0) return 0;

    let l = 0,
        r = nums.length - 1;
    while (nums[l + 1] >= nums[l]) l++;
    while (nums[r - 1] <= nums[r]) r--;

    if (r <= l) return 0;

    const unsorted = nums.slice(l, r + 1),
        min = Math.min(...unsorted),
        max = Math.max(...unsorted);

    while (nums[l - 1] > min) l--;
    while (nums[r + 1] < max) r++;
    return r - l + 1;
};
```

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    if (nums.length === 0) return 0;

    let l = 0,
        r = nums.length - 1;
    while (nums[l + 1] >= nums[l]) l++;
    while (nums[r - 1] <= nums[r]) r--;

    if (r <= l) return 0;

    let p = l,
        end = r;
    while (p <= end) {
        while (nums[p] < nums[l]) l--;
        while (nums[p] > nums[r]) r++;
        p++;
    }
    return r - (l + 1);
};
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)
