# 976. 三角形的最大周长

https://leetcode-cn.com/problems/largest-perimeter-triangle/

- [976. 三角形的最大周长](#976-三角形的最大周长)
  - [题目描述](#题目描述)
  - [方法 1：暴力(TLE)](#方法-1暴力tle)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码](#代码)
  - [方法 2：贪心](#方法-2贪心)
    - [思路](#思路-1)
    - [复杂度分析](#复杂度分析-1)
    - [代码](#代码-1)

## 题目描述

```
给定由一些正数（代表长度）组成的数组 A，返回由其中三个长度组成的、面积不为零的三角形的最大周长。

如果不能形成任何面积不为零的三角形，返回 0。

 

示例 1：

输入：[2,1,2]
输出：5
示例 2：

输入：[1,2,1]
输出：0
示例 3：

输入：[3,2,3,4]
输出：10
示例 4：

输入：[3,6,2,3]
输出：8
 

提示：

3 <= A.length <= 10000
1 <= A[i] <= 10^6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/largest-perimeter-triangle
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：暴力(TLE)

### 思路

符合直觉的思路，三层循环，暴力枚举所以能组成三角形的三条边组合，找最大值，但复杂度过高超时了(64 / 84 个通过测试用例)。

### 复杂度分析

-   时间复杂度：$O(N^3)$。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} A
 * @return {number}
 */
var largestPerimeter = function (A) {
    let max = 0;
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            for (let k = j + 1; k < A.length; k++) {
                if (isValidTri(A[i], A[j], A[k])) {
                    max = Math.max(max, A[i] + A[j] + A[k]);
                }
            }
        }
    }
    return max;

    // ****************************
    function isValidTri(a, b, c) {
        return a + b > c && a + c > b && b + c > a;
    }
};
```

## 方法 2：贪心

### 思路

-   因为我们是要得到三角形的 `最大周长`，所以当然要尽可能地选 `最长` 的边。
-   第一步我们先选定一条最长的边，那剩下的两条边怎么确定呢？
    -   首先，组成三角形的三条边需要满足条件：`(a + b > c) && (a + c > b) && (b + c > a)`，这个条件我们可以简化成 `a + b > c`，其中 c 是最长的边，a 和 b 是较短的边。
    -   当我们选定了最大的数字作为最长边 c 之后，只需要在剩下的数字中找出最大的两个：
        -   如果它们的和大于 c，那这个组合就是我们要找的答案了；
        -   如果它们的和小于 c，那也没有其他符合要求的数字了，这时我们需要放弃这个最长边，重新选择第二大的数字作为最长边 c。

具体做法就是降序排序，依次选择 `A[i]` 作为最长边进行判断。

### 复杂度分析

-   时间复杂度：$O(NlogN)$。
-   空间复杂度：$O(1)$。

### 代码

JavaScript Code

```js
/**
 * @param {number[]} A
 * @return {number}
 */
var largestPerimeter = function (A) {
    A.sort((a, b) => b - a);
    for (let i = 0; i < A.length - 2; i++) {
        if (A[i] < A[i + 1] + A[i + 2]) return A[i] + A[i + 1] + A[i + 2];
    }
    return 0;
};
```

Python Code

```py
class Solution(object):
    def largestPerimeter(self, A):
        """
        :type A: List[int]
        :rtype: int
        """
        A.sort(reverse=True)
        for i in range(len(A) - 2):
            if A[i] < A[i + 1] + A[i + 2]:
                return A[i] + A[i + 1] + A[i + 2]
        return 0
```
