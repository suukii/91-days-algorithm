# 75.颜色分类

## 题目描述

```
给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

示例:

输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
进阶：

一个直观的解决方案是使用计数排序的两趟扫描算法。
首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
你能想出一个仅使用常数空间的一趟扫描算法吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-colors
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 伪代码

```
我们使用三个指针：left, mid, right (left <= mid <= right)，数组元素可以分成四段，'[' 表示包括当前元素，'(' 表示不包括：

- [0, left) 是 bottom 元素
- [left, mid) 是 middle 元素
- [mid, right) 是待分堆的元素
- [right, end] 是 top 元素

遍历待分堆的元素，将它们归类：

// 当 [mid, right) 这个区间没有元素时停止遍历
while mid <= right:

  if array[mid] < middle:
    swap(mid, left)
    left++ // 维护 bottom 元素的边界
    mid++ // 换过来的是一个 middle 元素，不需要继续分类，所以下一次循环从 mid + 1 开始归类

  else if array[mid] > middle:
    swap(mid, right)
    right-- // 维护 top 元素的边界
    // 换过来的元素原本在 [mid, right) 区间中，是一个待分堆元素，所以下一次循环还是从 mid 开始归类

  else:
    mid++
    // 当前是一个 middle 元素，不需要交换，只要将 mid 右移一步扩大 [left, mid) 这个区间就行

```

## 图解

![75_0](https://user-images.githubusercontent.com/30331289/83470720-7d831580-a4b5-11ea-9ad0-96cf730f72af.png)

## 复杂度

- Time：$O(n)$，最多遍历一次数组，所以时间复杂度$O(n)$。
- Space: $O(1)$，直接在原数组上进行修改，没有用到额外空间，所以空间复杂度是 $O(1)$。

## 代码

JavaScript Code

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  const swap = (list, p1, p2) => ([list[p1], list[p2]] = [list[p2], list[p1]])
  let red = 0,
    blue = nums.length - 1,
    p = 0

  while (p <= blue) {
    switch (nums[p]) {
      case 0:
        swap(nums, red++, p)
        p++
        break
      case 1:
        p++
        break
      case 2:
        swap(nums, blue--, p)
        break
      default:
        break
    }
  }
}
```

Python Code

```py
class Solution(object):
  def sortColors(self, nums):
    """
    :type nums: List[int]
    :rtype: None Do not return anything, modify nums in-place instead.
    """
    midKey = 1
    left, mid, right = 0, 0, len(nums) - 1
    while mid <= right:
      if nums[mid] < midKey:
        nums[mid], nums[left] = nums[left], nums[mid]
        mid += 1
        left += 1
      elif nums[mid] > midKey:
        nums[mid], nums[right] = nums[right], nums[mid]
        right -= 1
      else:
        mid += 1
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/15#issuecomment-637217774_

**官方题解**

## 题目地址

[https://leetcode.com/problems/sort-colors/description/](https://leetcode.com/problems/sort-colors/description/)

## 题目描述

给定一个包含红色、白色和蓝色，一共 _n_ 个元素的数组，**[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)**对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

**注意:**
不能使用代码库中的排序函数来解决这道题。

**示例:**

**输入:** [2,0,2,1,1,0]
**输出:** [0,0,1,1,2,2]

## 前置知识

- [快速排序](https://baike.baidu.com/item/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/369842?fromtitle=%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F&fromid=2084344)
- [计数排序](https://baike.baidu.com/item/%E8%AE%A1%E6%95%B0%E6%8E%92%E5%BA%8F)

## 思路

这个问题是典型的荷兰国旗问题 [（https://en.wikipedia.org/wiki/Dutch_national_flag_problem）](https://en.wikipedia.org/wiki/Dutch_national_flag_problem%EF%BC%89%E3%80%82) 因为我们可以将红白蓝三色小球想象成条状物，有序排列后正好组成荷兰国旗。

## 解法一 - 计数排序

- 遍历数组，统计红白蓝三色球（0，1，2）的个数
- 根据红白蓝三色球（0，1，2）的个数重排数组

这种思路的时间复杂度：$O(n)$，需要遍历数组两次（Two pass）。

![image](https://user-images.githubusercontent.com/12479470/83542989-4ef55100-a52e-11ea-9a49-a0e9443da5f4.png)

## 解法二 - 挡板法

我们可以把数组分成三部分，前部（全部是 0），中部（全部是 1）和后部（全部是 2）三个部分。每一个元素（红白蓝分别对应 0、1、2）必属于其中之一。将前部和后部各排在数组的前边和后边，中部自然就排好了。

我们用三个指针，设置两个指针 begin 指向前部的末尾的下一个元素（刚开始默认前部无 0，所以指向第一个位置），end 指向后部开头的前一个位置（刚开始默认后部无 2，所以指向最后一个位置），然后设置一个遍历指针 current，从头开始进行遍历。

形象地来说地话就是有两个挡板，这两个挡板实现我们不知道，我们地目标就是移动挡板到合适位置，并且使得挡板每一部分都是合适地颜色。

![image](https://user-images.githubusercontent.com/12479470/83542469-9a5b2f80-a52d-11ea-990d-1b56623ba2c8.png)

还是以题目给的样例来说，初始化挡板位置为最左侧和最右侧：

![image](https://user-images.githubusercontent.com/12479470/83542548-b19a1d00-a52d-11ea-92aa-c2458d7fe178.png)

读取第一个元素是 2，它应该在右边，那么我们移动右边地挡板。

![image](https://user-images.githubusercontent.com/12479470/83542598-c5de1a00-a52d-11ea-9095-c66e1ed20c8f.png)

并将其和移动挡板后挡板右侧地元素进行一次交换，这意味着“被移动挡板右侧地元素已就位”。

![image](https://user-images.githubusercontent.com/12479470/83542711-e9a16000-a52d-11ea-9226-5a385c26174c.png)

。。。

整个过程大概是这样的：

![image](https://user-images.githubusercontent.com/12479470/83542777-08075b80-a52e-11ea-922b-110b6f1a9fbc.png)

这种思路的时间复杂度也是$O(n)$, 只需要遍历数组一次。

### 关键点解析

- 荷兰国旗问题
- counting sort

### 代码

代码支持： Python3

Python3 Code:

```py
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        p0 = cur = 0
        p2 = len(nums) - 1

        while cur <= p2:
            if nums[cur] == 0:
                nums[cur], nums[p0] = nums[p0], nums[cur]
                p0 += 1
                cur += 1
            elif nums[cur] == 2:
                nums[cur], nums[p2] = nums[p2], nums[cur]
                p2 -= 1
            else:
                cur += 1

```

**_复杂度分析_**

- 时间复杂度：$O(N)$
- 空间复杂度：$O(1)$

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 30K star 啦。

大家也可以关注我的公众号《力扣加加 sa》获取更多更新鲜的 LeetCode 题解

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcuzagjalj30p00dwabs.jpg)

_Originally posted by @azl397985856 in https://github.com/leetcode-pp/91alg-1/issues/15#issuecomment-637651551_
