# 875.爱吃香蕉的珂珂

https://leetcode-cn.com/problems/koko-eating-bananas

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

### 思路

题目要求我们找到珂珂在规定时间内吃完香蕉的最小速度 K，那我们要如何确定 K 的范围呢？显然，珂珂吃香蕉的速度最小应该是 1，而最快则是最大堆香蕉的数量，再快也没有意义了，即 K 的取值范围是 [1, maxPile]。那接下来，符合直觉的做法是，在这个范围内，从 1 开始逐一尝试，看 K 取哪个值的时候珂珂正好能在规定时间内吃完香蕉。这样线性查找的时间复杂度是 O(N)，N 等于 maxPile。

不过，因为 1 ～ maxPile 是连续递增的，要在一个有序的范围内查找一个值的话，很容易就想到了二分查找。

- 在范围 [1, maxPile] 中使用二分查找寻找最小速度 K；
- 如果当前速度不够珂珂吃完香蕉，左指针右移，继续寻找；
- 如果当前速度足够珂珂吃完香蕉，记录当前速度，然后右指针左移，继续寻找是否存在满足条件的更小速度；

### 复杂度分析

- 时间复杂度：O(mlogN)，N 是最大堆香蕉的数量，m 是香蕉的堆数。二分查找的时间复杂度是 O(logN)，检查当前 K 值是否符合要求时遍历 piles 数组的时间复杂度是 O(m)。
- 空间复杂度：O(1)。

### 代码

```js
/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function (piles, H) {
  const isPossible = (piles, H, K) => {
    let time = 0
    piles.forEach((p) => {
      time += Math.ceil(p / K)
    })
    return time <= H
  }
  let l = 0,
    r = Math.max(...piles),
    mid = 0,
    res = 0
  while (l <= r) {
    mid = ((l + r) / 2) << 0
    if (isPossible(piles, H, mid)) {
      res = mid
      r = mid - 1
    } else {
      l = mid + 1
    }
  }
  return res
}
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/52#issuecomment-650171089_

**官方题解**

## 题目地址（875. 爱吃香蕉的珂珂）

https://leetcode-cn.com/problems/koko-eating-bananas/description/

## 题目描述

```
珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。

珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  

珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。

 

示例 1：

输入: piles = [3,6,7,11], H = 8
输出: 4
示例 2：

输入: piles = [30,11,23,4,20], H = 5
输出: 30
示例 3：

输入: piles = [30,11,23,4,20], H = 6
输出: 23
 

提示：

1 <= piles.length <= 10^4
piles.length <= H <= 10^9
1 <= piles[i] <= 10^9


```

## 前置知识

- 二分查找

## 思路

符合直觉的做法是，选择最大的堆的香蕉数，然后试一下能不能行，如果不行则直接返回上次计算的结果，如果行，我们减少 1 个香蕉，试试行不行，依次类推。计算出刚好不行的即可。这种解法的时间复杂度比较高，为 $O(N * M)$，其中 N 为 piles 长度， M 为 Piles 中最大的数。。

这道题如果能看出来是二分法解决，那么其实很简单。为什么它是二分问题呢？我这里画了个图，我相信你看了就明白了。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gg5yzrbbyqj30q00lvdiy.jpg)

> 香蕉堆的香蕉个数上限是 10^9， 珂珂这也太能吃了吧？

## 关键点解析

- 二分查找

## 代码

代码支持：Python，JavaScript

Python Code:

```py
class Solution:
    def canEatAllBananas(self, piles, H, K):
        t = 0
        for pile in piles:
            t += math.ceil(pile / K)
        return t <= H
    def minEatingSpeed(self, piles: List[int], H: int) -> int:
        l, r = 1, max(piles)
        # [l, r) ， 左闭右开的好处是如果能找到，那么返回 l 和 r 都是一样的，因为最终 l 等于 r。
        while l < r:
            mid = (l + r) >> 1
            if self.canEatAllBananas(piles, H, mid):
                r = mid
            else:
                l = mid + 1
        return l

```

JavaScript Code:

```js
function canEatAllBananas(piles, H, mid) {
  let h = 0
  for (let pile of piles) {
    h += Math.ceil(pile / mid)
  }

  return h <= H
}
/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function (piles, H) {
  let lo = 1,
    hi = Math.max(...piles)
  // [l, r) ， 左闭右开的好处是如果能找到，那么返回 l 和 r 都是一样的，因为最终 l 等于 r。
  while (lo <= hi) {
    let mid = lo + ((hi - lo) >> 1)
    if (canEatAllBananas(piles, H, mid)) {
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }

  return lo //  不能选择hi
}
```

**复杂度分析**

- 时间复杂度：$O(max(N, N * logM))$，其中 N 为 piles 长度， M 为 Piles 中最大的数。
- 空间复杂度：$O(1)$

## 模板

分享几个常用的的二分法模板。

### 查找一个数

```java
public int binarySearch(int[] nums, int target) {
    // 左右都闭合的区间 [l, r]
    int left = 0;
    int right = nums.length - 1;

    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target)
            return mid;
        else if (nums[mid] < target)
			// 搜索区间变为 [mid+1, right]
            left = mid + 1;
        else if (nums[mid] > target)
            // 搜索区间变为 [left, mid - 1]
            right = mid - 1;
    }
    return -1;
}
```

### 寻找最左边的满足条件的值

```java
public int binarySearchLeft(int[] nums, int target) {
	// 搜索区间为 [left, right]
    int left = 0;
    int right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            // 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else if (nums[mid] > target) {
            // 搜索区间变为 [left, mid-1]
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 收缩右边界
            right = mid - 1;
        }
    }
    // 检查是否越界
    if (left >= nums.length || nums[left] != target)
        return -1;
    return left;
}
```

### 寻找最右边的满足条件的值

```java
public int binarySearchRight(int[] nums, int target) {
	// 搜索区间为 [left, right]
    int left = 0
    int right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) {
			// 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else if (nums[mid] > target) {
			// 搜索区间变为 [left, mid-1]
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 收缩左边界
            left = mid + 1;
        }
    }
    // 检查是否越界
    if (right < 0 || nums[right] != target)
        return -1;
    return right;
}
```

> 如果题目重点不是二分，也就是说二分只是众多步骤中的一步，大家也可以直接调用语言的 API，比如 Python 的 bisect 模块。

更多题解可以访问我的 LeetCode 题解仓库：https://github.com/azl397985856/leetcode 。 目前已经 30K star 啦。

关注公众号力扣加加，努力用清晰直白的语言还原解题思路，并且有大量图解，手把手教你识别套路，高效刷题。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfcuzagjalj30p00dwabs.jpg)

_Originally posted by @azl397985856 in https://github.com/leetcode-pp/91alg-1/issues/52#issuecomment-650155495_
