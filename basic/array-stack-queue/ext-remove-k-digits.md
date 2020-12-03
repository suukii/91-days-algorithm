# 402. 移掉 K 位数字

https://leetcode-cn.com/problems/remove-k-digits/

## 题目描述

```
给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。

注意:

num 的长度小于 10002 且 ≥ k。
num 不会包含任何前导零。
示例 1 :

输入: num = "1432219", k = 3
输出: "1219"
解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。
示例 2 :

输入: num = "10200", k = 1
输出: "200"
解释: 移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
示例 3 :

输入: num = "10", k = 2
输出: "0"
解释: 从原数字移除所有的数字，剩余为空就是0。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-k-digits
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 方法 1：单调栈

### 思路

### 复杂度分析

-   时间复杂度：$O(N)$。
-   空间复杂度：$O(N)$。

### 代码

JavaScript Code

```js
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
    const stack = [];

    for (let i = 0; i < num.length; i++) {
        const n = +num[i];

        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > n) {
            stack.pop();
            // 记录扔掉了几个数字，扔够 k 个就不扔了
            k--;
        }

        stack.push(n);
    }

    // 如果没有扔够 k 个的话，继续扔
    while (k-- > 0) {
        stack.pop();
    }

    return stack.join('').replace(/^0*/, '') || '0';
};
```

Python Code

```py
class Solution(object):
    def removeKdigits(self, num, k):
        """
        :type num: str
        :type k: int
        :rtype: str
        """
        stack = []
        remain = len(num) - k

        for digit in num:
            while k and stack and stack[-1] > digit:
                stack.pop()
                k -= 1
            stack.append(digit)

        return ''.join(stack[:remain]).lstrip('0') or '0'
```

更多题解可以访问：[https://github.com/suukii/91-days-algorithm](https://github.com/suukii/91-days-algorithm)
