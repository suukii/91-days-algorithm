# 455. 分发饼干

https://leetcode-cn.com/problems/assign-cookies/

- [455. 分发饼干](#455-分发饼干)
  - [题目描述](#题目描述)
  - [方法 1：贪心算法](#方法-1贪心算法)
    - [思路](#思路)
    - [复杂度分析](#复杂度分析)
    - [代码(JS/Python)](#代码jspython)

## 题目描述

```
假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

 
示例 1:

输入: g = [1,2,3], s = [1,1]
输出: 1
解释:
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
示例 2:

输入: g = [1,2], s = [1,2,3]
输出: 2
解释:
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
 

提示：

1 <= g.length <= 3 * 104
0 <= s.length <= 3 * 104
1 <= g[i], s[j] <= 231 - 1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/assign-cookies
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：贪心算法

### 思路

我们的目标是让更多的孩子吃饱。

而饥饿值小的孩子更容易吃饱，所以我们考虑先让饥饿值最小的孩子吃饼干。

而为了消耗更少的饼干，当然是在能让这个孩子吃饱的饼干里选最小的那块给他吃。

这个孩子吃饱后，我们用同样的策略，在剩下的孩子中选出饥饿值最小的孩子，分给他最小的能吃饱的饼干。重复这个策略，直到消耗完所有满足条件的饼干，或者所有孩子都吃饱了。

至于具体的实现，我们需要获取孩子饥饿值和饼干大小的关系，所以需要排序。

### 复杂度分析

-   时间复杂度：$O(nlogn+mlogm)$，n 是 g.length，m 是 s.length，排序的时间。
-   空间复杂度：$O(1)$。

### 代码(JS/Python)

JavaScript Code

```js
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
    g.sort(asc);
    s.sort(asc);

    let gp = 0,
        sp = 0;

    while (sp < s.length && gp < g.length) {
        // 发现满足条件的饼干，喂饱一个孩子
        if (s[sp] >= g[gp]) gp++;
        // 继续找下一块饼干
        sp++;
    }
    return gp;

    // ************************
    function asc(a, b) {
        return a - b;
    }
};
```

Python Code

```py
class Solution(object):
    def findContentChildren(self, g, s):
        """
        :type g: List[int]
        :type s: List[int]
        :rtype: int
        """
        g.sort()
        s.sort()

        i, j = 0, 0

        while i < len(g) and j < len(s):
            if s[j] >= g[i]:
                i += 1
            j += 1

        return i
```
