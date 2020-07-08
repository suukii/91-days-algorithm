# 26.删除排序数组中的重复项

https://leetcode-cn.com/problems/binary-tree-maximum-path-sum

## 题目描述

```
给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。



示例 1:

给定数组 nums = [1,1,2],

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

你不需要考虑数组中超出新长度后面的元素。
示例 2:

给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。


说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### 思路

- 使用 `left` 和 `right` 两个指针分别从数组的两端开始遍历数组；因为数组是升序排序的，所以：
- 当两指针的数字相加小于 `target` 时，我们要把两数中较小的数字换成一个更大的数字，所以 `left` 指针需要 右移一步；
- 当两指针的数字相加大于 `target` 时，我们要把两数中较大的数字换成一个更小的数字，所以 `right` 指针需要左移一步；
- 当两指针的数字相加等于 `target` 时，返回两指针下标加一。

### 复杂度分析

- 时间复杂度：O(N)，N 为数组长度。
- 空间复杂度：O(1)。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let left = 0,
    right = numbers.length - 1,
    sum = 0
  while (left < right) {
    sum = numbers[left] + numbers[right]
    if (sum === target) {
      return [left + 1, right + 1]
    }
    sum < target ? left++ : right--
  }
}
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

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/56#issuecomment-650560949_

**官方题解**

https://github.com/azl397985856/leetcode/blob/master/problems/167.two-sum-ii-input-array-is-sorted.md
